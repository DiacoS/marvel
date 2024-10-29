const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const should = chai.should();

chai.use(chaiHttp);

describe('Marvel API', () => {
    /**
     * Test the GET route for all heroes
     */
    describe('GET /marvel', () => {
        it('should GET all the heroes', (done) => {
            chai.request(server)
                .get('/marvel')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(5);
                    done();
                });
        });
    });
});
describe('POST /marvel', () => {
    it('should POST a new marvel', (done) => {
        const newHero = {
            id: 6,
            name: "Black Widow",
            alias: "Natasha Romanoff",
            powers: ["Martial arts", "Spycraft", "Agility"]
        };

        chai.request(server)
            .post('/marvel')
            .send(newHero)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('id').eql(6);
                res.body.should.have.property('name').eql('Black Widow');
                res.body.should.have.property('alias').eql('Natasha Romanoff');
                done();
            });
    });

    it('should not POST a hero without required fields', (done) => {
        const newHero = {
            id: 7,
            alias: "Unknown Marvel"
        };

        chai.request(server)
            .post('/marvel')
            .send(newHero)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eql('Name, alias, and powers are required');
                done();
            });
    });
});
