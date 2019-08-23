import { Op } from 'sequelize';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

import User from '../models/User';
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
    const user = await User.findByPk(req.userId);

    const meetup = await Meetup.findByPk(req.params.id, {
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
}

export default new SubscriptionController();
