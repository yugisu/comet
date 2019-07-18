import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import config from '~config/jwt.config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['auth'] as string;
  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  next();
};
