const { body, validationResult } = require("express-validator");

const UserService = require("../service/UserService");

exports.postUser = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("username_null")
      .bail()
      .isLength({ min: 4, max: 32 })
      .withMessage("username_size"),
    body("email")
      .isEmail()
      .withMessage("email_invalid")
      .bail()
      .custom(async (email) => {
        const user = await UserService.findByEmail(email);
        if (user) {
          throw new Error("email_inuse");
        }
      }),
  ];
};
