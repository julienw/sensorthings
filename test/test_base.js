import should        from 'should';
import supertest     from 'supertest';
import app           from './server';
import sensorthings  from '../src/sensorthings';


const server = supertest.agent(app);

const resources = [
  'Datastreams',
  'FeaturesOfInterest',
  'HistoricalLocations',
  'Locations',
  'Observations',
  'ObservedProperty',
  'Sensors',
  'Things'
];

let expectedResponse = {};

expectedResponse.value = resources.map((name) => {
  return {
    name: name,
    url: 'http://127.0.0.1/' + name
  }
});

describe('Base API', () => {
  describe('GET ' + '/', () => {
    it('should return the list of resources', done => {
      server.get('/')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.be.equal(200);
          res.body.should.be.deepEqual(expectedResponse);
          done();
        });
    });
  });
});
