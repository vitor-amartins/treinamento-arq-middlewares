const models = require('./../models');

const modelInjector = async (req, res, next) => {
  try {
    res.locals.MODELS = models;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = modelInjector;
