const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp); 

describe('/GET/:username', () => { 
    it('it should GET a user by the given username', (done) => { 
        const user = { 
            username:"lbloomer8",
            name:"Lucienne Bloomer",
            profile_pic:"http://dummyimage.com/153x100.png/dddddd/000000","email":"lbloomer8@jigsy.com","password":"iLKmbdjk6w","bio":"Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi."
        }
        chai.request(server) 
        .get('/' + user.username) 
        .end((err, res) => { 
            res.should.have.status(200) 
            res.body.should.be.a("object") 
            res.body.should.have.property("user") 
            res.body.should.have.property("status")
            res.body.user.should.be.a("object")
            res.body.status.should.be.a("string")
            res.body.user.should.have.property("username") 
            res.body.user.should.have.property("name") 
            res.body.user.should.have.property("bio") 
            res.body.user.username.should.eql(user.username) 
            res.body.user.name.should.eql(user.name)
            res.body.user.bio.should.eql(user.bio)
            done() 
        })
    })
})