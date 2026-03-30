import { initialCards } from './cards.js'
import './styles/index.css'

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const headerLogo = document.querySelector('.header__logo');
const profileImage = document.querySelector('.profile__image');
const logoUrl = new URL('./images/logo.svg', import.meta.url);
const avatarUrl = new URL('./images/avatar.jpg', import.meta.url);

headerLogo.src = logoUrl.href;
profileImage.style.backgroundImage = `url('${avatarUrl.href}')`;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

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

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    placesList.append(createCard(cardData, deleteCard));
});