const { PULL_REQUEST_ACTIONS } = require('../constants');

exports.processPullRequest = ({ action, merged } = {}) => new Promise((resolve, reject) => {
  console.log(action);

  if (action === PULL_REQUEST_ACTIONS.CLOSED && merged) {
    // Call Jenkins pipeline for merged branch
    // fetch('<URL_TO_JENKINS>')
    //   .then(resolve)
    //   .catch(reject);
    resolve();
  } else if ([PULL_REQUEST_ACTIONS.OPENED, PULL_REQUEST_ACTIONS.REOPENED, PULL_REQUEST_ACTIONS.SYNCHRONIZE].includes(action)) {
    console.log('asofhasofhasf');
    // Call Jenkins pipeline for branch
    // fetch('<URL_TO_JENKINS>')
    //   .then(resolve)
    //   .catch(reject);
    resolve();
  }

  resolve();
});
