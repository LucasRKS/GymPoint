import * as Yup from 'yup';
import Subscription from '../models/Subscription';

class SubscriptionsController {
  async index(req, res) {
    const { page = 1, active = true } = req.query;

    const subscritpions = await Subscription.findAll({
      where: { active },
      attributes: ['id', 'title', 'price', 'duration', 'created_at'],
      order: ['created_at'],
      offset: (page - 1) * 20,
    });

    return res.json(subscritpions);
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

    const { id, title, duration, price } = await Subscription.create(req.body);

    return res.json({ id, title, duration, price });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'An error occurred while validating the data.' });
    }

    const subscription = await Subscription.findByPk(req.params.id);

    const { id, title, duration, price } = await subscription.update(req.body);

    return res.json({ id, title, duration, price });
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    subscription.active = false;

    await subscription.save();

    return res.json(subscription);
  }
}

export default new SubscriptionsController();
