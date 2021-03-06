const express = require('express');
const db = require('../db/db');
const joi = require('joi');
const { schemaValidate } = require('./utils/schemaValidate');

const { Op } = db.Sequelize;

const router = express.Router();

const schema = joi.object().keys({
  name: joi.string().min(1).max(50).required(),
});

const artistInclude = [
  {
    model: db.album,
    attributes: ['id', 'name'],
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
      include: artistInclude,
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
    const errMessArr = schemaValidate(schema, data);

    if (errMessArr.length) {
      res.status(422).send(errMessArr.join(', '));
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
