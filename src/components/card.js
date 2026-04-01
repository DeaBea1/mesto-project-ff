function createCard(
  cardData,
  currentUserId,
  onDeleteClick,
  onLikeClick,
  onImageClick,
  cardTemplate
) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  const isOwnCard = cardData.owner._id === currentUserId;
  if (!isOwnCard) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      onDeleteClick(cardData, cardElement);
    });
  }

  const isLikedByCurrentUser = cardData.likes.some((likeUser) => likeUser._id === currentUserId);
  if (isLikedByCurrentUser) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', () => {
    onLikeClick(cardData, likeButton, likeCounter);
  });

  cardImage.addEventListener('click', () => {
    onImageClick(cardData);
  });

  return cardElement;
}

export { createCard }

