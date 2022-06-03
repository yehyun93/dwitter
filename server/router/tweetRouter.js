import express from 'express';


const router = express.Router();


let tweets = [
  {
    "id" : "1",
    "text" : "공부하기시렁",
    "createdAt" : "2022-06-03",
    "name" : "node_study",
    "username" : "user1",
    "url" : "test.jpg"
  },
  {
    "id" : "2",
    "text" : "공부하기시렁22",
    "createdAt" : "2022-06-04",
    "name" : "node_study22",
    "username" : "user2",
    "url" : "test2.jpg"
  },
  {
    "id" : "3",
    "text" : "공부하기시렁22",
    "createdAt" : "2022-06-04",
    "name" : "하이잉",
    "username" : "user1",
    "url" : "test2.jpg"
  }
];

router.get('/', (req, res) => {
  console.log(req.query.username);

  if(req.query.username) {
    const username = req.query.username;
    const userTweets = tweets.filter((tweets) => tweets.username === username);

    res.send(userTweets);
  } else {
    res.send(tweets);
  }
});

router.get('/:id', (req, res) => {
  const tweetId = req.params.id;
  const tweetById = tweets.filter((tweets) => tweets.id === tweetId);

  res.send(tweetById);
});

router.post('/', (req, res) => {
  const newTweet = {
    "id": "4",
    "text": req.body.text,
    "createdAt": getToday(),
    "username": req.body.username,
    "name": req.body.name,
    "url": "test3.txt"
  }

  tweets.push(newTweet);
  res.status(201).send(newTweet);
});

router.put('//:id', (req, res) => {
  const tweetId = req.params.id;
  
  tweets.forEach(tweet => {
    if(tweet.id === tweetId) {
      tweet.text = req.body.text;
      res.status(200).send(tweet);
      return;
    }
  });
});

router.delete('/:id', (req, res) => {
  const tweetId = req.params.id;

  tweets = tweets.filter((tweets) => tweets.id != tweetId);
  console.log(tweets);
  res.status(200).send();
});

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  return year + '-' + month  + '-' + day;
}

export default router;