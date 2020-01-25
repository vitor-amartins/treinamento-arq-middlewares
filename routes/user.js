const express = require('express');
const user = require('./../controllers/user');
const authorizer = require('./../helpers/authorizer');
const permissioner = require('./../helpers/permissioner');

const router = express.Router();

router.route('/api/users').post(
  user.create,
);

router.route('/api/users').get(
  authorizer,
  user.list,
);

router.route('/api/users/:id').get(
  authorizer,
  user.detail,
);

router.route('/api/users/:id').patch(
  authorizer,
  permissioner(['normal']),
  user.update,
);

router.route('/api/users/:id').delete(
  authorizer,
  permissioner(['admin']),
  user.remove,
);

module.exports = router;
