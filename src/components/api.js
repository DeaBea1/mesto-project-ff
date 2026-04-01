const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/higher-front-back-dev',
  headers: {
    authorization: '5b2916f5-f29f-4eea-887d-bbc070f90f3a',
    'Content-Type': 'application/json'
  }
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

function getUserInfo() {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  }).then(checkResponse);
}

function getInitialCards() {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  }).then(checkResponse);
}

function updateUserInfo(name, about) {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name,
      about
    })
  }).then(checkResponse);
}

function addCard(name, link) {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name,
      link
    })
  }).then(checkResponse);
}

function deleteCard(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  }).then(checkResponse);
}

function addLike(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers
  }).then(checkResponse);
}

function deleteLike(cardId) {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  }).then(checkResponse);
}

function updateAvatar(avatar) {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({ avatar })
  }).then(checkResponse);
}

export {
  addCard, addLike, deleteCard, deleteLike, getInitialCards, getUserInfo, updateAvatar, updateUserInfo
}

