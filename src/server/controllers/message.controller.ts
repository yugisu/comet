import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Message } from '~data/entity/Message';
import { User } from '~data/entity/User';

class UserController {
  static getAll = async (req: Request, res: Response) => {
    const messageRepository = getRepository(Message);
    const messages = await messageRepository.find({
      loadRelationIds: { relations: ['username'] },
    });
    res.send(messages);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = req.params.id;

    const messageRepository = getRepository(Message);
    const message = await messageRepository.findOne(id, {
      loadRelationIds: { relations: ['username'] },
    });

    if (message) res.send(message);
    else res.status(404).send('Message not found');
  };

  static getAllOfUser = async (req: Request, res: Response) => {
    const username: string = req.params.username;

    const messageRepository = getRepository(Message);
    const message = await messageRepository.findOne({ where: { username } });

    if (message) res.send(message);
    else res.status(404).send('Message not found');
  };

  static addMessage = async (req: Request, res: Response) => {
    const { username } = res.locals.jwtPayload;
    const { text } = req.body;

    const messageRepository = getRepository(Message);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { username } });

    if (!user) {
      res.status(400).send('No such user exists!');
      return;
    }

    const newMessage = new Message();

    newMessage.body = text;
    newMessage.username = username;

    try {
      const message = await messageRepository.save(newMessage);
      res.send(message);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  static editMessage = async (req: Request, res: Response) => {
    const { username } = res.locals.jwtPayload;
    const id = req.params.id;

    const messageRepository = getRepository(Message);

    const { text } = req.body;
    const message = await messageRepository.findOne(id, { where: { username } });

    if (!message) {
      res.status(404).send('No such message!');
      return;
    }

    message.body = text;

    await messageRepository.save(message);
    res.status(204).send();
  };

  static deleteMessage = async (req: Request, res: Response) => {
    const { username } = res.locals.jwtPayload;
    const id = req.params.id;

    const messageRepository = getRepository(Message);

    const message = await messageRepository.findOne(id, { where: { username } });

    if (!message) {
      res.status(404).send('No such message!');
      return;
    }

    await messageRepository.remove(message);
    res.status(204).send();
  };
}

export default UserController;
