const express = require('express');
const app = express();
const cors = require('cors')
const helmet = require('helmet')

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');


const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body parser
app.use(express.json());

//cors
app.use(cors())
app.use(helmet())
// routes
moviesApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});