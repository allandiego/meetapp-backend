import { isBefore, parseISO } from 'date-fns';

import Cache from '../../lib/Cache';

import Meetup from '../models/Meetup';

class CreateMeetupService {
  async run({ user_id, file_id, title, description, location, date }) {
    if (isBefore(parseISO(date), new Date())) {
      throw new Error('Data selecionada inválida');
    }

    const meetup = await Meetup.create({
      user_id,
      file_id,
      title,
      description,
      location,
      date,
    });

    await Cache.invalidatePrefix('meetups');

    return meetup;
  }
}

export default new CreateMeetupService();
