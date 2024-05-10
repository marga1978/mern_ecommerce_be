module.exports = (req, res, next) => {
  console.log("mia paginazione")
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if(!isNaN(pageAsNumber) && pageAsNumber > 0){
    page = pageAsNumber;
  }

  let size = 10;
  if(!isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
    size = sizeAsNumber;
  }
  req.pagination = {
    page, size
  }
  next();
}

