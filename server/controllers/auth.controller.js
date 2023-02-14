const { authService } = require('../services');
const httpStatus = require('http-status');

const authController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.createUser(email, password);

      // token
      const token = await authService.genAuthToken(user);

      // send verification email

      // cookie
      res
        .cookie('x-access-token', token)
        .status(httpStatus.CREATED)
        .send({ user, token });
    } catch (error) {
      // console.log(error.message);
      // res.status(httpStatus.BAD_REQUEST).send(error.message);
      next(error);
    }
  },

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.signInWithEmailAndPassword(
        email,
        password
      );

      // token
      const token = await authService.genAuthToken(user);

      // cookie
      res.cookie('x-access-token', token).send({ user, token });
    } catch (error) {
      // res.status(httpStatus.BAD_REQUEST).send(error.message);
      next(error);
    }
  },
};

module.exports = authController;
