const routerUser = require('express').Router();
const { validateEditAvatar, validateEditUser, validateUserId } = require('../middlewares/validations');

const {
  getUsers,
  getUserById,
  getUser,
  editUserData,
  editUserAvatar,
} = require('../controllers/users');


routerUser.get('/users', getUsers);
routerUser.get('/users/me', getUser);
routerUser.get('/users/:userId', validateUserId, getUserById);
routerUser.patch('/users/me', validateEditUser, editUserData);
routerUser.patch('/users/me/avatar', validateEditAvatar, editUserAvatar);

module.exports = routerUser;
