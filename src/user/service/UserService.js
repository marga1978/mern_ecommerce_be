const User = require("../model/User");
const UserNotFoundException = require("../error/UserNotFoundException");
const bcrypt = require("bcrypt");

const create = async (body) => {
  const { username, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email: email,
    username: username,
    password: hashedPassword,
  });
  await user.save();
  //await User.create(body);
};

const getUsers = async (pagination) => {
  const { page, size } = pagination;
  const usersWithCount = await User.find()
    .skip(page * size)
    .limit(size);

  const numberUser = await User.find().countDocuments();
  return {
    content: usersWithCount,
    totalPages: Math.ceil(numberUser / Number.parseInt(size)),
  };
};

const getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new UserNotFoundException();
  }
  return user;
};

const updateUser = async (id, body) => {
  const user = await User.findById(id);
  user.username = req.body.username;
  await user.save();
};

const deleteUser = async (id) => {
  await User.deleteOne({ _id: id });
};

const findByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

module.exports = {
  create,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  findByEmail,
};
