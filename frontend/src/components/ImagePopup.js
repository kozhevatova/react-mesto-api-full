const ImagePopup = ({ card, onClose, onClick }) => {
  return (
    <div className={`popup popup_type_zoomed-image ${(card && 'popup_opened')}`} onClick={onClick}>
      <div className="popup__form popup__form_type_zoomed-image">
        <img src={card ? card.link : ''} alt={card ? card.name : ''} className="popup__image" />
        <p className="popup__name popup__name_place_zoomed-image">{card ? card.name : ''}</p>
        <button className="popup__close-button" type="reset" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;