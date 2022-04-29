/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();

chai.use(chaiHttp);

const uid = '62622e304caa546a3b5a3033';

describe('/GET/:id workout', () => {
  it('it should GET a workout by the given id', (done) => {
    const workout = {
      id: 1650603476709,
      workout_name: 'Workout get test',
      workout_description: 'Dedicated workout for unit tests - DO NOT DELETE',
      exercises: [
        {
          index: 0,
          exercise_name: 'Bench Press',
          num_sets: 5,
          num_reps: 10,
        },
      ],
    };
    chai
      .request(server)
      .get(`/w/${uid}/${workout.id}`)
      .send(workout)
      .end((err, res) => {
        console.log('printing res.body');
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('workout');
        res.body.should.have.property('status');
        res.body.workout.should.be.a('object');
        res.body.status.should.be.a('string');
        res.body.workout.should.have.property('workout_name');
        res.body.workout.should.have.property('workout_description');
        res.body.workout.should.have.property('id');
        res.body.workout.workout_name.should.eql(workout.workout_name);
        res.body.workout.workout_description.should.eql(workout.workout_description);
        res.body.workout.id.should.eql(workout.id);
        done();
      });
  });
});

describe('/POST/:id workout', () => {
  it('it should UPDATE a workout with new workout name and workout description given the id', (done) => {
    const workout = {
      id: 1650607033688,
      workout_name: 'Workout edit test',
      workout_description:
        'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
    };
    chai
      .request(server)
      .post(`/w/${workout.id}`)
      .send({
        workout_name: 'new workout name!',
        workout_description: 'new workout description!',
        uid,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('workout');
        res.body.should.have.property('status');
        res.body.workout.should.be.a('object');
        res.body.status.should.be.a('string');
        res.body.workout.should.have.property('workout_name');
        res.body.workout.should.have.property('workout_description');
        res.body.workout.should.have.property('_id');
        res.body.workout.workout_name.should.eql('new workout name!');
        res.body.workout.workout_description.should.eql('new workout description!');
        res.body.workout._id.should.eql(workout.id);
        done();
      });
  });
});

describe('/POST/:new workout', () => {
  it('should generate a new workout', (done) => {
    chai
      .request(server)
      .post('/w/new')
      .send({
        // workout_name: 'new workout name!',
        // workout_description: 'new workout description!',
        uid,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('workout');
        res.body.should.have.property('status');
        res.body.workout.should.be.a('object');
        res.body.status.should.be.a('string');
        res.body.workout.should.have.property('workout_name');
        res.body.workout.should.have.property('workout_description');
        res.body.workout.should.have.property('_id');
        res.body.workout.workout_name.should.eql('New Workout');
        res.body.workout.workout_description.should.eql('');
        done();
      });
  });
});
