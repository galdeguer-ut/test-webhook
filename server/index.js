const express = require('express');
const helmet = require('helmet')
const bodyParser = require('body-parser');

const { GITHUB_EVENTS } = require('../constants');
const { verifyPostData } = require('../middlewares');
const { processPullRequest } = require('../helpers');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.post('/github', verifyPostData, (req, res) => {
  const { body, headers } = req;

  const githubEvent = headers['x-github-event'];

  switch (githubEvent) {
    case GITHUB_EVENTS.PULL_REQUEST:
      const { action, pull_request: { merged } } = body;
      processPullRequest({ action, merged })
        .then(() => {
          res.status(200).send('All ok');
        })
        .catch(() => {
          res.status(500).send('Something went wrong with Jenkins');
        });
      break;

    default:
      res.status(200).send(`Skipping ${githubEvent} event.`);
      break;
  }
});

app.use((err, req, res, next) => {
  if (err) console.error(err);
  res.status(403).send('Request body was not signed or verification failed');
});

app.listen(7897, () => {
  console.log('Listening...');
});
