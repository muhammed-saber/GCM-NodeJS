process.env.NODE_ENV = 'test';

let mongoose    = require("mongoose");
let device       = require('../models/device');

//Require some stuff we need
let chai        = require('chai');
let chaiHttp    = require('chai-http');
let app         = require('../app');
let should      = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Test Users & Boards', () => {

  /*
 * Test the /POST route
 */
   describe('/POST device', () => {
       // Test to post a new device
       it('it should POST a new user ', (done) => {
           // Make a temp user just for testing
           let newTestDevice = {
               deviceName: 'AIzaSyAcDkr8-aXdZGWzEk2BRCW5ujwjXzEojFw',
               deviceId: '713190758664',
               registrationId: 'c5355j-XGEI:APA91bEkYswCt3nmHDT6FGDGMh1yioSFmYfJqcd7kURBkc6RXEuKnG_fklkLU7wX1X1zS_r5ZYmlePOGx3G6VonnaNGTrSwOSCKKi8XJqrbFDA7gtvvOOYoOmmNWV4yG0i_O0rl-0k6n',
           }
           chai.request(app)
               .post('/register')
               .send(newTestUser)
               .end((err, res) => {
                   // everything is ok?
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   // Did it even got saved?!
                   res.body.should.have.property('success').eql(true);
                   // See if the new user is complete
                   res.body.device.should.have.property('deviceId');
                   res.body.newUser.should.have.property('deviceName');
                   res.body.newUser.should.have.property('registrationId');
                   // does he have a token?
                   res.body.should.have.property('token');
                   res.body.token.should.be.a('string');
                   done();
               });
       });
   });


   describe('/POSt push', () => {
         it('it should post the message of this device', (done) => {
           let device = new device({
               messgae: 'hello world',
               registrationId: ''
           });
           device.save((err, user) => {
                   chai.request(app)
                   .post('/push')
                   .send({
                       message: message,
                   })
                   .end((err, res) => {
                       res.should.have.status(200);
                       res.body.should.be.a('object');
                       // Make sure that the server is naughty :)
                       res.body.messgae.should.have.property('message').eql('This is a test meaage');

                     done();
                   });
             });
         });
     });


   });
