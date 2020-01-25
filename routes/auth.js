const express = require('express');
const auth = require('./../controllers/auth');

const router = express.Router();

router.route('/api/login').post(
  auth.login,
);

module.exports = router;
