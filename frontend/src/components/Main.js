import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import Spinner from './Spinner';

const Main = ({ cards, onEditProfile, onAddPlace, onEditAvatar,
  onCardClick, onCardLike, onCardDelete, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ background: `center/cover url(${currentUser.avatar}) no-repeat` }}>
          <button className="profile__edit-avatar-button"
            onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button"
              aria-label="Редактировать профиль." onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button"
          aria-label="Добавить фотографию." onClick={onAddPlace}></button>
      </section>

      <div>
        <ul className="elements">
          {isLoading && <Spinner />}
          {
            cards.map((card) => {
              return (
                <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike}
                  onCardDelete={onCardDelete} />
              );
            })
          }
        </ul>
      </div>
    </main>
  );
}

export default Main;