// Importando apenas o roteamento do express
import { Router } from 'express';

// Controllers
import Student from './app/controllers/StudentsController';
import Session from './app/controllers/SessionController';

const routes = new Router();

// Login
routes.post('/session', Session.store);

// Students
routes.post('/students', Student.store);
routes.put('/students/:id', Student.update);

export default routes;
