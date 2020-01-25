const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = res.locals.UTILS.hash(password, email);

    const user = await res.locals.MODELS.User.findOne({ email });

    if (!user) {
      return next({ status: 400, data: 'Wrong email' });
    }

    if (user.password !== hashedPassword) {
      return next({ status: 400, data: 'Wrong password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.locals.data = {
      token,
      id: user._id,
      role: user.role,
    };
    res.locals.status = 200;

    return next();
  } catch (err) {
    return next(err);
  }
};

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      return next({ status: 401, data: 'Token Not Found'});
    }
    try {
      await jwt.verify(token, process.env.JWT_SECRET);
      res.locals.status = 200;
      res.locals.data = true;
    } catch (err) {
      res.locals.status = 200;
      res.locals.data = false;
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
  checkToken,
};
