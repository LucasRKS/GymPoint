// Apenas o roteamento do express
import { Router } from 'express';

// Controllers
import Student from './app/controllers/StudentsController';

const routes = new Router();

routes.post('/students', (req, res) => {
  return Student.store(req, res);
});

export default routes;
