class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    }).then((res) => this._getResponseData(res));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then((res) => this._getResponseData(res));
  }

  setUserInfo(newName, newInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: newName,
        about: newInfo
      })
    })
      .then((res) => this._getResponseData(res));
  }

  addNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => this._getResponseData(res));
  }

  _addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      headers: this.headers,
      method: 'PUT',
    })
      .then((res) => this._getResponseData(res));
  }

  _deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      headers: this.headers,
      method: 'DELETE',
    })
      .then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this._addLike(cardId) : this._deleteLike(cardId);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      headers: this.headers,
      method: 'DELETE',
    })
      .then((res) => this._getResponseData(res));
  }

  editAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: 'b1b736c3-ab37-40d8-99c3-eedcbb719e9d',
    'Content-Type': 'application/json'
  }
});

export default api;