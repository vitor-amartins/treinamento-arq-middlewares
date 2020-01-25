const utils = require('./../utils');

const userInjector = async (req, res, next) => {
  try {
    res.locals.UTILS = utils;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userInjector;
