import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class DetailController {
  async index(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
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
      organizing: meetup.Owner.id === req.userId,
      ...meetup.toJSON(),
    };

    return res.json(data);
  }
}

export default new DetailController();
