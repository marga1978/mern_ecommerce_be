const express = require("express");
const User = require("./User");
//const UserNotFoundException = require("./UserNotFoundException");
const router = express.Router();
const pagination = require("../shared/pagination");
const objectIdControl = require("../shared/objectIdNumberControl");
const UserService = require("./UserService");



router.post("/users", async (req, res) => {
  try {
    await UserService.create(req.body);
    res.send("success");
  } catch (err) {
    res.send("error");
  }
});

router.get("/users", pagination, async (req, res) => {
  try{
    const pageUser = await UserService.getUsers(req.pagination);
    res.send(pageUser);
  }catch(err){
    res.send("error",err);
  }
  
});

router.get("/users/:id", objectIdControl, async (req, res, next) => {
  try {
    const user = await UserService.getUser(req.params.id);
    res.send(user);
  } catch (err) {
    console.log("errore singolo utente")
      next(err);
  }
});

router.put("/users/:id", objectIdControl, async (req, res) => {
  await UserService.getUser(req.params.id, req.body);
  res.send("updated");
});

router.delete("/users/:id", objectIdControl, async (req, res) => {
  const id = req.params.id;
  try {
    await UserService.deleteUser(id);
    res.send("removed");
  } catch (err) {
    res.send("error removed");
  }
});


module.exports = router;
