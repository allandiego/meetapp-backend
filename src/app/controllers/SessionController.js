import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      const response = {
        error: {
          status: 400,
          type: 'ValidationError',
          message: 'Validation fails',
          user_title: 'Erro',
          user_msg: 'Falha na validação, verifique seus dados',
        },
      };

      return res.status(response.error.status).json(response);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      const response = {
        error: {
          status: 401,
          type: 'NotFoundKeyError',
          message: 'User not found',
          user_title: 'Erro',
          user_msg: 'Usuário inexistente',
        },
      };

      res.status(response.error.status).json(response);
    }

    if (!(await user.checkPassword(password))) {
      const response = {
        error: {
          status: 401,
          type: 'NotFoundKeyError',
          message: 'Password does not match',
          user_title: 'Erro',
          user_msg: 'Senha incorreta',
        },
      };

      return res.status(response.error.status).json(response);
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
