import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    const response = {
      error: {
        status: 400,
        messages: err.inner,

        type: 'ValidationError',
        message: 'Validation Fails',
        user_title: 'Erro',
        user_msg: 'Falha na validação, verifique seus dados',
      },
    };

    return res.status(response.error.status).json(response);
  }
};
