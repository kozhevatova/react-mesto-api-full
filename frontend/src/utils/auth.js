export const BASE_URL = "http://api.annakin.students.nomoreparties.space";

export const register = (email, password) => {
  console.log('register front', email);
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    })
  })
    .then((res) => res.json())
    .then((res) => res);
}

export const authorize = (email, password) => {
  console.log('auth front', email);
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('auth front data', data);
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    });
}

export const checkToken = (token) => {
  console.log('check token front', token)
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