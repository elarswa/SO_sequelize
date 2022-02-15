const express = require('express');

const router = express.Router();

const get = (req, res, next) => {
  res.status(200).send('Index Route: nothing here');
};

router.route('/').get(get);

module.exports = router;
