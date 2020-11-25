import React from 'react';
import PopupWidthForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({isOpen, isClose, onUpdateUser}) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);
    

    function handleName(event) {
        setName(event.target.value) 
    }

    function handleDescription(event) {
        setDescription(event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description
        });
    }

    return (
        <PopupWidthForm 
        name='edit-profile'
        title='Редактировать профиль'
        nameForm='popup__form_edit-profile'
        method="GET"
        isOpen={isOpen}
        isClose={isClose}
        onSubmit={handleSubmit}    
        >
        
        <div className="popup__inputs">
            <input
                value={name || '' }
                onChange={handleName}    
                id="full-name-input"
                className="popup__input popup__input_full-name"
                type="text"            
                name="fullName"
                required
                placeholder="Введите имя"
                minLength="2"
                maxLength="40"            
                autoComplete="off"
                pattern="[А-Яа-я ёЁ A-Za-z -]{1,}" />
            <span
                id="full-name-input-error"
                 className="popup__input-error"></span>
            <input
                value={description  || ''}
                onChange={handleDescription}    
                id="descriptions-input"
                className="popup__input popup__input_description"
                type="text"            
                name="description"
                required
                placeholder="Введите профессию"
                minLength="2"
                maxLength="200"            
                autoComplete="off" />
            <span
                id="descriptions-input-error"
                className="popup__input-error"></span>
        </div>
            <button
                className="popup__button-save popup__button-save_profile"
                type="submit"
                aria-label="Save">Сохранить</button>
        
  </PopupWidthForm>  

    )
}

export default EditProfilePopup;