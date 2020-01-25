const express = require('express');
const user = require('./../controllers/user');
const authorizer = require('./../helpers/authorizer');
const permissioner = require('./../helpers/permissioner');

const router = express.Router();

router.route('/api/users').post(
  user.create,
);

module.exports = router;
