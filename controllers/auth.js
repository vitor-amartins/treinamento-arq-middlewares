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

    const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
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

module.exports = {
  login,
};
