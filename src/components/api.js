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

export { getUserInfo, getInitialCards };
