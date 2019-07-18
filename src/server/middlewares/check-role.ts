import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from '~data/entity/User';

export const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.jwtPayload) {
      const id = res.locals.jwtPayload.userId;

      const userRepository = getRepository(User);
      let user: User;
      try {
        if (!id) throw 'Unauthorized';
        user = await userRepository.findOneOrFail(id);
      } catch (id) {
        res.status(401).send();
        return;
      }

      if (roles.indexOf(user.role) > -1) next();
      else res.status(403).send('Forbidden for a user of your role');
    } else res.status(401).send('Could not check your token');
  };
};
