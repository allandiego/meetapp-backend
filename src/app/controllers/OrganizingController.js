import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';

class OrganizingController {
  async index(req, res) {
    const where = { user_id: req.userId };
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
      offset: (page - 1) * perPage,
      attributes: ['id', 'title', 'description', 'location', 'date', 'past'],
      order: ['date'],
    });

    return res.json(meetups);
  }
}

export default new OrganizingController();
