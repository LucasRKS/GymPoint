import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Mail from '../../lib/Mail';

class HelpOrdersController {
  async index(req, res) {
    const orders = await HelpOrder.findAll({ where: { answer: null } });

    return res.json({ orders });
  }

  async update(req, res) {
    const schema = Yup.object().shape({ answer: Yup.string().required() });
    const { answer } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'An error occurred while validating the data.',
      });
    }

    const order = await HelpOrder.findByPk(req.params.id);

    if (order.answer_at !== null) {
      return res
        .status(400)
        .json({ error: 'This order has alredy been answered.' });
    }

    const { question, student_id, id } = await order.update(
      { answer, answer_at: new Date() },
      { where: { id: req.params.id } }
    );

    const { name, email } = await Student.findByPk(student_id);

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `Resposta ao chamado ${id}`,
      template: 'helpOrderAnswer',
      context: { student: name, id, question, answer },
    });

    return res.json({ id, name, question, answer });
  }
}

export default new HelpOrdersController();
