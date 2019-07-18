import { Router } from 'express';

import { checkJwt } from '~middlewares/check-jwt';

import auth from './auth.route';
import api from './api';

const router = Router();

router.use('/auth', auth);
router.use('/api', checkJwt, api);

export default router;
