import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore, startOfDay, endOfDay, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const where = {};
    const page = req.query.page || 1;

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const perPage = 10;
    const meetups = await Meetup.findAll({
      where,
      limit: perPage,
      offset: perPage * page - perPage,
      attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
      include: [
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          attributes: ['id', 'path', 'url'],
        },
      ],
      order: ['date'],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      file_id: Yup.number().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
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

    if (isBefore(parseISO(req.body.date), new Date())) {
      const response = {
        error: {
          status: 400,
          type: 'ValidationError',
          message: 'Meetup date invalid',
          user_title: 'Erro',
          user_msg: 'Data selecionada inválida',
        },
      };

      return res.status(response.error.status).json(response);
    }

    const user_id = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      file_id: Yup.number(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
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

    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== user_id) {
      const response = {
        error: {
          status: 401,
          type: 'AuthorizationError',
          message: 'User not authorized',
          user_title: 'Erro - Usuário não autorizado',
          user_msg: 'Somente o organizador do evento pode efetuar alterações',
        },
      };

      return res.status(response.error.status).json(response);
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      const response = {
        error: {
          status: 400,
          type: 'ValidationError',
          message: 'Meetup date invalid',
          user_title: 'Erro',
          user_msg: 'Data selecionada inválida',
        },
      };

      return res.status(response.error.status).json(response);
    }

    if (meetup.past) {
      const response = {
        error: {
          status: 400,
          type: 'ValidationError',
          message: 'Can not update past meetups',
          user_title: 'Erro',
          user_msg: 'Não é possível modificar eventos passados',
        },
      };

      return res.status(response.error.status).json(response);
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== user_id) {
      const response = {
        error: {
          status: 401,
          type: 'AuthorizationError',
          message: 'User not authorized',
          user_title: 'Erro',
          user_msg: 'Somente o organizador do evento pode excluí-lo',
        },
      };

      return res.status(response.error.status).json(response);
    }

    if (meetup.past) {
      const response = {
        error: {
          status: 400,
          type: 'ValidationError',
          message: 'Can not delete past meetups',
          user_title: 'Erro',
          user_msg: 'Não é possível modificar eventos passados',
        },
      };

      return res.status(response.error.status).json(response);
    }

    await meetup.destroy();

    return res.json({});
  }
}

export default new MeetupController();
