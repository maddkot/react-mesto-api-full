import React from 'react';
import Card from './Card'
import {CurrentUserContext} from '../contexts/CurrentUserContext'


function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
    
const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main className="content">

            <section className="profile">
                <button className="profile__avatar-button popup_opened" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Изображение пользователя" />
                </button>
                <div className="profile__info">
                    <h1 className="profile__full-name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" aria-label="Edit" onClick={onEditProfile}>
                    </button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Add" onClick={onAddPlace}>
                </button>
            </section>

            <div className="elements">
                {cards.map((card) =>(
                    <Card
                    key={card._id}
                    card={card}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike} 
                    onCardDelete={onCardDelete}    
                    />
                )
                )}
            </div>
            
        </main>
    );
}

export default Main;