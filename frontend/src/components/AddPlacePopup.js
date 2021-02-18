import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { popupName, popupDescription } from '../utils/constants';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading, onClick }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    //очистка полей ввода при открытии попапа
    if (isOpen) {
      setName('');
      setLink('');
    }

  }, [isOpen]);

  //запись в стейт текущие значения инпутов при вводе
  const handleInputChange = (e) => {
    switch (e.target.name) {
      case popupName: setName(e.target.value);
        break;
      case popupDescription: setLink(e.target.value);
        break;
      default:
        console.log(`Нет такого инпута: ${e.target.name}`);
        break;
    }
  }

  const handleAddPlaceSubmit = (e) => {
    e.preventDefault();

    //отправка данных в API
    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm name="add-form" title="Новое место" buttonTitle={isLoading ?
      "Создание..." : "Создать"} isOpen={isOpen} onClose={onClose} onSubmit={handleAddPlaceSubmit}
      onClick={onClick} >
      <input type="text" className="popup__input popup__name" name="popupName"
        placeholder="Название" required id="title-input" minLength="2" maxLength="30"
        value={name} onChange={handleInputChange} />
      <span className="popup__input-error" id="title-input-error"></span>
      <input type="url" className="popup__input popup__description" name="popupDescription"
        placeholder="Ссылка на картинку" required id="url-input" value={link}
        onChange={handleInputChange} />
      <span className="popup__input-error" id="url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;