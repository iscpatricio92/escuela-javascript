/*
  Creando rutas con express
*/
const express = require('express')
const MovieService = require('../service/movies')
function moviesApi(app) {
    /*
        Middleware de rutas, siempre se va a consultar la ruta
        /api/movies antes que cualquier otra.
    */
    const router = express.Router()
    app.use('/api/movies', router)

    const moviesService = new MovieService();

    /** all movies */
    router.get('/', async (req, res, next) => {
        const { tags } = req.query;
        try {
            const movies = await moviesService.getMovies({ tags })
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        }
        catch (err) {
            next(err)
        }
    })

    /** one movie*/
    router.get('/:movieId', async (req, res, next) => {
        const { movieId } = req.params;
        try {
            const movies = await moviesService.getMovie({ movieId })
            res.status(200).json({
                data: movies,
                message: 'movie retrieved'
            })
        }
        catch (err) {
            next(err)
        }
    })

    /** create movie*/
    router.post('/', async (req, res, next) => {
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
    router.put('/:movieId', async (req, res, next) => {
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
    router.patch('/:movieId', async (req, res, next) => {
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
    router.delete('/:movieId', async (req, res, next) => {
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

}


module.exports = moviesApi;