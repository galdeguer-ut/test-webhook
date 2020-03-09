const express = require('express');

const { verifyPostData } = require('../middlewares');

const app = express();

app.post('/github', verifyPostData, (req, res) => {
  const githubEvent = req.body;

  console.log(githubEvent);

  res.status(200).send('Request body was signed');
});

app.use((err, req, res, next) => {
  if (err) console.error(err);
  res.status(403).send('Request body was not signed or verification failed');
});

app.listen(7897, () => {
  console.log('Listening...');
});