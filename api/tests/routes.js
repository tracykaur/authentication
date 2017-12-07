const request = require('supertest');
const app = require('../server.js');
const User = require('../models/User');
const chai = require('chai');

const should = chai.should();

let token;

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
        password: 'edison123',
        role: 'admin'
      })

      .expect(200, done);
  });

  it('should login a user', done => {
    request(app)
      .post('/auth')
      .send({
        email: 'test1@test.com',
        password: 'edison123'
      })
      .expect(200)
      .then(response => {
        token = response.body.token;
        done();
      });
  });

  it('should require correct credentials to log in', done => {
    request(app)
      .post('/auth')
      .send({
        email: 'test1@test.com',
        password: 'edison456'
      })
      .expect(401, done);
  });

  it('Should require a token to view products', done => {
    request(app)
      .get('/products')
      .expect(401, done);
  });

  it('Should display products to valid token bearers', done => {
    request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(response => {
        // Make sure the response is an array!
        response.body.should.be.an('array');
        done();
      });
  });

  it('Should block a random user from accessing /admin', done => {
    request(app)
      .get('/admin')
      .expect(401, done);
  });

  after(() => {
    User.remove({ email: 'test1@test.com' }).then(() => {
      console.log('Cleaned up the database!');
    });
  });
});
