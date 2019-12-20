import * as Yup from 'yup';
import { addMonths, parseISO, format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Op } from 'sequelize';
import Enrollment from '../models/Enrollment';
import Subscription from '../models/Subscription';
import Student from '../models/Student';

import EnrollmentInscriptionMail from '../jobs/EnrollmentInscriptionMail';
import Queue from '../../lib/Queue';

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
    const studentHasEnrollment = await Enrollment.findOne({
      where: {
        student_id: req.params.student_id,
        end_date: { [Op.between]: [start_date, end_date] },
      },
    });

    if (studentHasEnrollment !== null) {
      return res.status(400).json({
        error: 'Student alredy have one enrollment in the calculated period.',
      });
    }

    // Calculates the total price of the enrollment
    const enrollmentPrice = duration * price;

    const { id } = await Enrollment.create({
      student_id: req.params.student_id,
      subscription_id: req.params.subscription_id,
      start_date,
      end_date,
      price: enrollmentPrice,
    });

    const { name, email } = await Student.findByPk(req.params.student_id);

    const formatedEndDate = format(end_date, "'dia' dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });

    const formatedPrice = price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    await Queue.add(EnrollmentInscriptionMail.key, {
      name,
      email,
      formatedEndDate,
      formatedPrice,
      title,
    });

    return res.json({ id, title, formatedPrice, start_date, formatedEndDate });
  }

  async delete(req, res) {
    const newEndDate = await format(new Date(), 'yyyy-MM-dd');

    const { id } = await Enrollment.update(
      { end_date: newEndDate },
      { where: { id: req.params.id } }
    );

    return res.json({ id, newEndDate });
  }
}

export default new EnrollmentsController();
