const routerCard = require('express').Router();
const {
  getCards, createCard, deleteCard, setLikeCard, dislikeCard,
} = require('../controllers/cards');

routerCard.get('/cards', getCards);
routerCard.post('/cards', createCard);
routerCard.delete('/cards/:cardId', deleteCard);
routerCard.put('/cards/:cardId/likes', setLikeCard);
routerCard.delete('/cards/:cardId/likes', dislikeCard);

module.exports = routerCard;
