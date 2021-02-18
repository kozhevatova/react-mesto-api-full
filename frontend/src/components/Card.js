import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
    const currentUser = useContext(CurrentUserContext);

    //определение является ли текущий пользователь владельцем карточки
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ?
            'element__delete-button_visible' :
            'element__delete-button_hidden'}`
    );

    //определение есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked ?
            'element__like_active' :
            'element__like_inactive'}`
    );

    const handleClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    return (
        <li className="element">
            <img alt={card.name} className="element__image" src={card.link} onClick={handleClick} />
            <div className="element__title">
                <h2 className="element__place-name">{card.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк."
                        onClick={handleLikeClick}></button>
                    <p className="element__like-num">{card.likes.length}</p>
                </div>
            </div>

            <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить фото."
                onClick={handleDeleteClick}></button>
        </li>
    );
}

export default Card;