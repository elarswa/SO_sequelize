const express = require('express');
const db = require('../db/db');
const joi = require('joi');

const { Op } = db.Sequelize;

const router = express.Router();

const schema = joi.object().keys({
  name: joi.string().min(1).max(50).required(),
  artist_id: joi.number().min(1),
});

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
    const albums = await db.album.findAll(filter);
    res.json(albums);
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id = 0 } = req.params;
    const album = await db.album.findByPk(id, {
      include: [db.artist],
    });

    if (album) res.json(album);
    res.status(404).send();
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const valid = schema.validate(data, {
      abortEarly: false,
    });
    if (valid.error) {
      const messages = valid.error.details.map(i => i.message);
      res.status(422).send(messages.join(', '));
      return;
    }
    const album = await db.album.create(data);
    res.json(album);
  } catch (e) {
    console.log('🛑  e:', e);
    next(e);
  }
};

router.route('/').get(getAll).post(create);
router.route('/:id').get(getOne);

module.exports = router;
