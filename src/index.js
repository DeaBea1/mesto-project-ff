import { initialCards } from './cards.js';
import { createCard, handleDeleteCard, handleLikeCard } from './components/card.js';
import { openModal, closeModal, setModalEventListeners } from './components/modal.js';
import './styles/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const headerLogo = document.querySelector('.header__logo');
const profileImage = document.querySelector('.profile__image');
const logoUrl = new URL('./images/logo.svg', import.meta.url);
const avatarUrl = new URL('./images/avatar.jpg', import.meta.url);

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popups = Array.from(document.querySelectorAll('.popup'));

const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const editProfileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const cardNameInput = addCardForm.elements['place-name'];
const cardLinkInput = addCardForm.elements.link;

headerLogo.src = logoUrl.href;
profileImage.style.backgroundImage = `url('${avatarUrl.href}')`;

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

function renderCard(cardData, method = 'append') {
  const cardElement = createCard(
    cardData,
    handleDeleteCard,
    handleLikeCard,
    openImagePopup,
    cardTemplate
  );
  placesList[method](cardElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

function handleEditProfileClick() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
}

function handleAddCardClick() {
  openModal(newCardPopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  renderCard(newCard, 'prepend');
  addCardForm.reset();
  closeModal(newCardPopup);
}

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  setModalEventListeners(popup);
});

editProfileButton.addEventListener('click', handleEditProfileClick);
addCardButton.addEventListener('click', handleAddCardClick);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  renderCard(cardData);
});