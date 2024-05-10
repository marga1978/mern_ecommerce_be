module.exports = function InvalidObjectIdException(){
  this.status = 400;
  this.message = 'Invalid Object ID';
}