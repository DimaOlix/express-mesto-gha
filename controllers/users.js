const User = require('../models/user');
const { ERROR_SERVER, ERROR_INCORRECT_DATA, ERROR_NOT_FOUND } = require('../utils/utils');


module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    res.status(ERROR_SERVER).send({ message: err.message });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id не найдено' });
      return;
    }

    res.send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Некорректный id пользователя' });
      return;
    }

    res.status(ERROR_SERVER).send({ message: err.message });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    const user = await User.create({ name, about, avatar });

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      return;
    }

    res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports.editUserData = async (req, res) => {
  try {
    if (req.body.name && req.body.about) {
      const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id не найдено' });
        return;
      }
      res.send(user);
    }
    res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      return;
    }

    res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports.editUserAvatar = async (req, res) => {
  try {
    if (req.body.avatar) {
      const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id не найдено' });
        return;
      }

      res.send(user);
    }
    res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      return;
    }

    res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
  }
};
