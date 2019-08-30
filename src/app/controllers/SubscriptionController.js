import { Op } from 'sequelize';
import * as Yup from 'yup';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'name'],
              required: true,
            },
            {
              model: File,
              as: 'file',
              attributes: ['id', 'path', 'url'],
            },
          ],
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      meetup_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      const response = {
        error: {
          status: 400,
          type: 'NotFoundKeyError',
          message: 'Meetups id not found',
          user_title: 'Erro',
          user_msg: 'Identificador do evento não informado',
        },
      };

      return res.status(response.error.status).json(response);
    }
    const user = await User.findByPk(req.userId);

    const meetup = await Meetup.findByPk(req.body.meetup_id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!meetup) {
      const response = {
        error: {
          status: 400,
          type: 'NotFoundKeyError',
          message: 'Meetups not found',
          user_title: 'Erro',
          user_msg: 'O evento informado não existe',
        },
      };

      return res.status(response.error.status).json(response);
    }

    if (meetup.user_id === req.userId) {
      const response = {
        error: {
          status: 400,
          type: 'ValidationError',
          message: 'Can not subscribe to your own meetups',
          user_title: 'Erro',
          user_msg:
            'Não é possível inscrever-se em eventos onde você é organizador',
        },
      };

      return res.status(response.error.status).json(response);
    }

    if (meetup.past) {
      const response = {
        error: {
          status: 400,
          type: 'ValidationError',
          message: 'Can not subscribe to past meetups',
          user_title: 'Erro',
          user_msg: 'Não é possível inscrever-se em eventos passados',
        },
      };

      return res.status(response.error.status).json(response);
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      const response = {
        error: {
          status: 400,
          type: 'ValidationError',
          message: 'Can not subscribe to two meetups at the same time',
          user_title: 'Erro - Conflito de datas',
          user_msg:
            'Não é possível inscrever-se em dois encontros que ocorrem na mesma data',
        },
      };

      return res.status(response.error.status).json(response);
    }

    // const isSubscribed = await Subscription.findOne({
    //   where: {
    //     user_id: user.id,
    //     meetup_id: meetup.id,
    //   },
    // });

    // if (isSubscribed) {
    //   const response = {
    //     error: {
    //       status: 400,
    //       type: 'ValidationError',
    //       message: 'You are already subscribed',
    //       user_title: 'Erro',
    //       user_msg: 'Você já está inscrito neste evento',
    //     },
    //   };

    //   return res.status(response.error.status).json(response);
    // }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription) {
      const response = {
        error: {
          status: 400,
          type: 'KeyNotFoundError',
          message: 'Subscription do not exists',
          user_title: 'Erro',
          user_msg: 'Não é foi possível localizar a inscrição',
        },
      };

      return res.status(response.error.status).json(response);
    }

    if (subscription.user_id !== req.userId) {
      const response = {
        error: {
          status: 401,
          type: 'AuthorizationError',
          message: 'You can only cancel your own subscriptions',
          user_title: 'Erro',
          user_msg: 'Você pode cancelar apenas suas próprias inscrições ',
        },
      };

      return res.status(response.error.status).json(response);
    }

    await subscription.destroy();
    return res.send();
  }
}

export default new SubscriptionController();
