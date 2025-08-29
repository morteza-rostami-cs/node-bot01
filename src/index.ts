// import env config file
import '@/config/index.js';

import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
// import Stats from "@/core/value-objects/Stats.js";
import mongoEngine from '@/infra/database/mango.js';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { redisClient } from '@/infra/redis/index.js';
// test logger
import { logger } from '@/infra/logging/Logger.js';
import expressListRoutes from 'express-list-routes';
// import expressListEndpoints from 'express-list-endpoints';

// middleware
import { errorHandler } from './middleware/errorHandler';
import { AppError } from './shared/errors/AppError';
import { validateBody } from './middleware/validate';
import { responseMiddleware } from './middleware/response.mid.js';

// routes
import userRoutes from '@/modules/user/route.js';

import z from 'zod';
import { comparePassword, hashPassword } from './shared/utils/password';

// swagger
import { swaggerService } from './infra/swagger/SwaggerService';
import cookieParser from 'cookie-parser';

// console.log(config.nodeEnv);

// constants
const app = express();
const PORT = 3001;
const PREFIX = '/api/v1';

// cors settings
const settings = {
  // ["http://localhost:5173", "https://myapp.com"]
  origin: '*', // allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // allow cookies/auth headers
};

// middleware
app.use(cors());
app.use(express.json());
// setup swagger middleware
swaggerService.setupSwagger({ app: app });
// success and error response for res object
app.use(responseMiddleware);
// add cookie parser
app.use(cookieParser());

app.get(`${PREFIX}`, (req: Request, res: Response) => {
  return res.send('Welcome to RPG Game!');
});

// validation schema
const testSchema = z.object({
  email: z.string().email(),
});

/**
 * @swagger
 * /test:
 *  post:
 *    summery: some text route
 *    tags: [Test]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: morteza@gmail.com
 *    responses:
 *      200:
 *        description: some route for test
 */
app.post(`${PREFIX}/test`, validateBody(testSchema), (req: Request, res: Response) => {
  const { email } = req.body;
  // sendSuccess({ res: res, data: { msg: 'some data', email: email } });
  return res.sendSuccess({ data: { msg: 'this is a test api', email: email }, statusCode: 200 });
});

// register routes
app.use(`${PREFIX}/users`, userRoutes);

// print routes
console.log('\n***************\n');
expressListRoutes(app, {
  // prefix: PREFIX,
  color: true,
});
console.log('\n***************\n');

// error handler =>
app.use(errorHandler);

(async () => {
  // connect to mongodb
  await mongoEngine();

  // throw new AppError({ message: 'test error', statusCode: 400, isOperational: true });
  // setup redis
  // await redisClient.set({ key: 'hi', value: { msg: 'love' }, ttlSeconds: 20 });

  // const value = await redisClient.get({ key: 'hi' });
  // console.log('redis value', value);

  // logger
  logger.info('this is after mongo and redis setup');

  // test password hashing
  // const password = 'boobs';
  // const hashed = await hashPassword({ password: password });
  // console.log(hashed);

  // const isMatch = await comparePassword({ password: password + '-', hashed: hashed });
  // console.log('password match', isMatch);

  // run the express server
  app.listen(PORT, () => {
    console.log(`🚀 RPG running on: ${PORT}`);

    // // 👇 print routes only AFTER listen
    // const routes = expressListEndpoints(app);
    // console.log('\n*************** ROUTES ***************\n');
    // console.log(routes);
    // console.log('\n**************************************\n');
  });
})();

//************************************ */

//************************************ */

// const deck = new Deck();

// console.log(deck.toString());
// console.log(deck.draw());
// console.log(deck.draw());
// console.log(deck.remaining);

// deck.shuffle();

// console.log(deck.remaining);

//************************************ */

// // make two cards
// const king_hearts = new Card({ rank: Rank.King, suit: Suit.Hearts });
// const queen_hearts = new Card({ rank: Rank.Queen, suit: Suit.Hearts });
// const ace_clubs = new Card({ rank: Rank.Ace, suit: Suit.Clubs });
// const three_spades = new Card({ rank: Rank.Three, suit: Suit.Spades });

// // create a Hand
// const player_hand = new Hand();

// // add cards to the hand
// player_hand.add({ card: king_hearts });
// player_hand.add({ card: ace_clubs });
// player_hand.add({ card: three_spades });
// player_hand.add({ card: queen_hearts });

// // console.log(player_hand.getCards());
// console.log("score: ", player_hand.score);
// console.log("is blackJack: ", player_hand.isBlackjack);
// console.log("is Bust: ", player_hand.isBust);

//************************************ */

// const hk = new Card({ suit: Suit.Hearts, rank: Rank.King });
// console.log(hk.toString());

// const h2 = new Card({ suit: Suit.Hearts, rank: Rank.Two });

// console.log("\n===============\n");
// console.log(h2.value());
// console.log(h2.toString());

//************************************ */

// console.log(Suit.toSymbol(Suit.Clubs));
// console.log("\n ==============s \n");
// console.log(Rank.toLabel(Rank.Ace));
// console.log(Rank.baseValue(Rank.Ace));
