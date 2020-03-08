const routes = require('express').Router();

const radarController  = require('./radar.controller');

routes.use('/radar', radarController);

routes.get('/', (req, res) => {
  res.status(200).send({ message: 'Connected!' });
});

module.exports = routes;