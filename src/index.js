import { addCard, addLike, deleteCard, deleteLike, getInitialCards, getUserInfo, updateAvatar, updateUserInfo } from './components/api.js'
import { createCard } from './components/card.js'
import { closeModal, openModal, setModalEventListeners } from './components/modal.js'
import { clearValidation, enableValidation } from './components/validation.js'
import './styles/index.css'

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const headerLogo = document.querySelector('.header__logo');
const profileImage = document.querySelector('.profile__image');
const logoUrl = new URL('./images/logo.svg', import.meta.url);

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popups = Array.from(document.querySelectorAll('.popup'));

const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const editProfileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const editAvatarForm = document.forms['edit-avatar'];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const cardNameInput = addCardForm.elements['place-name'];
const cardLinkInput = addCardForm.elements.link;
const avatarInput = editAvatarForm.elements.avatar;
const profileSubmitButton = editProfileForm.querySelector('.popup__button');
const addCardSubmitButton = addCardForm.querySelector('.popup__button');
const avatarSubmitButton = editAvatarForm.querySelector('.popup__button');
let currentUserId = '';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

headerLogo.src = logoUrl.href;

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

function renderLoading(isLoading, buttonElement, defaultText) {
  buttonElement.textContent = isLoading ? 'Сохранение...' : defaultText;
}

function renderCard(cardData, method = 'append') {
  const cardElement = createCard(
    cardData,
    currentUserId,
    openImagePopup,
    deleteCard,
    addLike,
    deleteLike,
    (err) => {
      console.log(err);
    },
    cardTemplate
  );
  placesList[method](cardElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, profileSubmitButton, 'Сохранить');

  updateUserInfo(nameInput.value, jobInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editProfilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, profileSubmitButton, 'Сохранить');
    });
}

function handleEditProfileClick() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfilePopup);
}

function handleAddCardClick() {
  clearValidation(addCardForm, validationConfig);
  openModal(newCardPopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, addCardSubmitButton, 'Сохранить');

  addCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      renderCard(cardData, 'prepend');
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      closeModal(newCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, addCardSubmitButton, 'Сохранить');
    });
}

function handleAvatarClick() {
  editAvatarForm.reset();
  clearValidation(editAvatarForm, validationConfig);
  openModal(editAvatarPopup);
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, avatarSubmitButton, 'Сохранить');

  updateAvatar(avatarInput.value)
    .then((userData) => {
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      closeModal(editAvatarPopup);
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, avatarSubmitButton, 'Сохранить');
    });
}

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  setModalEventListeners(popup);
});

editProfileButton.addEventListener('click', handleEditProfileClick);
addCardButton.addEventListener('click', handleAddCardClick);
profileImage.addEventListener('click', handleAvatarClick);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);
editAvatarForm.addEventListener('submit', handleAvatarFormSubmit);
enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    cards.forEach((cardData) => {
      renderCard(cardData);
    });
  })
  .catch((err) => {
    console.log(err);
  });