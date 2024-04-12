import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import server from './app.mjs'; // Update this path to match the location of app.js, change app.js to app.mjs if necessary
import Lab from './models/lab.mjs'; // Update this path, change lab.js to lab.mjs if necessary


//TESTING ROUTES DOES NOTE WORK WELL ON VS CODE USE POSTMAN TO TEST
//TESTING ROUTES DOES NOTE WORK WELL ON VS CODE USE POSTMAN TO TEST

//TESTING ROUTES DOES NOTE WORK WELL ON VS CODE USE POSTMAN TO TEST


const { expect } = chai;
chai.use(chaiHttp);

describe('Lab Router', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('GET /labs', () => {
        it('should return all labs', (done) => {
            const mockLabs = [{ /* mock lab data */ }, { /* another mock lab */ }];

            sinon.stub(Lab, 'find').yields(null, mockLabs);

            chai.request(server)
                .get('/labs')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.deep.equal(mockLabs);
                    done();
                });
        });

        it('should handle errors', (done) => {
            const error = new Error('Error fetching labs');

            sinon.stub(Lab, 'find').yields(error, null);

            chai.request(server)
                .get('/labs')
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
    });

    // Additional tests...
});
