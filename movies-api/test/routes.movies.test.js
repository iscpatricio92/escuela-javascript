const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServicesMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

describe('routes - movies', function () {
    const route = proxyquire('../routes/movies', {
        '../services/movies': MoviesServicesMock
    })

    const request = testServer(route);
    describe('GET /movies', function () {
        it('should respond with status 200', function (done) {
            request.get('/api/movies').expect(200, done);
        });

        it('should respond with the list of movies', function (done) {
            request.get('/api/movies').end((err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: moviesMock,
                    message: 'movies listed'
                });

                done();
            });
        });

        it('should response requested movie', (done) => {
            const movieIdMock = moviesMock[0].id;
            request.get(`/api/movies/${movieIdMock}`).end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock[1],
                    message: 'movie retrieved',
                });
                done();
            });
        });
    });

    describe('POST /movies', function () {
        it('should reponse with status 201', (done) => {
            request.post('/api/movies').expect(201, done);
        });

        it('should response with movie id created', (done) => {
            request
                .post('/api/movies')
                .send(moviesMock[1])
                .end((err, res) => {
                    assert.deepEqual(res.body, {
                        data: moviesMock[1].id,
                        message: 'movie created',
                    });
                    done();
                });
        });
    });

    describe('PUT /movies', () => {
        const movieIdMock = moviesMock[0].id;
        it('should reponse with status 200', (done) => {
            request.put(`/api/movies/${movieIdMock}`).expect(200, done);
        });

        it('should response with movie updated', (done) => {
            request
                .put(`/api/movies/${movieIdMock}`)
                .send(moviesMock[1])
                .end((err, res) => {
                    assert.deepEqual(res.body, {
                        data: moviesMock[1],
                        message: 'movie updated',
                    });
                    done();
                });
        });
    });

    describe('DELETE /movies', () => {
        const movieIdMock = moviesMock[0].id;
        it('should reponse with status 200', (done) => {
            request.delete(`/api/movies/${movieIdMock}`).expect(200, done);
        });

        it('should response with movie updated', (done) => {
            request
                .delete(`/api/movies/${movieIdMock}`)
                .send(moviesMock[1])
                .end((err, res) => {
                    assert.deepEqual(res.body, {
                        data: moviesMock[1],
                        message: 'movie deleted',
                    });
                    done();
                });
        });
    });
});