const crypto = require('crypto');

const { secret, signatureHeaderName } = require('../constants');

exports.verifyPostData = (req, res, next) => {
  if (!req.headers['user-agent'].includes('GitHub-Hookshot')) {
    return next('Invalid sender');
  }

  const theirSignature = req.headers[signatureHeaderName];
  const payload = JSON.stringify(req.body);
  const ourSignature = `sha1=${crypto.createHmac('sha1', secret).update(payload).digest('hex')}`;

  if (!crypto.timingSafeEqual(Buffer.from(theirSignature), Buffer.from(ourSignature))) {
    return next('Invalid signature');
  }

  return next();
};
