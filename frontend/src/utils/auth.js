export const BASE_URL = "https://api.annakin.students.nomoreparties.space";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
     email, password
    })
  })
    .then((res) => {
      try {
        if(res.status === 200) {
          return res.json();
        }
      } catch(err) {
        return err;
      }
    })
    .then((res) => {
      return res;
    });
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    });
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`,{
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then((res) => res.json())
  .then((data) => data);
}