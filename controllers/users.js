const User = require('../models/user');

const {
  OK_REQUEST = 200, ERROR_SERVER = 500, ERROR_INCORRECT_DATA = 400, ERROR_NOT_FOUND = 404,
} = process.env;

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(OK_REQUEST).send(users);
  } catch (err) {
    if (err._message === 'User validation failed') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      return;
    }

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

    res.status(OK_REQUEST).send(user);
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

    res.status(OK_REQUEST).send(user);
  } catch (err) {
    console.log(err);
    if (err._message === 'User validation failed') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      return;
    }

    res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports.editUserData = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id не найдено' });
      return;
    }

    res.status(OK_REQUEST).send(user);
  } catch (err) {
    if (err._message === 'Validation failed') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      return;
    }

    res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
  }
};

module.exports.editUserAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id не найдено' });
      return;
    }

    res.status(OK_REQUEST).send(user);
  } catch (err) {
    if (err.valueType !== 'String') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      return;
    }

    res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
  }
};
