const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
  points: 1,
  duration: 1,
});

module.exports = rateLimiter;
