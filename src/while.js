const For = require('./for');

/**
 * For loop, without any iteration
 * @param       {Function} condition condition on which the loop is terminated
 * @param       {Function} body      body of the loop
 */
function While(condition, body) {
  // just perform a for loop that
  // never increments in its step
  For(0, condition, i => i, body);
}

module.exports = While;
