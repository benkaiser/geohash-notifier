let chai = require('chai');
let expect = chai.expect;
let mockery = require('mockery');
var sinon = require('sinon');

describe('CheckDistance', () => {
  let subscriber = {
    email: 'test@test.com',
    latitude: -39.5,
    longitude: 144.5,
    radius: 10,
  };
  let results = [{
    graticule: [-39.101949801856094, 144.47190966014014],
    global: [-71.6490356659025, -10.112522349549124],
    neighbors: [
      [-38.101949801856094, 144.47190966014014],
      [-39.101949801856094, 145.47190966014014]
    ],
    date: '2016-10-26'
  }];
  let callback = sinon.spy();
  let notifySubscriberPerformSpy = sinon.spy();
  class NotifySubscriberMock {};
  NotifySubscriberMock.prototype.perform = notifySubscriberPerformSpy;

  before((done) => {
    mockery.registerMock('./notify_subscriber', NotifySubscriberMock);
    mockery.enable();
    let CheckDistance = require('../../services/check_distance');
    new CheckDistance(subscriber, results).perform(() => {
      callback();
      done();
    });
  });

  it('callback should be called', () => {
    expect(callback.called).to.equal(true);
  });

  it('calls the notify subscribers for all points', () => {
    expect(notifySubscriberPerformSpy.callCount).to.equal(4);
  })

  after(() => {
    mockery.disable();
  });
});
