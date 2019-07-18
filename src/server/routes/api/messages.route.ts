import { Router } from 'express';

import MessageController from '~controllers/message.controller';

const router = Router();

router
  .get('/', MessageController.getAll)
  .post('/', MessageController.addMessage)
  .get('/:id([0-9]+)', MessageController.getOneById)
  .patch('/:id', MessageController.editMessage)
  .delete('/:id', MessageController.deleteMessage);

export default router;
