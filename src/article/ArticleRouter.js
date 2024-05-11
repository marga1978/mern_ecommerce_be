const router = require("express").Router();
const Article = require("./Article");
const pagination = require('../shared/pagination');

router.get("/articles", pagination, async (req, res) => {
  try {
    const { page, size } = req.pagination;
    const articleWithCount = await Article.findAndCountAll({
      limit: size,
      offset: page * size,
    });

    const numberArticle = await User.find().countDocuments();
    res.send({
      content: articlesWithCount,
      totalPages: Math.ceil(numberArticle / Number.parseInt(size)),
    });
  } catch (err) {
    //console.log(err);
    res.send("error get articles");
  }
});

module.exports = router;
