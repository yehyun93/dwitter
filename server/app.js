import express from 'express';
import tweetRouter from './router/tweetRouter.js'
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.use('/tweets', tweetRouter);

app.listen(8080);