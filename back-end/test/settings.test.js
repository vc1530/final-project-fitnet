/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();
const uid = '62622e304caa546a3b5a3033';

describe('/POST save-changes', () => {
  it('it should UPDATE the current user information in settings with requested changes', (done) => {
    const user = {
      uid,
      name: 'Mocha Test',
      username: 'mochaTest',
      bio: `This is a unit test update to user profile. Date of udpate: ${Date.now}`,
      email: 'mochaTest@gmail.com',
      password: 'coffee',
    };
    chai
      .request(server)
      .post('/save-changes')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('user');
        res.body.should.have.property('status');
        res.body.user.should.be.a('object');
        res.body.status.should.be.a('string');
        res.body.user.should.have.property('name');
        res.body.user.should.have.property('username');
        res.body.user.should.have.property('bio');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('password');
        res.body.user.name.should.eql(user.name);
        res.body.user.username.should.eql(user.username);
        res.body.user.bio.should.eql(user.bio);
        res.body.user.email.should.eql(user.email);
        res.body.user.password.should.eql(user.password);
        done();
      });
  });
});
