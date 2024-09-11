
const processingQueue = {};
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const RATE_LIMIT_PER_SECOND = 1;
const RATE_LIMIT_PER_MINUTE = 20;

function isWithinRateLimit(userId) {
  const now = Date.now();
  const userQueue = processingQueue[userId] || [];

  const filteredQueue = userQueue.filter((time) => now - time < MINUTE);

  if (filteredQueue.length >= RATE_LIMIT_PER_MINUTE || (filteredQueue.length && now - filteredQueue[filteredQueue.length - 1] < SECOND)) {
    processingQueue[userId] = filteredQueue;  
    return false;
  }

  filteredQueue.push(now);
  processingQueue[userId] = filteredQueue;
  return true;
}

module.exports = isWithinRateLimit;
