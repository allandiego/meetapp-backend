import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
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
