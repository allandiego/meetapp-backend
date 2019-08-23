import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      const response = {
        error: {
          status: 400,
          type: 'ValidationError',
          message: 'Validation Fails',
          user_title: 'Erro',
          user_msg: 'Falha na validação, verifique seus dados',
        },
      };

      return res.status(response.error.status).json(response);
    }

    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      const response = {
        error: {
          status: 400,
          type: 'DuplicatedKeyError',
          message: 'Email already exists',
          user_title: 'Erro',
          user_msg: 'Email já cadastrado',
        },
      };

      return res.status(response.error.status).json(response);
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      old_password: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('old_password', (old_password, field) =>
          old_password ? field.required() : field
        ),
      password_confirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      const response = {
        error: {
          status: 400,
          type: 'ValidationError',
          message: 'Validation Fails',
          user_title: 'Erro',
          user_msg: 'Falha na validação, verifique seus dados',
        },
      };

      return res.status(response.error.status).json(response);
    }

    const { email, old_password } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });

      if (emailExists) {
        const response = {
          error: {
            status: 400,
            type: 'DuplicatedKeyError',
            message: 'Email already exists',
            user_title: 'Erro',
            user_msg: 'Email já cadastrado',
          },
        };

        return res.status(response.error.status).json(response);
      }
    }

    if (old_password && !(await user.checkPassword(old_password))) {
      const response = {
        error: {
          status: 401,
          type: 'ValidationError',
          message: 'Password does not match',
          user_title: 'Erro',
          user_msg: 'Falha na confirmação de senha atual',
        },
      };

      return res.status(response.error.status).json(response);
    }

    await user.update(req.body);

    const { id, name, email: userEmail } = await User.findByPk(req.userId);

    return res.json({
      id,
      name,
      email: userEmail,
    });
  }
}

export default new UserController();
