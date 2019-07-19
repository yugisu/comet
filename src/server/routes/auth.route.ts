import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

router
  .post('/', AuthController.checkJWT)
  .post('/login', AuthController.login)
  .post('/register', AuthController.register);

export default router;
