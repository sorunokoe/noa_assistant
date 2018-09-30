'use strict';

const request = require('supertest');
const app = require('../app');
const rethinkmock = require('rethink-mock');
const proxyquire = require('proxyquire');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('sinon-chai'));

describe('Chat Unit Tests', function() {
    describe('#Message', () => {
        let messageService, r
        beforeEach(() => {
            r = rethinkmock.mock()
            messageService = proxyquire('../controllers/message', {
                'rethinkdb': r
            })
        })
        describe('#get', () => {
            it('should return the list of messages', () => {
                messageService.list(0, (messages) => {
                    expect(messages).to.be.an('array')
                })
            })
        })
        describe('#add', () => {
            it('should add a message', () => {
                let message = {"text": 'this test message', "type": "user"}
                messageService.add(message, (message) => {
                    expect(message.text).to.be.equal('this test message')
                    expect(message.type).to.be.equal('user')
                })
            })
        })
    })
})

describe('Chat Integration Tests', function() {
    describe('#GET /', function() {
        it('should get right title', function(done) {
            this.timeout(10000);
            request(app).get('/')
                .expect(200)
                .expect(/Noa Assistant/, done)
        });
        it('should get 404', function(done) {
            this.timeout(10000);
            request(app).get('/nopage')
                .expect(404)
                .expect(/404/, done)
        });
    });
});
