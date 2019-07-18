import { Router } from 'express';

import messages from './messages.route';
import users from './users.route';

const router = Router();

router.use('/users', users);
router.use('/messages', messages);

export default router;
