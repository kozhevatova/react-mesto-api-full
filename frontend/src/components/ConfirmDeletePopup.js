import PopupWithForm from './PopupWithForm';

const ConfirmDeletePopup = ({isOpen, onClose, onCardDelete, isLoading, card, onClick}) => {
  const handleCardDelete = (e) => {
    e.preventDefault();
    onCardDelete(card);
  }
  return (
    <PopupWithForm name="delete-confirm" title="Вы уверены?" buttonTitle={isLoading ?
    "Удаление..." : "Да"} isOpen={isOpen} onClose={onClose} onSubmit={handleCardDelete} 
    onClick={onClick} />
  );
}

export default ConfirmDeletePopup;