import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'An error ocurred while validating the data.' });
    }

    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'Email alredy registered.' });
    }

    const { id, name, email, admin } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      admin,
    });
  }
}

export default new UserController();