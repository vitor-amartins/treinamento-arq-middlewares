const create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = res.locals.UTILS.hash(password, email);

    const user = await res.locals.MODELS.User.create({
      name,
      email,
      password: hashedPassword,
      role: 'normal',
    });

    res.locals.data = user;
    res.locals.data.password = undefined;
    res.locals.status = 201;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
};
