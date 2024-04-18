/*
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import app from './app.js';  




//JUST REMINDING THAT IT IS NOT EASY TO TEST ROUTES USING UNIT TESTS A Bunch of the software you could use has been deprecated 
//using postman to test the routes was easier for me

describe('Lab Routes', function() {
    before(function(done) {
        mongoose.connect('mongodb+srv://ericmarkcarlson:node123@cluster0.j4cyafb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => done());
    });

    after(function(done) {
        mongoose.connection.close().then(() => done());
    });

    describe('GET /', function() {
        it('should get all labs', function(done) {
            request(app)
                .get('/')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('POST /', function() {
        it('should create a new lab', function(done) {
            request(app)
                .post('/')
                .send({ name: 'New Lab', instructor: '12345', courseName: 'Biology 101', dateAndTime: new Date(), labType: 'Practical', location: 'Lab Room 3', capacity: 30 })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('_id');
                    done();
                });
        });
    });

    describe('GET /:labId', function() {
        it('should get a lab by id', function(done) {
            const Lab = mongoose.model('Lab');
            const lab = new Lab({ name: 'Sample Lab', instructor: '12345' });
            lab.save().then(savedLab => {
                request(app)
                    .get(`/${savedLab._id}`)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(done);
            });
        });
    });

});
*/