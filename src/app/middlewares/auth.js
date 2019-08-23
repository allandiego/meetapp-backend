import { promisify } from 'util';

import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const response = {
      error: {
        status: 401,
        type: 'AuthError',
        message: 'Token not provided',
        user_title: 'Erro de autenticação',
        user_msg: 'Token não fornecido',
      },
    };

    return res.status(response.error.status).json(response);
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    const response = {
      error: {
        status: 401,
        type: 'AuthError',
        message: 'Invalid Token',
        user_title: 'Erro de autenticação',
        user_msg: 'Token inválido',
      },
    };

    return res.status(response.error.status).json(response);
  }
};
