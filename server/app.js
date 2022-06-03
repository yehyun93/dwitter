import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('combined'));

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

app.get('/tweets', (req, res) => {
  console.log(req.query.username);

  if(req.query.username) {
    const username = req.query.username;
    const userTweets = tweets.filter((tweets) => tweets.username === username);

    res.send(userTweets);
  } else {
    res.send(tweets);
  }
});

app.get('/tweets/:id', (req, res) => {
  const tweetId = req.params.id;
  const tweetById = tweets.filter((tweets) => tweets.id === tweetId);

  res.send(tweetById);
});

app.post('/tweets', (req, res) => {
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

app.put('/tweets/:id', (req, res) => {
  const tweetId = req.params.id;
  
  tweets.forEach(tweet => {
    if(tweet.id === tweetId) {
      tweet.text = req.body.text;
      res.status(200).send(tweet);
      return;
    }
  });
});

app.delete('/tweets/:id', (req, res) => {
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

app.listen(8080);