const express = require('express');
const indexRoute = require('../routes/index');
const playListRoute = require('../routes/playlist');
const artistRoute = require('../routes/artist');
const albumRoute = require('../routes/album');
const trackRoute = require('../routes/track');

module.exports = app => {
  app.use(express.json());

  app.use('/', indexRoute);
  app.use('/playlist', playListRoute);
  app.use('/artist', artistRoute);
  app.use('/album', albumRoute);
  app.use('/track', trackRoute);
};
