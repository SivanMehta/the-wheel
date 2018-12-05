const assume = require('assume');
const sinon = require('sinon');
const { For } = require('../');

describe('For', function () {
  it('is a function', function () {
    assume(For).is.a('function');
  });

  it('takes 4 parameters', function () {
    assume(For).has.length(4);
  });

  it('correctly performs an iterative sum', function () {
    let correctSum = 0;
    for(let i = 0; i < 10; i ++) {
      correctSum += i;
    }

    let sum = 0;
    For(
      0,
      i => i < 10,
      i => i + 1,
      i => { sum += i }
    );

    assume(sum).equals(correctSum);
  });

  it('correctly fizzbuzzes', function () {
    const correctMessages = [];
    for(let i = 0; i < 100; i ++) {
      if (i % 15 === 0) {
        correctMessages.push('fizzbuzz');
      } else if (i % 3 === 0) {
        correctMessages.push('fizz');
      } else if (i % 5 === 0) {
        correctMessages.push('buzz');
      } else {
        correctMessages.push(i);
      }
    }

    const messages = [];
    For(0, i => i < 100, i => i + 1, i => {
      if (i % 15 === 0) {
        messages.push('fizzbuzz');
      } else if (i % 3 === 0) {
        messages.push('fizz');
      } else if (i % 5 === 0) {
        messages.push('buzz');
      } else {
        messages.push(i);
      }
    });

    messages.forEach((message, i) => {
      assume(message).equals(correctMessages[i]);
    });
  });

  it('performs the body the correct number of times', function () {
    const body = sinon.stub();
    const iterations = 10;
    For(0, i => i < iterations, i => i + 1, body);

    assume(body.callCount).equals(iterations);
  });

  it('breaks when something is returned from the body', function () {
    const stub = sinon.stub();
    const stopAfter = 5;
    For(0, i => i < 10, i => i + 1, i => {
      if(i < stopAfter) {
        stub();
      } else {
        return 1;
      }
    });

    assume(stub.callCount).equals(stopAfter);
  });
});
