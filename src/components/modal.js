const openedPopupClass = 'popup_is-opened';

function handleEscClose(evt) {
  if (evt.key !== 'Escape') {
    return;
  }

  const openedPopup = document.querySelector(`.${openedPopupClass}`);
  if (openedPopup) {
    closeModal(openedPopup);
  }
}

function openModal(popup) {
  popup.classList.add(openedPopupClass);
  document.addEventListener('keydown', handleEscClose);
}

function closeModal(popup) {
  popup.classList.remove(openedPopupClass);
  document.removeEventListener('keydown', handleEscClose);
}

function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function setModalEventListeners(popup) {
  popup.addEventListener('click', handleOverlayClose);

  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModal(popup);
  });
}

export { openModal, closeModal, setModalEventListeners };
