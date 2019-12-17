import Checkins from '../models/Checkins';
import Student from '../models/Students';

class CheckinsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const checkins = await Checkins.findAll({
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
    return res.json();
  }
}

export default new CheckinsController();
