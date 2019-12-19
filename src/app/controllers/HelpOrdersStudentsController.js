import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class HelpOrdersStudentsController {
  async index(req, res) {
    const orders = await HelpOrder.findAll({
      where: { student_id: req.params.id },
    });

    return res.json({ orders });
  }

  async store(req, res) {
    const schema = await Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'An error occurred while validating the data.' });
    }

    const helpOrder = await HelpOrder.create({
      question: req.body.question,
      student_id: req.params.id,
    });

    return res.json({ helpOrder });
  }
}

export default new HelpOrdersStudentsController();
