const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log({ email, password })
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }

    user = new User(req.body);
    // console.log({user})

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    const token = await generateJWT(user._id, user.name);

    res.status(201).json({
      ok: true,
      message: "register",
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Database error creating user",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User doesn´t  exist",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "User or password not valid",
      });
    }

    const token = await generateJWT(user._id, user.name);

    res.status(200).json({
      ok: true,
      message: "login",
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Database error logging user",
    });
  }
};

const renewToken = async (req, res) => {
  const { uid, name } = req;

  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    message: "renew",
    uid,
    name,
    token,
  });
};

module.exports = { createUser, loginUser, renewToken };
