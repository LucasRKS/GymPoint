import { format, subDays } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const checkins = await Checkin.findAll({
      where: { student_id: req.params.id },
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json({ checkins });
  }

  async store(req, res) {
    const student_id = req.params.id;

    const subDate = subDays(new Date(), 7);
    const today = new Date();

    const currentCheckins = await Checkin.findAll({
      where: {
        student_id,
        createdAt: { [Op.between]: [subDate, today] },
      },
    });

    if (currentCheckins.length === 7) {
      return res.status(400).json({
        error: 'Student alredy used the gym for 7 consecutive days.',
      });
    }

    const checkin = await Checkin.create({ student_id });

    const student = await Student.findByPk(student_id);

    const formatedCheckin = format(
      checkin.createdAt,
      "'Dia' dd 'de' MMMM 'de' yyyy 'às' HH':'mm",
      { locale: pt }
    );

    return res.json({ checkin: formatedCheckin, student: student.name });
  }
}

export default new CheckinsController();
