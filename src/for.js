/**
 * For loop, without any iteration
 * @param       {Function} initial   initial value of the loop iterator
 * @param       {Function} condition condition on which the loop is terminated
 * @param       {Function} step      a mutation to the iterator after every loop
 * @param       {Function} body      body of the loop
 * @constructor
 */
function For(initial, condition, step, body) {
  if(!condition(initial)) {
    return;
  }

  const result = body(initial);

  if(typeof result === 'undefined') {
    For(step(initial), condition, step, body);
  }
}

module.exports = For;
