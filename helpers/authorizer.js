const jwt = require('jsonwebtoken');

const authorizer = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      return next({ status: 401, data: 'Token Not Found' });
    }

    try {
      const { id } = await jwt.verify(token, process.env.JWT_SECRET);

      const user = await res.locals.MODELS.User.findById(id);

      if (!user) {
        return next({ status: 401, data: 'User Deleted' });
      }

      res.locals.USER = user;

      return next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return next({ status: 401, data: 'Token Expired' });
      }
      if (err.name === 'JsonWebTokenError') {
        return next({ status: 401, data: 'Invalid Token' });
      }
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = authorizer;
