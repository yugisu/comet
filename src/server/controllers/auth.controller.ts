import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import { User } from '~data/entity/User';

import config from '~config/jwt.config';

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send({ isAuth: false, message: 'Username or password empty!' });
      return;
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send({ isAuth: false, message: 'No such user!' });
      return;
    }

    if (!user.checkUnsafePassword(password)) {
      res.status(401).send({ isAuth: false, message: 'Wrong password!' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '10h' }
    );

    const { password: _, ...userToSend } = user;

    res.send({ isAuth: true, token, user: userToSend });
  };

  static checkJWT = async (req: Request, res: Response) => {
    const token = req.headers['auth'] as string;

    if (token) {
      try {
        const jwtPayload = jwt.verify(token, config.jwtSecret);

        if (typeof jwtPayload === 'object') {
          const { userId } = jwtPayload as { userId: number; username: string };

          const userRepository = getRepository(User);

          const user = await userRepository.findOne(userId);

          if (user) {
            const { password: _, ...userToSend } = user;

            res.send({ isAuth: true, token, user: userToSend });
            return;
          }
        }

        res.status(401).send('Token failed');
      } catch (error) {
        console.log('FAILED TO DECIPHER JWT');
        res.status(401).send('Token failed');

        return;
      }
    }
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

    const { password: _, ...userToSend } = newUser;

    res.send({ isAuth: true, token, user: userToSend });
  };
}
export default AuthController;
