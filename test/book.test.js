const request = require('supertest');
const app = require('../src/server');

describe('GET /books', function () {
    it('return list of books', function (done) {
        request(app)
            .get('/api/books')
            .expect(200)
            .expect(async (res) => {
                console.log(JSON.stringify(res.text))
            }).end(done)
    })
})