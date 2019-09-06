import { Op } from 'sequelize';
import { isBefore, startOfDay, endOfDay, parseISO } from 'date-fns';

import Cache from '../../lib/Cache';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

import CreateMeetupService from '../services/CreateMeetupService';

class MeetupController {
  async index(req, res) {
    const where = {};
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(
      (req.query.per_page > 50 ? 10 : req.query.per_page) || 10,
      10
    );

    // const cacheKey = `user:${req.userId}:meetups:${page}`;
    const cacheKey = `meetups:${page}`;

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAndCountAll({
      where,
      limit: perPage,
      offset: (page - 1) * perPage,
      order: ['date'],
      attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'file',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    const total_pages = Math.ceil(meetups.count / perPage);

    const meetupsData = {
      total_pages,
      ...meetups,
    };

    await Cache.set(cacheKey, meetupsData);

    return res.json(meetupsData);
  }

  async show(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      // attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'file',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!meetup) {
      const response = {
        error: {
          status: 400,
          type: 'KeyNotFound',
          message: 'Invalid Meetup',
          user_title: 'Erro - Meetup inválido',
          user_msg: 'O meetup informado não existe',
        },
      };

      return res.status(response.error.status).json(response);
    }

    const data = {
      organizing: meetup.owner.id === req.userId,
      ...meetup.toJSON(),
    };

    return res.json(data);
  }

  async store(req, res) {
    const { file_id, title, description, location, date } = req.body;

    const meetup = await CreateMeetupService.run({
      user_id: req.userId,
      file_id,
      title,
      description,
      location,
      date,
    });

    return res.json(meetup);
  }

  async update(req, res) {
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

    await Cache.invalidatePrefix('meetups');

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

    await Cache.invalidatePrefix('meetups');

    return res.json({});
  }
}

export default new MeetupController();
