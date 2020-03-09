const crypto = require('crypto');

const { secret, signatureHeaderName } = require('../constants');

const createComparisonSignature = (body) => {
  const hmac = crypto.createHmac('sha1', secret);
  const self_signature = hmac.update(JSON.stringify(body)).digest('hex');
  return `sha1=${self_signature}`; // shape in GitHub header
};

const compareSignatures = (signature, comparison_signature) => {
  const source = Buffer.from(signature);
  const comparison = Buffer.from(comparison_signature);
  return crypto.timingSafeEqual(source, comparison); // constant time comparison
};

// const verifyGithubPayload = (req, res, next) => {
//   const { headers, body } = req;

//   const signature = headers['x-hub-signature'];
//   const comparison_signature = createComparisonSignature(body);

//   if (!compareSignatures(signature, comparison_signature)) {
//     return res.status(401).send('Mismatched signatures');
//   }

//   const { action, ...payload } = body;
//   req.event_type = headers['x-github-event']; // one of: https://developer.github.com/v3/activity/events/types/ 
//   req.action = action;
//   req.payload = payload;
//   next();
// }

exports.verifyPostData = (req, res, next) => {
  const { headers, body } = req;

  const signature = headers['x-hub-signature'];
  const comparison_signature = createComparisonSignature(body);

  if (!compareSignatures(signature, comparison_signature)) {
    return res.status(401).send('Mismatched signatures');
  }

  const { action, ...payload } = body;
  req.event_type = headers['x-github-event']; // one of: https://developer.github.com/v3/activity/events/types/ 
  req.action = action;
  req.payload = payload;
  next();

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
