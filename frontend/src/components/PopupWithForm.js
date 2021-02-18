import { useEffect, useRef } from "react";
import { validateForm } from '../utils/utils';

const PopupWithForm = (props) => {
  const formRef = useRef();

  useEffect(() => {
    validateForm(formRef.current).enableValidation();
  }, []);

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`} onClick={props.onClick}>
      <form className={`popup__form popup__form_type_${props.name}`} method="POST" name={props.name}
        onSubmit={props.onSubmit} ref={formRef} >
        <button className="popup__close-button" type="reset"
          aria-label="Закрыть форму." onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        {props.children}
        <button type="submit" className={`popup__save-button popup__button
          ${(!(props.name === 'delete-confirm') && props.isOpen) && 'popup__button_disabled'}`}
          disabled={!(props.name === 'delete-confirm') && props.isOpen}
        >{props.buttonTitle}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;