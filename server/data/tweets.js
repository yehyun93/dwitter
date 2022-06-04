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

export async function getAll() {
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter(tweet => tweet.username === username);
}

export async function getById(id) {
  return tweets.find(tweet => tweet.id === id);
}

export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username
  };

  // 지금꺼를 제일 먼저 넣어라
  tweets = [tweet, ...tweets];
  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find(tweets => tweets.id === id);

  if(tweet) {
    tweet.text = text;
  }

  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter(tweet => tweet.id !== id);
}