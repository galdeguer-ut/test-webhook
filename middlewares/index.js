const crypto = require('crypto');

const { secret, signatureHeaderName } = require('../constants');

const verifyGitHub = (req, res, next) => {
  if (!req.headers['user-agent'].includes('GitHub-Hookshot')) {
    return next('Invalid sender');
  }
  // Compare their hmac signature to our hmac signature
  // (hmac = hash-based message authentication code)
  const theirSignature = req.headers[signatureHeaderName];
  const payload = JSON.stringify(req.body);
  const ourSignature = `sha1=${crypto.createHmac('sha1', secret).update(payload).digest('hex')}`;
  if (!crypto.timingSafeEqual(Buffer.from(theirSignature), Buffer.from(ourSignature))) {
    return next('Invalid signature');
  }

  return next();
};

exports.verifyPostData = (req, res, next) => {
  if (!req.headers['user-agent'].includes('GitHub-Hookshot')) {
    return next('Invalid sender');
  }
  // Compare their hmac signature to our hmac signature
  // (hmac = hash-based message authentication code)
  const theirSignature = req.headers[signatureHeaderName];
  const payload = JSON.stringify(req.body);
  const ourSignature = `sha1=${crypto.createHmac('sha1', secret).update(payload).digest('hex')}`;
  if (!crypto.timingSafeEqual(Buffer.from(theirSignature), Buffer.from(ourSignature))) {
    return next('Invalid signature');
  }

  return next();

  // const payload = JSON.stringify(req.body);
  // if (!payload) {
  //   return next('Request body empty');
  // }

  // const sig = req.get(signatureHeaderName) || '';
  // const hmac = crypto.createHmac('sha1', secret);
  // const digest = Buffer.from('sha1=' + hmac.update(payload).digest('hex'), 'utf8');
  // const checksum = Buffer.from(sig, 'utf8');

  // if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
  //   return next(`Request body digest (${digest}) did not match ${signatureHeaderName} (${checksum})`);
  // }

  // return next();
};
