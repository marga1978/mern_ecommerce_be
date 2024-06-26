const express = require("express");
const User = require("../model/User");
//const UserNotFoundException = require("./UserNotFoundException");
const router = express.Router();
const pagination = require("../../shared/pagination");
const objectIdControl = require("../../shared/objectIdNumberControl");
const UserService = require("../service/UserService");
const postUser = require("../validation/validators").postUser;
const { body, validationResult } = require("express-validator");
const ValidationException = require("../../shared/ValidationException");


router.post(
  "/users",
  postUser(),
  async (req, res, next) => {
    //try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ValidationException(errors.array()))
      }
      await UserService.create(req.body);
      res.send({message: req.t('user_create_success')});
      
    // } catch (err) {
    //   res.send(err);
    // }
  }
);

router.get("/users", pagination, async (req, res) => {
  try {
    const pageUser = await UserService.getUsers(req.pagination);
    res.send(pageUser);
  } catch (err) {
    next(err);
  }
});

router.get("/users/:id", objectIdControl, async (req, res, next) => {
  try {
    const user = await UserService.getUser(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.put("/users/:id", objectIdControl, async (req, res) => {
  try{
    await UserService.getUser(req.params.id, req.body);
    res.send("updated");
  }catch(err){
    next(err);
  }
  
});

router.delete("/users/:id", objectIdControl, async (req, res) => {
  const id = req.params.id;
  try{
    await UserService.deleteUser(id);
    res.send("removed");
  }catch(err){
    next(err);
  }
});

module.exports = router;
