exports.secret = 'gearz-is-my-life';

// GitHub: X-Hub-Signature
// Gogs:   X-Gogs-Signature
exports.signatureHeaderName = 'x-hub-signature';

exports.GITHUB_EVENTS = Object.freeze({
  ASSIGNED: 'assigned',
  UNASSIGNED: 'unassigned',
  REVIEW_REQUESTED: 'review_requested',
  REVIEW_REQUEST_REMOVED: 'review_request_removed',
  LABELED: 'labeled',
  UNLABELED: 'unlabeled',
  OPENED: 'opened',
  EDITED: 'edited',
  CLOSED: 'closed',
  READY_FOR_REVIEW: 'ready_for_review',
  LOCKED: 'locked',
  UNLOCKED: 'unlocked',
  REOPENED: 'reopened',
});
