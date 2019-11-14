import * as Yup from 'yup';
import Subscriptions from '../models/Subscriptions';

class SubscriptionsController {
  async index(req, res) {
    return res.json();
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'An error occurred while validating the data.' });
    }

    const { id, title, duration, price } = await Subscriptions.create(req.body);

    return res.json({ id, title, duration, price });
  }

  async update(req, res) {
    const schema = Yup.object({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'An error occurred while validating the data.' });
    }

    const subscription = await Subscriptions.findByPk(req.params.id);

    const { id, title, duration, price } = await subscription.update(req.body);

    return res.json({ id, title, duration, price });
  }
}

export default new SubscriptionsController();
