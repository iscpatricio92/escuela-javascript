/*
  Creando rutas con express
*/
const express = require('express')
const validationHandler = require('../utils/middleware/validationHandler')
const UserMoviesService = require('../services/userMovies')
const passport = require('passport')

const { movieIdSchema } = require('../utils/schemas/movies')
const { userIdSchema } = require('../utils/schemas/users')
const { createUserMovieSchema } = require('../utils/schemas/userMovies')

//strategy jwt
require('../utils/auth/strategies/jwt')

function userMoviesApi(app) {
    const router = express.Router();
    app.user('/api/user-movies', router);

    const userMoviesService = new UserMoviesService();

    router.get(
        '/',
        passport.authenticate('jwt', { session: false }),
        validationHandler({ userId: userIdSchema }, 'query'),
        async function (req, res, next) {
            const { userId } = req.query;

            try {
                const userMovies = await userMoviesService.getUserMovies({ userId });

                res.status(200).json({
                    data: userMovies,
                    message: 'user movies listed'
                });
            } catch (error) {
                next(error);
            }
        }
    );

    router.post('/', validationHandler(createUserMovieSchema),
        passport.authenticate('jwt', { session: false }),
        async function (req, res, next) {
            const { body: userMovie } = req;
            try {
                const createdUserMovieId = await userMoviesService.createUserMovie({
                    userMovie
                });

                res.status(201).json({
                    data: createdUserMovieId,
                    message: 'User movie created'
                })
            }
            catch (e) {
                next(e);
            }
        })

    router.delete(
        '/:userMovieId',
        passport.authenticate('jwt', { session: false }),
        validationHandler({ userMovieId: movieIdSchema }, 'params'),
        async function (req, res, next) {
            const { userMovieId } = req.params;

            try {
                const deletedUserMovieId = await userMoviesService.deleteUserMovie({
                    userMovieId
                });

                res.status(200).json({
                    data: deletedUserMovieId,
                    message: 'user movie deleted'
                });
            } catch (error) {
                next(error);
            }
        }
    );
}

module.exports = userMoviesApi;