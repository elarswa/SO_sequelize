const express = require('express');
const db = require('../db/db');
const joi = require('joi');
const { schemaValidate } = require('./utils/schemaValidate');

const { Op } = db.Sequelize;

const router = express.Router();

const addTrackSchema = joi.object().keys({
  trackId: joi.number().min(1).required(),
});

const playlistchema = joi.object().keys({
  name: joi.string().min(1).max(50).required(),
});

const playlistInclude = [
  {
    model: db.track,
    attributes: ['id', 'name', 'artistId', 'albumId'],
    through: {
      attributes: [],
    },
  },
];

const getAll = async (req, res, next) => {
  try {
    const { query = '' } = req.query;
    let filter = {};
    if (query)
      filter = {
        where: {
          name: {
            [Op.like]: `${query}%`,
          },
        },
      };
    const playlists = await db.playlist.findAll(filter);
    res.json(playlists);
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id = 0 } = req.params;
    const playlist = await db.playlist.findByPk(id, {
      include: playlistInclude,
    });

    if (playlist) res.json(playlist);
    res.status(404).send();
  } catch (e) {
    next(e);
  }
};

const addTrack = async (req, res, next) => {
  try {
    const { id = 0 } = req.params;
    const data = req.body;
    const errMessArr = schemaValidate(addTrackSchema, data);

    if (errMessArr.length) {
      res.status(422).send(errMessArr.join(', '));
      return;
    }
    const playlist = await db.playlist.findByPk(id, {
      include: playlistInclude,
    });
    const track = await db.track.findByPk(data.trackId);
    if (playlist && track) {
      const join = {
        trackId: track.id,
        playlistId: playlist.id,
      };
      const playlistTrack = await db.playlist_track.build(join);
      await playlistTrack.save();
      res.json(playlistTrack);
      return;
    }
    let errMessage = [];
    const notFound = ' not found';
    if (!track) errMessage.push('Track');
    if (!playlist) errMessage.push('Playlist');
    res.status(404).send(errMessage.join(', ') + notFound);
  } catch (e) {
    next(e);
  }
};

const addPlaylist = async (req, res, next) => {
  try {
    const data = req.body;
    const errMessArr = schemaValidate(playlistchema, data);

    if (errMessArr.length) {
      res.status(422).send(errMessArr.join(', '));
      return;
    }
    const playlist = await db.playlist.create(data);
    res.json(playlist);
  } catch (e) {
    next(e);
  }
};

router.route('/').get(getAll).post(addPlaylist);
router.route('/:id').get(getOne).post(addTrack);

module.exports = router;
