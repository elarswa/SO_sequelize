const express = require('express');
const db = require('../db/db');
const joi = require('joi');

const { Op } = db.Sequelize;

const router = express.Router();

const addTrackSchema = joi.object().keys({
  track_id: joi.number().min(1).required(),
});

const playlistchema = joi.object().keys({
  name: joi.string().min(1).max(50).required(),
});

const playlistInclude = [
  {
    model: db.track,
    attributes: ['id', 'name', 'artist_id', 'album_id'],
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
    const valid = addTrackSchema.validate(data, {
      abortEarly: false,
    });
    if (valid.error) {
      const messages = valid.error.details.map(i => i.message);
      res.status(422).send(messages.join(', '));
      return;
    }
    const playlist = await db.playlist.findByPk(id, {
      include: playlistInclude,
    });
    const track = await db.track.findByPk(data.track_id);
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
    res.status(404).send();
  } catch (e) {
    next(e);
  }
};

const addPlaylist = async (req, res, next) => {
  try {
    const data = req.body;
    const valid = playlistchema.validate(data, {
      abortEarly: false,
    });
    if (valid.error) {
      const messages = valid.error.details.map(i => i.message);
      res.status(422).send(messages.join(', '));
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
