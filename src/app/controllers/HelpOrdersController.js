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

    const { answer_at, question, student_id } = await HelpOrder.findByPk(
      req.params.id
    );

    if (answer_at !== null) {
      return res
        .status(400)
        .json({ error: 'This order has alredy been answered.' });
    }

    const { id } = await HelpOrder.update(
      { answer, answer_at: new Date() },
      { where: { id: req.params.id } }
    );

    const { name, email } = await Student.findByPk(student_id);

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `Resposta ao chamado ${id}`,
      text: `Olá ${name}, a academia respodeu a pergunta: 
      ${question}
      ${answer}`,
    });

    return res.json({ id, name, question, answer });
  }
}

export default new HelpOrdersController();
