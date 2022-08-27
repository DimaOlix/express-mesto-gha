const routerUser = require('express').Router();

const {
  getUsers, getUser, createUser, editUserData, editUserAvatar,
} = require('../controllers/users');

routerUser.get('/users', getUsers);
routerUser.get('/users/:userId', getUser);
routerUser.post('/users', createUser);
routerUser.patch('/users/me', editUserData);
routerUser.patch('/users/me/avatar', editUserAvatar);

module.exports = routerUser;
