const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signInErrors, signUpErrors } = require("../utils/error.utils");

// La session reste active pendant 24h 
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: '24h'})
}

module.exports.signUp = async (req, res, next) => {
  const { pseudo, email, password, bio } = req.body;
  try {
    const user = await userModel.create({ pseudo, email, password, bio });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(401).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, expiresIn: '24h'});
    res.status(200).json({user: user._id});

  } catch (err) {
      const errors = signInErrors(err);
      res.status(400).json({errors});

  }
};

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
};
