import { Router } from 'express';

import UserController from '~controllers/user.controller';
import { checkRole } from '~middlewares/check-role';

const router = Router();

router
  .get('/', UserController.getAll)
  .get('/:id([0-9]+)', checkRole(['ADMIN']), UserController.getOneById)
  .post('/', checkRole(['ADMIN']), UserController.newUser)
  .patch('/:id([0-9]+)', checkRole(['ADMIN']), UserController.editUser)
  .delete('/:id([0-9]+)', checkRole(['ADMIN']), UserController.deleteUser);

export default router;
