const permissioner = (allowedRoles) => async (req, res, next) => {
  try {
    if (!allowedRoles.includes(res.locals.USER.role)) {
      return next({ status: 403, data: 'You do not have permission for this' });
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = permissioner;
