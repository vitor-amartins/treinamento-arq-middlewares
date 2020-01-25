const create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = res.locals.UTILS.hash(password, email);

    const user = await res.locals.MODELS.User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.locals.data = user;
    res.locals.data.password = undefined;
    res.locals.status = 201;
    return next();
  } catch (err) {
    return next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const users = await res.locals.MODELS.User.find().select('-password');

    res.locals.data = users;
    res.locals.status = 200;

    return next();
  } catch (err) {
    return next(err);
  }
};

const detail = async (req, res, next) => {
  try {
    const user = await res.locals.MODELS.User.findById(req.params.id).select('-password');

    res.locals.data = user;
    res.locals.status = 200;
    return next();
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await res.locals.MODELS.User.findById(req.params.id).select('-password');

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    await user.save();
    res.locals.data = user;
    res.locals.status = 200;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  list,
  detail,
  update,
};
