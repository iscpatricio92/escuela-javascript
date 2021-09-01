const {config} = require('../../config');

const usersMock = [
  {
    email: 'patricio.gomez@sngular.com',
    name: 'ROOT',
    password: config.defaultAdminPassword,
    isAdmin: true,
  },
  {
    email: 'isc.patricio@gmail.com',
    name: 'Jose Maria',
    password: config.defaultUserPassword,
  },
  {
    email: 'maria@undefined.sh',
    name: 'Maria Jose',
    password: config.defaultUserPassword,
  },
];

module.exports = { usersMock };