import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      date: Yup.date().required(),
      location: Yup.string().required(),
      file_id: Yup.number().required(),
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
