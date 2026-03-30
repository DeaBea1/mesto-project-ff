function handleDeleteCard(cardElement) {
  cardElement.remove();
}

function handleLikeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

function createCard(
  cardData,
  deleteCardHandler,
  likeCardHandler,
  imageClickHandler,
  cardTemplate
) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => {
    deleteCardHandler(cardElement);
  });

  likeButton.addEventListener('click', () => {
    likeCardHandler(likeButton);
  });

  cardImage.addEventListener('click', () => {
    imageClickHandler(cardData);
  });

  return cardElement;
}

export { createCard, handleDeleteCard, handleLikeCard };
