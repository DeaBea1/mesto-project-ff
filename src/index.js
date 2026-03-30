import { initialCards } from './cards.js'
import './styles/index.css'

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const headerLogo = document.querySelector('.header__logo');
const profileImage = document.querySelector('.profile__image');
const popups = Array.from(document.querySelectorAll('.popup'));
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__close');
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const logoUrl = new URL('./images/logo.svg', import.meta.url);
const avatarUrl = new URL('./images/avatar.jpg', import.meta.url);

headerLogo.src = logoUrl.href;
profileImage.style.backgroundImage = `url('${avatarUrl.href}')`;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

function handleEscClose(evt) {
    if (evt.key !== 'Escape') {
        return;
    }

    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
        closeModal(openedPopup);
    }
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
}

// @todo: Функция создания карточки
function createCard(cardData, deleteCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });
    
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
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

popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) {
            closeModal(popup);
        }
    });
});

closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        const popup = closeButton.closest('.popup');
        closeModal(popup);
    });
});

editProfileButton.addEventListener('click', handleEditProfileClick);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    placesList.append(createCard(cardData, deleteCard));
});