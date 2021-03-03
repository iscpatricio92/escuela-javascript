/*
  Creando rutas con express
*/
const express = require('express')
const MovieService = require('../services/movies')
const {
    movieIdSchema,
    updateMovieSchema,
    createMovieSchema
} = require('../utils/schemas/movies')
const validationHandler = require('../utils/middleware/validationHandler')

const cacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

function moviesApi(app) {
    /*
        Middleware de rutas, siempre se va a consultar la ruta
        /api/movies antes que cualquier otra.
    */
    const router = express.Router()
    app.use('/api/movies', router)

    const moviesService = new MovieService();

    router.get('/', async function (req, res, next) {
        const { tags } = req.query;
        //throw new Error('Error forced')
        try {
            cacheResponse(res,FIVE_MINUTES_IN_SECONDS)
            const movies = await moviesService.getMovies({ tags });

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/:movieId',
        validationHandler({ movieId: movieIdSchema }, 'params'),
        async function (req, res, next) {
            const { movieId } = req.params;
            cacheResponse(res,SIXTY_MINUTES_IN_SECONDS)
            try {
                const movies = await moviesService.getMovie({ movieId });

                res.status(200).json({
                    data: movies,
                    message: 'movie retrieved'
                });
            } catch (err) {
                next(err);
            }
        });

    /** create movie*/
    router.post('/',
        validationHandler({ movieId: movieIdSchema }, 'params'),
        validationHandler(createMovieSchema),
        async (req, res, next) => {
            const { body: movie } = req
            try {
                const createMovieId = await moviesService.createMovie({ movie })
                res.status(201).json({
                    data: createMovieId,
                    message: 'movie create'
                })
            }
            catch (err) {
                next(err)
            }
        })

    /** update movie */
    router.put('/:movieId',
        validationHandler({ movieId: movieIdSchema }, 'params'),
        validationHandler(updateMovieSchema),
        async (req, res, next) => {
            const { movieId } = req.params;
            const { body: movie } = req
            try {
                const updateMovieId = await moviesService.updateMovie({ movieId, movie })
                res.status(200).json({
                    data: updateMovieId,
                    message: 'movie updated'
                })
            }
            catch (err) {
                next(err)
            }
        })

    /** update patchmovie */
    router.patch('/:movieId',
        validationHandler({ movieId: movieIdSchema }, 'params'),
        validationHandler(updateMovieSchema),
        async (req, res, next) => {
            const { movieId } = req.params;
            const { body: movie } = req
            try {
                const updateMovieId = await moviesService.patchMovie({ movieId, movie })
                res.status(200).json({
                    data: updateMovieId,
                    message: 'movie patched'
                })
            }
            catch (err) {
                next(err)
            }
        })

    /** delete movie */
    router.delete('/:movieId',
        validationHandler({ movieId: movieIdSchema }, 'params'),
        async (req, res, next) => {
            const { movieId } = req.params;
            try {
                const deleteMovieId = await moviesService.deleteMovie({ movieId })
                res.status(200).json({
                    data: deleteMovieId,
                    message: 'movie deleted'
                })
            }
            catch (err) {
                next(err)
            }
        })

    router.get('/bisiesto/:year', (req, res) => {
        let anio = req.params.year;
        console.log(anio)
        if ((anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0)
            res.send(`El año ${anio} es bisiesto.`)
        else
            res.send(`El año ${anio} NO es bisiesto.`)
    })

}


module.exports = moviesApi;