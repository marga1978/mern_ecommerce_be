const { body, validationResult } = require("express-validator");

const UserService = require("../service/UserService");

exports.postUser = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Username cannot be null")
      .bail()
      .isLength({ min: 4, max: 32 })
      .withMessage("Username must have min 4 max 32 characters"),
    body("email")
      .isEmail()
      .withMessage("Must be a valid e-mail address")
      .bail()
      .custom(async (email) => {
        const user = await UserService.findByEmail(email);
        if (user) {
          throw new Error("Email in use");
        }
      }),
  ];
};
