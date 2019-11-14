import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // Verifies if the user exist based on the e-mail
    if (!user) {
      return res.status(401).json({ error: "Email doens't exists." });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password doens't match." });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
