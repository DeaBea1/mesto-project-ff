function isLikedByCurrentUser(likes, currentUserId) {
  return likes.some((likeUser) => likeUser._id === currentUserId);
}

function updateLikeState(likeButton, likeCounter, likes, currentUserId) {
  likeButton.classList.toggle('card__like-button_is-active', isLikedByCurrentUser(likes, currentUserId));
  likeCounter.textContent = likes.length;
}

function handleDeleteCard(cardData, cardElement, deleteCardRequest, onError) {
  deleteCardRequest(cardData._id)
    .then(() => {
      cardElement.remove();
    })
    .catch(onError);
}

function handleLikeCard(
  cardData,
  likeButton,
  likeCounter,
  currentUserId,
  addLikeRequest,
  deleteLikeRequest,
  onError
) {
  const likeRequest = likeButton.classList.contains('card__like-button_is-active')
    ? deleteLikeRequest(cardData._id)
    : addLikeRequest(cardData._id);

  likeRequest
    .then((updatedCardData) => {
      cardData.likes = updatedCardData.likes;
      updateLikeState(likeButton, likeCounter, cardData.likes, currentUserId);
    })
    .catch(onError);
}

function createCard(
  cardData,
  currentUserId,
  openImagePopup,
  deleteCardRequest,
  addLikeRequest,
  deleteLikeRequest,
  onError,
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
  updateLikeState(likeButton, likeCounter, cardData.likes, currentUserId);

  const isOwnCard = cardData.owner._id === currentUserId;
  if (!isOwnCard) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      handleDeleteCard(cardData, cardElement, deleteCardRequest, onError);
    });
  }

  likeButton.addEventListener('click', () => {
    handleLikeCard(
      cardData,
      likeButton,
      likeCounter,
      currentUserId,
      addLikeRequest,
      deleteLikeRequest,
      onError
    );
  });

  cardImage.addEventListener('click', () => {
    openImagePopup(cardData);
  });

  return cardElement;
}

export { createCard }
