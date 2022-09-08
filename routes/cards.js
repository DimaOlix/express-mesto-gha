const routerCard = require('express').Router();

const {
  getCards, createCard, deleteCard, setLikeCard, dislikeCard,
} = require('../controllers/cards');

const { validateCreateCard, validateId } = require('../middlewares/validations');


routerCard.get('/cards', getCards);
routerCard.post('/cards', validateCreateCard, createCard);
routerCard.delete('/cards/:cardId', validateId, deleteCard);
routerCard.put('/cards/:cardId/likes', validateId, setLikeCard);
routerCard.delete('/cards/:cardId/likes', validateId, dislikeCard);

module.exports = routerCard;
