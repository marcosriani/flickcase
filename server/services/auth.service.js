// MIDDLEWARE
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiArror');

// MODELS
const { User } = require('../models/user');

// SERVICES
const userService = require('./user.service');

const createUser = async (email, password) => {
  try {
    // check the email doesn't exist
    if (await User.emailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry email taken');
    }

    const user = new User({ email, password });

    await user.save();

    return user;

    // add user to DB (hash the password)
  } catch (error) {
    throw error;
  }
};

const genAuthToken = (user) => {
  const token = user.generateAuthToken();
  return token;
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry BAD email');
    }

    if (!(await user.comparePassword(password))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Sorry BAD password');
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  genAuthToken,
  signInWithEmailAndPassword,
};
