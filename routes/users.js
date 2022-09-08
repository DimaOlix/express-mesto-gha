const routerUser = require('express').Router();
const { validateEditAvatar, validateEditUser } = require('../middlewares/validations');

const {
  getUsers,
  getUser,
  editUserData,
  editUserAvatar,
} = require('../controllers/users');


routerUser.get('/users', getUsers);
routerUser.get('/users/me', getUser);
routerUser.patch('/users/me', validateEditUser, editUserData);
routerUser.patch('/users/me/avatar', validateEditAvatar, editUserAvatar);

module.exports = routerUser;
