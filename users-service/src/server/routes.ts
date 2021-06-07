import { Express } from 'express';
import { getRepository, getConnection } from 'typeorm';
import dayjs from 'dayjs';
import config from 'config';

import { UserSession, User } from '#root/db/entities';
import { generateUUID, passwordCompareSync } from '#root/helpers';

const USER_SESSION_EXPIRY_HOURS = <number>(
  config.get('USER_SESSION_EXPIRY_HOURS')
);

const setupRoutes = (app: Express) => {
  const connection = getConnection();
  const userRepository = getRepository(User);

  app.post('/sessions', async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return next(new Error('Invalid body!'));
    }

    try {
      const user = await userRepository.findOne(
        {
          username: req.body.username,
        },
        {
          select: ['id', 'passwordHash'],
        }
      );

      if (!user) return next(new Error('Invalid username!'));

      if (!passwordCompareSync(req.body.password, user.passwordHash)) {
        return next(new Error('Invalid password!'));
      }

      const expiresAt = dayjs()
        .add(USER_SESSION_EXPIRY_HOURS, 'hour')
        .toISOString();

      const sessionToken = generateUUID();

      const userSession = {
        expiresAt,
        id: sessionToken,
        userId: user.id,
      };

      await connection
        .createQueryBuilder()
        .insert()
        .into(UserSession)
        .values([userSession])
        .execute();

      return res.json(userSession);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/users/:userId', async (req, res, next) => {
    try {
      const user = await userRepository.findOne(req.params.userId);

      if (!user) return next(new Error('Invalid user ID!'));

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  });
};

export default setupRoutes;
