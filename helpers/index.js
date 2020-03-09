const { PULL_REQUEST_ACTIONS } = require('../constants');

exports.processPullRequest = ({ action, merged } = {}) => new Promise((resolve, reject) => {
  if (action === PULL_REQUEST_ACTIONS.CLOSED && merged) {
    // Call Jenkins pipeline for merged branch
    fetch('<URL_TO_JENKINS>')
      .then(resolve)
      .catch(reject);
  } else if ([PULL_REQUEST_ACTIONS.OPENED, PULL_REQUEST_ACTIONS.REOPENED].includes(action)) {
    // Call Jenkins pipeline for branch
    fetch('<URL_TO_JENKINS>')
      .then(resolve)
      .catch(reject);
  }

  resolve();
});
