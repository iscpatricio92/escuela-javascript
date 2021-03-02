const { moviesMock } = require('../utils/mocks/movies')

class MoviesService {
    async getMovies() {
        const movies = await Promise.resolve(moviesMock)
        return movies || []
    }

    async getMovie() {
        const movies = await Promise.resolve(moviesMock[0])
        return movies || {}
    }

    async createMovie() {
        const createmovieId = await Promise.resolve(moviesMock[0].id)
        return createmovieId || {}
    }

    async updateMovie() {
        const updatemovieId = await Promise.resolve(moviesMock[0].id)
        return updatemovieId || {}
    }

    async patchMovie() {
        const updatePatchmovieId = await Promise.resolve(moviesMock[0].id)
        return updatePatchmovieId || {}
    }

    async deleteMovie() {
        const deletedmovieId = await Promise.resolve(moviesMock[0].id)
        return deletedmovieId || {}
    }
}

module.exports= MoviesService