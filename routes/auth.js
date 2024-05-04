const { Router } = require("express");
const { check } = require("express-validator");

const { createUser, loginUser, renewToken } = require("../controllers/auth");
const {validateFields} = require('../middlewares/field-validator');
const { validateJwt } = require('../middlewares/jwt-validator')

const router = Router();

router.post(
  "/new",
  [
    check("name", "Name is mandatory").not().isEmpty(),
    check("email", "Email is mandatory").isEmail(),
    check(
      "password",
      "Password length must have 6 characters at least"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email is mandatory").isEmail(),
    check(
      "password",
      "Password length must have 6 characters at least"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);

router.get("/renew",validateJwt, renewToken);

module.exports = router;
