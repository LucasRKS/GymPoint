// Importando apenas o roteamento do express
import { Router } from 'express';

// Controllers
import Student from './app/controllers/StudentsController';

const routes = new Router();

// Students
routes.post('/students', Student.store);
routes.put('/students/:id', Student.update);

export default routes;
