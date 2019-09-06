import { Op } from 'sequelize';

import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

import CreateSubscriptionService from '../services/CreateSubscriptionService';

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
    const { meetup_id } = req.body;

    const subscription = await CreateSubscriptionService.run({
      user_id: req.userId,
      meetup_id,
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
