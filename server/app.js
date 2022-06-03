import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('combined'));

const tweets = [
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
  }
];

app.get('/tweets', (req, res) => {
  console.log(req.query.username);

  if(req.query.username) {
    foreach(tweets => )
  }

  res.send(tweets);
});

app.get('/tweets', (req, res) => {

});


app.listen(3000);