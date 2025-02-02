class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getInitialCards(jwt) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._getResponseData(res));
  }

  getUserInfo(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => this._getResponseData(res));
  }

  setUserInfo(newName, newInfo, jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: newName,
        about: newInfo
      })
    })
      .then((res) => this._getResponseData(res));
  }

  addNewCard(name, link, jwt) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => this._getResponseData(res));
  }

  _addLike(cardId, jwt) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
    })
      .then((res) => this._getResponseData(res));
  }

  _deleteLike(cardId, jwt) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
      .then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked, jwt) {
    return isLiked ? this._addLike(cardId,jwt) : this._deleteLike(cardId,jwt);
  }

  deleteCard(cardId, jwt) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
      .then((res) => this._getResponseData(res));
  }

  editAvatar(avatar, jwt) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  baseUrl: 'https://api.annakin.students.nomoreparties.space',
});

export default api;