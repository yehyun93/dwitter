import express from 'express';
import 'express-async-error';
import * as tweetController from '../controller/tweets.js'

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

// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

// POST /tweets
router.post('/', tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;