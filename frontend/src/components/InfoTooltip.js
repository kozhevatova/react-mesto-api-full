import check from '../images/check.svg';
import wrong from '../images/wrong.svg';

const InfoTooltip = ({ isOpen, isValid, onClose }) => {
  return (
    <div className={`popup popup_type_info ${isOpen && 'popup_opened'}`}>
      <div className="popup__form popup__form_type_info">
        <button className="popup__close-button popup__close-button_type_info" type="reset"
          aria-label="Закрыть форму." onClick={onClose}></button>
        <img className="popup__status-image" src={isValid ? check : wrong} alt="Статус регистрации." />
        <p className="popup__text">{isValid ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;