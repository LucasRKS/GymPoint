import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import Enrollment from '../models/Enrollments';
import Subscription from '../models/Subscriptions';

class EnrollmentsController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: [
        'student_id',
        'subscription_id',
        'start_date',
        'end_date',
        'price',
      ],
      order: ['created_at'],
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({ start_date: Yup.date() });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'An error occurred while validating the data.' });
    }

    const { title, price, duration } = await Subscription.findByPk(
      req.params.subscription_id
    );

    // Calculates the duration of the enrollment
    const { start_date } = req.body;
    const end_date = await addMonths(parseISO(start_date), duration);

    // Verifies if there is already a enrollement for the student within the period
    // const studentHasEnrollment = await Enrollment.findOne({
    //   where: {
    //     student_id: req.params.student_id,
    //   },
    // });

    // Calculates the total price of the enrollment
    const enrollmentPrice = duration * price;

    const { id } = await Enrollment.create({
      student_id: req.params.student_id,
      subscription_id: req.params.subscription_id,
      start_date,
      end_date,
      price: enrollmentPrice,
    });

    return res.json({ id, title, price, start_date, end_date });
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new EnrollmentsController();
