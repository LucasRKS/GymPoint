import * as Yup from 'yup';
import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.string().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'An error ocurred while validating the data.' });
    }

    const emailExists = await Students.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'Email alredy registered.' });
    }

    const { id, name, email, age, weight, height } = await Students.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.string(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'An error ocurred while validating the data.' });
    }

    // Valida se o e-mail a ser editado já existe na aplicação
    if (req.body.email) {
      const emailExists = await Students.findOne({
        where: { email: req.body.email },
      });

      if (emailExists) {
        return res.status(400).json({ error: 'Email alredy registered.' });
      }
    }

    // Encontra o usuário baseando-se no id passado na url
    const student = await Students.findByPk(req.params.id);

    // Verifica se existe o estudante com o ID informado
    if (!student) {
      return res.json({ error: 'Unnable to find the student.' });
    }

    const { id, name, email, age, weight, height } = await student.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentsController();
