const request = require('supertest');
const app = require('../server.js');
const User = require('../models/User');

describe('Test routes', () => {
  it('should return a 404 for an invalid URL', done => {
    request(app)
      .get('/nothing-to-see-here')
      .expect(404, done);
  });

  it('should register a user', done => {
    request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'test1@test.com',
        password: 'edison123'
      })
      .expect(200, done);
  });

  it('should log a user in', done => {
    request(app)
      .post('/auth')
      .send({
        email: 'test1@test.com',
        password: 'edison123'
      })
      .expect(200, done);
  });

  it('should require correct credentials', done => {
    request(app)
      .post('/auth')
      .send({
        email: 'bloop@bloop.com',
        password: 'edison123'
      })
      .expect(401, done);
  });

  after(() => {
    User.remove({ email: 'test1@test.com' }).then(() => {
      console.log('Cleaned up the database!');
    });
  });
});
