import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';
import ValidationError from '../../util/ValidationError';

import User from '../models/User';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

class CreateSubscriptionService {
  async run({ user_id, meetup_id }) {
    const user = await User.findByPk(user_id);

    const meetup = await Meetup.findByPk(meetup_id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!meetup) {
      throw new ValidationError('O evento informado não existe', {
        field: 'meetup_id',
        user_title: 'Erro',
        user_msg: 'O evento informado não existe',
      });
    }

    if (meetup.user_id === user_id) {
      throw new ValidationError(
        'Não é possível inscrever-se em eventos onde você é organizador',
        {
          field: 'user_id',
          user_title: 'Erro',
          user_msg:
            'Não é possível inscrever-se em eventos onde você é organizador',
        }
      );
    }

    if (meetup.past) {
      throw new ValidationError(
        'Não é possível inscrever-se em eventos passados',
        {
          field: 'data',
          user_title: 'Erro',
          user_msg: 'Não é possível inscrever-se em eventos passados',
        }
      );
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
      throw new ValidationError(
        'Não é possível inscrever-se em dois encontros que ocorrem na mesma data',
        {
          field: 'date',
          user_title: 'Erro',
          user_msg:
            'Não é possível inscrever-se em dois encontros que ocorrem na mesma data',
        }
      );
    }

    // const isSubscribed = await Subscription.findOne({
    //   where: {
    //     user_id: user.id,
    //     meetup_id: meetup.id,
    //   },
    // });

    // if (isSubscribed) {
    //   throw new Error('Você já está inscrito neste evento');
    // }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return subscription;
  }
}

export default new CreateSubscriptionService();
