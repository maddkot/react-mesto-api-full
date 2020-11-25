import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  
  const currentUser = React.useContext(CurrentUserContext);
  
  //проверяем ид пользователя и ид пользователя, создавшего карточку
  const isOwn = card.owner === currentUser._id;
  // создаем константу, в которой првоеряется ид пользователя и отображает класс с корзинкой или его удаляет
  const cardDeleteButtonClassName =
    (`element__basket ${isOwn ? 'element__basket_visible' : 'element__basket_hidden'}`
    );
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  //const isLiked = card.likes.some(i => i._id === currentUser._id);
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__button-like ${isLiked ? 'element__button-like_on' : ''}`)
  
  

  function handleClick() {
    onCardClick(card);    
  }
  
  function handleLikeClick() {
    onCardLike(card)
  }

  function handleCardDelete() {
    onCardDelete(card)
  }

    return (
        <div className="element">
        <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick}/>
        <div className="element__group">
          <h4 className="element__text">{card.name}</h4>
          <div className="element__container-like">
            <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Like"></button>
            <span className="element__like-counter">{card.likes.length}</span>
          </div>        
        </div>
        <button className={cardDeleteButtonClassName} onClick={handleCardDelete} type="button" arial-label="basket"></button>
      </div> 
    )
}

export default Card