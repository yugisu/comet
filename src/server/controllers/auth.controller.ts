import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import { User } from '~data/entity/User';

import config from '~config/jwt.config';

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send('Username or password empty!');
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send('No such user!');
      return;
    }

    if (!user.checkUnsafePassword(password)) {
      res.status(401).send('Wrong password!');
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '10h' }
    );

    res.send(token);
  };

  static register = async (req: Request, res: Response) => {
    const { username, password, avatarLink } = req.body;
    if (!(username && password)) {
      res.status(400).send('Username or password empty!');
    }

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { username } });
    if (user) {
      res.status(400).send('Such user already exists!');
      return;
    }

    const newUser = new User();

    newUser.username = username;
    newUser.password = password;
    newUser.hashPassword();
    if (avatarLink) newUser.avatarLink = avatarLink;

    await userRepository.save(newUser);
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      config.jwtSecret,
      { expiresIn: '10h' }
    );

    res.send(token);
  };
}
export default AuthController;
