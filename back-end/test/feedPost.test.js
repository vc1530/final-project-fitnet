const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp); 

describe('/GET/:username', () => { 
    it('it should GET a post by the given username', (done) => { 
        const user = { 
            username: "lbloomer",
            description:"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
            picture:"http://dummyimage.com/219x100.png/dddddd/000000"
        }
        chai.request(server) 
        .get('/w/' + user.username) 
        .send(user) 
        .end((err, res) => { 
            res.should.have.status(200) 
            res.body.should.be.a("object") 
            res.body.should.have.property("user") 
            res.body.should.have.property("status")
            res.body.user.should.be.a("object")
            res.body.status.should.be.a("string")
            res.body.user.username.should.eql(user.username) 
            res.body.user.description.should.eql(user.description)
            res.body.user.picture.should.eql(user.picture)
            done() 
        })
    })
})