module.exports.errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).send(err.message);
  next();
};