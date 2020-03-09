const express = require('express');
const bodyParser = require('body-parser');

const { verifyPostData } = require('../middlewares');

const app = express();
app.use(bodyParser.json());

app.post('/github', verifyPostData, (req, res) => {
  const { body, headers } = req;

  const githubEvent = headers['x-github-event'];

  console.log(githubEvent);
  console.log(body);

  res.status(200).send('Request body was signed');
});

app.use((err, req, res, next) => {
  if (err) console.error(err);
  res.status(403).send('Request body was not signed or verification failed');
});

app.listen(7897, () => {
  console.log('Listening...');
});
