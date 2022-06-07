import express from 'express';
import 'express-async-error';
import { body, param } from 'express-validator';
import * as tweetController from '../controller/tweets.js'
import { isAuth } from '../middleware/auth.js';
import {validate} from '../middleware/validator.js'

let tweets = [
  {
    id: '1',
    text: '드림코디분들 화이팅!',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'test.text'
  },
  {
    id: '2',
    text: '안농',
    createdAt: Date.now().toString(),
    name: 'Ellie',
    username: 'ellie',
    url: 'test.text'
  }
];

const router = express.Router();


// validation
// sanitizaion
// Contract testing: Client-Server
// Proto-Base
// 데이터베이스에 접근하기 전에 처리
const validateTweet = [
  body('text').trim().isLength({min:3}).withMessage('text should be at least 3 characters')
  , validate
];

// GET /tweets
// GET /tweets?username=:username
router.get('/', isAuth, tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', isAuth, tweetController.getTweet);

// POST /tweets
router.post('/', isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", isAuth, tweetController.deleteTweet);

export default router;