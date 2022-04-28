/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { default: mongoose } = require('mongoose');
const server = require('../app');

const should = chai.should();

const { User } = require('../models/User') 

describe('/POST new-post', () => {
  it('it should POST a new post with the given description', async () => {
    const user = await User.findOne({username: 'mochaTest'}) 
    const post = {
      user: user.id, 
      description:
        "Hey there everyone! Just me working out and doing some reps on a lovely Sunday. Hope y'all are doing well.",
    };
    chai
      .request(server)
      .post('/newPost')
      .send(post)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('newpost');
        res.body.should.have.property('status');
        res.body.newpost.should.be.a('object');
        res.body.status.should.be.a('string');
        res.body.newpost.should.have.property('user');
        res.body.newpost.should.have.property('description');
        res.body.newpost.user.should.eql(post.user);
        res.body.newpost.description.should.eql(post.description); 
      });
  });
});
