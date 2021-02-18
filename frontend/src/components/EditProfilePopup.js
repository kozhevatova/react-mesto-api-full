import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { popupName, popupDescription } from '../utils/constants';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading, onClick }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  //присвоение полям попапа значений и при открытии попапа, и при изменении данных пользователя
  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  //запись в стейт текущие значения инпутов при вводе
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case popupName: setName(e.target.value);
        break;
      case popupDescription: setDescription(e.target.value);
        break;
      default: 
        console.log(`Нет такого инпута: ${e.target.name}`);
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //отправка данных в API 
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm name="edit-form" title="Редактировать профиль" buttonTitle={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} onClick={onClick}>
      <input type="text" className="popup__input popup__name" name="popupName"
        placeholder="Имя" required id="name-input" minLength="2" maxLength="40"
        onChange={handleInputChange} value={name} />
      <span className="popup__input-error" id="name-input-error"></span>
      <input type="text" className="popup__input popup__description" name="popupDescription"
        placeholder="О себе" required id="description-input" minLength="2" maxLength="200"
        onChange={handleInputChange} value={description} />
      <span className="popup__input-error" id="description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;