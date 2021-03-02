// Capa de Librerias------------------------------
const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

// encodeURLComponent Nos garantiza si hay caracteres especiales no haiga problema al conectarse
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);

// Conexion a la base de datos con mongo
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

// Usar la Libreria mongo
class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      // Tener la ultima configuracion de mongodb
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  // Conexion con promesas a una Base de Datos
  connect() {
    // Patron Singleton
    if (!MongoLib.connection) {
      // Promesa con async/await
      MongoLib.connection = new Promise((resolve, reject) => {
        // console.log(this.client);
        this.client.connect((err) => {
          if (err) {
            // Si se rechaza manda un error
            reject(err);
          }
          console.log('Connected succesfully to mongo');
          // Si se resuelve
          resolve(this.client.db(this.dbName));
          // console.log(this.client);
          // console.log(this.client.db());
          // console.log(this.client.db(this.dbName));
        });
      });
    }
    // Devolver en la funcion connect() la conexion a mongodb
    return MongoLib.connection;
  }

  // ------------Implementacion de Acciones---------

  // GETALL obtenemos toda la conexion
  getAll(collection, query) {
    return this.connect().then((db) => {
      // db.collection(collection) me crea una nueva coleccion con el nombre 'clients'
      // db es la respuesta a la peticion a la base de datos
      // db.collection.find() realiza una consulta sobre toda la coleccion o vista
      return db.collection(collection).find(query).toArray();
    });
  }

  // GET obtenemos una sola conexion
  get(collection, id) {
    return this.connect().then((db) => {
      // db.collection.findOne() realiza una consulta y devulve un solo documento
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  // POST Creamos una nueva conexion
  create(collection, data) {
    return this.connect()
      .then((db) => {
        // db.collection.insertOne() inserta nuevos datos a la base de datos
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  // PUT Actualizar un dato de una conexion
  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        // db.collection.update() actualiza con tres parametros la data
        // (1,2,3)
        // 1 => recibe un id de la data para actulizar
        // 2 => con $set actuliza la data en la base de datos
        // 3 => con upsert determina lo que se actuliza e inserta
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => result.upsertedId || id);
  }

  // DELETE Elimina una conexion
  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

module.exports = MongoLib;