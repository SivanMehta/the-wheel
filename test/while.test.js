const assume = require('assume');
const sinon = require('sinon');
const { While } = require('../');

describe('While', function () {
  it('is a function', function () {
    assume(While).is.a('function');
  });

  it('takes 2 parameters', function () {
    assume(While).has.length(2);
  });

  it('correctly performs an iterative sum', function () {
    let correctSum = 0;
    let i = 0;
    while(i < 10) {
      correctSum += ++i;
    }

    let sum = 0;
    let index = 0;
    While(() => index < 10, () => {
      sum += ++index;
    });

    assume(sum).equals(correctSum);
  });

  it('correctly fizzbuzzes', function () {
    const correctMessages = [];
    let i = 0;
    while(i < 100) {
      if (i % 15 === 0) {
        correctMessages.push('fizzbuzz');
      } else if (i % 3 === 0) {
        correctMessages.push('fizz');
      } else if (i % 5 === 0) {
        correctMessages.push('buzz');
      } else {
        correctMessages.push(i);
      }

      i ++;
    }

    const messages = [];
    let index = 0;
    While(() => index < 100, () => {
      if (index % 15 === 0) {
        messages.push('fizzbuzz');
      } else if (index % 3 === 0) {
        messages.push('fizz');
      } else if (index % 5 === 0) {
        messages.push('buzz');
      } else {
        messages.push(index);
      }
      index ++;
    });

    messages.forEach((message, i) => {
      assume(message).equals(correctMessages[i]);
    });
  });

  it('performs the body the correct number of times', function () {
    const body = sinon.stub();
    const iterations = 10;
    let i = 0;
    While(() => i < iterations, () => {
      body();
      i ++;
    });

    assume(body.callCount).equals(iterations);
  });

  it('breaks when something is returned from the body', function () {
    const stub = sinon.stub();
    const stopAfter = 5;
    let i = 0;
    While(() => true, () => {
      if(++i > stopAfter) {
        return 1;
      }

      stub();
    });

    assume(stub.callCount).equals(stopAfter);
  });
});
