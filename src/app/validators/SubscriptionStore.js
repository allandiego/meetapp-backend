import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      meetup_id: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    const response = {
      error: {
        status: 400,
        messages: err.inner,

        type: 'NotFoundKeyError',
        message: 'Meetups id not found',
        user_title: 'Erro',
        user_msg: 'Identificador do evento não informado',
      },
    };

    return res.status(response.error.status).json(response);
  }
};
