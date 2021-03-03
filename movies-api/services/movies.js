const MongoLib = require('../lib/mongo')

class MoviesService {
    constructor() {
        this.collection = 'movies'
        this.mongoDB = new MongoLib()
    }
    async getMovies({ tags }) {
        const query = tags && { tags: { $in: tags } }
        const movies = await this.mongoDB.getAll(this.collection, query)
        return movies || []
    }

    async getMovie({movieId}) {
        const movies = await this.mongoDB.get(this.collection, movieId)
        return movies || {}
    }

    async createMovie({ movie }) {
        const createmovieId = await this.mongoDB.create(this.collection, movie)
        return createmovieId || {}
    }

    async updateMovie({ movieId, movie } = {}) {
        const updatemovieId = await this.mongoDB.update(this.collection, movieId, movie)
        return updatemovieId || {}
    }

    /*async patchMovie() {
        const updatePatchmovieId = await Promise.resolve(moviesMock[0].id)
        return updatePatchmovieId || {}
    }*/

    async deleteMovie({ movieId }) {
        const deletedmovieId = await this.mongoDB.delete(this.collection, movieId)
        return deletedmovieId || {}
    }
}

module.exports = MoviesService