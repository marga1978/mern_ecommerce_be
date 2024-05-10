const InvalidObjectIdException = require('./InvalidObjectIdException');
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvalidObjectIdException();
  }
  next();
}