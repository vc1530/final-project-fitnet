/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();

chai.use(chaiHttp);
const uid = '62622e304caa546a3b5a3033';

describe('/GET/:id playlist', () => {
  it('it should GET a playlist by the given workout id', (done) => {
    const workout = {
      id: '1650602522875', // Dedicated testing workout
    };
    chai
      .request(server)
      .get(`/w/${uid}/${workout.id}`)
      //   .send(workout)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.workout.should.be.a('object');
        res.body.workout.should.have.property('playlist');
        res.body.should.have.property('status');
        res.body.workout.playlist.should.be.a('string');
        res.body.status.should.be.a('string');
        res.body.workout.playlist.should.eql(
          'https://open.spotify.com/album/4hDok0OAJd57SGIT8xuWJH?si=CW1fQJ4tRYCx-bOvv2we-A'
        );
        done();
      });
  });
});

describe('/POST/:id playlist', () => {
  it('it should UPDATE a playlist with the new url', (done) => {
    const workout = {
      id: '1650602522875',
      playlist: 'https://open.spotify.com/album/4hDok0OAJd57SGIT8xuWJH?si=CW1fQJ4tRYCx-bOvv2we-A',
    };
    chai
      .request(server)
      .post(`/p/${workout.id}`)
      .send({
        playlist: workout.playlist,
        uid,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('playlist');
        res.body.should.have.property('status');
        res.body.playlist.should.be.a('string');
        res.body.status.should.be.a('string');
        res.body.playlist.should.eql(workout.playlist);
        done();
      });
  });
});
