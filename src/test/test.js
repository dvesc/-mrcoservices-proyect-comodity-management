/* eslint-disable @typescript-eslint/no-var-requires */
const assert = require('assert'), //only work with this syntax
  chai = require('chai'), //only work with this syntax
  expect = chai.expect;
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

describe('chai test ', () => {
  // it's just an alias for described, but we can use it to distinguish
  it('should compare some values', () => {
    //compare 1 and 1
    expect(1).to.equal(1);
    // * two object
    expect({ name: 'david' }).to.deep.equal({ name: 'maria' });
    //if an obj has a property and its value is the same with ----
    expect({ name: 'david' }).to.have.property('name').to.equal('david');
    //if the condition is false
    expect(5 > 8).to.be.false;
    //if the value is a specific type
    expect({}), to.be.a('object');
    expect('hi'), to.be.a('string');
    expect(34), to.be.a('number');
    expect(null).to.be.null;
    expect(undefined).to.not.exist; //return true
    expect(2).to.exist; //return true
    //if the value is a string with a length of -----
    expect('hi'), to.be.a('string').to.lengthOf(3);
    //etc
  });

  it('testing an async-await function', async () => {
    //without the plugin
    const result = await 'something asynchronous';
    expect(result).to.equal('asynchronous result');

    //with chai-as-promised
    await expect('something asynchronous').to.eventually.equal(
      'asynchronous result',
    );
  });

  it('testing an async-await function', async () => {
    let spy = sinon.spy(console, 'log');
    //i dont understand what we compare here :D XD
    expect(spy.calledOnce).to.be.true; //maybe if we call that function?

    //other way using "sinon-chai" library (npm i --save-dev sinon-chai)
    //Also i dont understand what it means :D
    expect(spy).to.have.been.calledOnce;
  });
});
