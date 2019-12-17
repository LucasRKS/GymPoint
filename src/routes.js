import { Router } from 'express';

// Controllers
import Student from './app/controllers/StudentsController';
import Checkins from './app/controllers/CheckinsController';
import Session from './app/controllers/SessionController';
import Subscription from './app/controllers/SubscriptionsController';
import Enrollment from './app/controllers/EnrollmentsController';

// Verifies if the user is logged
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Login
routes.post('/session', Session.store);

// Auth
routes.use(authMiddleware);

// Students
routes.get('/students', Student.index);
routes.post('/students', Student.store);
routes.put('/students/:id', Student.update);

// Checkins
routes.get('/students/:id/checkins', Checkins.index);
routes.post('/students/:id/checkins', Checkins.store);

// Subscriptions
routes.get('/subscriptions', Subscription.index);
routes.post('/subscriptions', Subscription.store);
routes.put('/subscriptions/:id', Subscription.update);
routes.delete('/subscriptions/:id', Subscription.delete);

// Enrollments
routes.get('/enrollments', Enrollment.index);
routes.post('/enrollments/:subscription_id/:student_id', Enrollment.store);
routes.delete('/enrollments/:id', Enrollment.delete);

export default routes;
