import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { decode } from 'iconv-lite';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'Unable to identify session (Token not provided).' });
  }

  // Separa o bearer e o token
  const [, token] = authHeader.split(' ');

  try {
    await promisify(jwt.verify)(token, authConfig.secret);
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};
