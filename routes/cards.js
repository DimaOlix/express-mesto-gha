const routerCard = require('express').Router();

const {
  getCards, createCard, deleteCard, setLikeCard, dislikeCard,
} = require('../controllers/cards');

const { validateCreateCard, validateCardId } = require('../middlewares/validations');


routerCard.get('/cards', getCards);
routerCard.post('/cards', validateCreateCard, createCard);
routerCard.delete('/cards/:cardId', validateCardId, deleteCard);
routerCard.put('/cards/:cardId/likes', validateCardId, setLikeCard);
routerCard.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = routerCard;
