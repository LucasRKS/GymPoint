// Apenas o roteamento do express
import { Router } from 'express';

// Controllers
import User from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', (req, res) => {
  return User.store(req, res);
});

export default routes;
