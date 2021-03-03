/** Modulo core que compara variables, valores y objetos de manera estricta */
const assert = require('assert')

/** Modulo de inyeccion de datos / cambia la ruta del require en cualquier modulo */
const proxyquire = require('proxyquire')

/** 
 * Mock de la libreria de mongo y de sus metodos
 * / clase de los metodos de la libreria y detector de peticionees a los metodos
 * */
const { 
  MongoLibMock, 
  getAllStub 
} = require('../utils/mocks/mongoLib')

/** Mock de la DB / lista de peliculas */
const { moviesMock } = require('../utils/mocks/movies')

/**
 * Pruebas: toma el archivo de servicios y cambia la ruta de la libreria de mongo
 * por la clase exportada de la MongoLibMock. Esto daria como resultado
 * una clase con la misma estructura pero que los metodos de la libreria
 * de mongo serian mas bien hacia el mock, y se crea una instancia de ella.
 */
describe('services - movies', function() {
  const MoviesService = proxyquire('../services/movies.js', {
    '../lib/mongo': MongoLibMock
  })
  const moviesService = new MoviesService()
  describe('when getMovies method is called', async function() {

    /**
     * Prueba hace una peticion al servicio getMovies, como este servicio manda
     * a llamar al metodo getAllStub obtenemos una senial mediante sinon 
     * de que fue llamado el metodo
     * getAllStub es el metodo que implantamos mediante proxyquire
     * Si efectivamente se llamo, recibiriamos un true del assert, y con esto una prueba exitosa
     */
    it('should call the getAll MongoLib method', async function() {
      await moviesService.getMovies({})
      assert.strictEqual(getAllStub.called, true)
    })
    
    /**
     * Prueba: que la respuesta obtenida del servicio getMovies sea igual a la que esperamos
     * hacemos la peticion y guardamos el resultado, recuerda que se hace al mock de lib
     * tomamos el objeto de la lista de datos del mock de movies
     * con assert verificamos que sea estrictamente igual
     */
    it('should return an array of movies', async function() {
      const result = await moviesService.getMovies({})
      const expected = moviesMock
      assert.deepEqual(result, expected)
    })
  })
})