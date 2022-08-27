const Card = require('../models/card');

const {
  OK_REQUEST = 200, ERROR_SERVER = 500, ERROR_INCORRECT_DATA = 400, ERROR_NOT_FOUND = 404,
} = process.env;

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.status(OK_REQUEST).send(cards);
  } catch (err) {
    if (err.errors.name.name === 'ValidatorError') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
    }

    res.send({ message: err.message });
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;

    const card = await Card.create({ name, link, owner });

    res.status(OK_REQUEST).send(card);
  } catch (err) {
    if (err.errors.name.name === 'ValidatorError') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
    }

    res.status(ERROR_SERVER).send({ message: err.message });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);

    if (!card) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с данным id не найдена' });
      return;
    }

    res.status(OK_REQUEST).send(card);
  } catch (err) {
    res.status(ERROR_SERVER).send({ message: err.message });
  }
};

module.exports.setLikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с данным id не найдена' });
      return;
    }

    res.status(OK_REQUEST).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные для постановки лайка' });
      return;
    }

    res.status(ERROR_SERVER).send({ message: err.message });
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с данным id не найдена' });
      return;
    }

    res.status(OK_REQUEST).send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные для удаления лайка' });
      return;
    }

    res.status(ERROR_SERVER).send({ message: err.message });
  }
};
