const express = require('express');
const db = require('../db/db');
const joi = require('joi');

const { Op } = db.Sequelize;

const router = express.Router();

const schema = joi.object().keys({
  name: joi.string().min(1).max(50).required(),
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
    const artists = await db.artist.findAll(filter);
    res.json(artists);
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id = 0 } = req.params;
    const artist = await db.artist.findByPk(id, {
      include: [db.album],
    });

    if (artist) res.json(artist);
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
    const artist = await db.artist.create(data);
    res.json(artist);
  } catch (e) {
    next(e);
  }
};

router.route('/').get(getAll).post(create);
router.route('/:id').get(getOne);

module.exports = router;
