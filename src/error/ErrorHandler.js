module.exports = (err, req, res, next) => {
  console.log("error handler")
  res
    .status(err.status)
    .send(
      {
        message: err.message,
        timestamp: Date.now(),
        path: req.originalUrl
      });
}