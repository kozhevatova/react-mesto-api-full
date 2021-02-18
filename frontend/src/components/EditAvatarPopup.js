import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar, isLoading, onClick}) => {
  const inputRef = useRef();

  //очистка поля ввода при открытии попапа
  useEffect(() => {
    if(isOpen) {
      inputRef.current.value = '';
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //отправка данных в API
    onUpdateAvatar({
      avatar: inputRef.current.value
    })
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonTitle={isLoading ? 
      "Сохранение..." : "Сохранить"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} 
      onClick={onClick} >
      <input type="url" className="popup__input popup__description" name="avatarUrl"
        placeholder="Ссылка на аватар" required id="avatar-input" ref={inputRef}/>
      <span className="popup__input-error" id="avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;