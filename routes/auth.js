const express = require('express');
const auth = require('./../controllers/auth');

const router = express.Router();

router.route('/api/login').post(
  auth.login,
);

router.route('/api/check-token').get(
  auth.checkToken,
);

module.exports = router;
