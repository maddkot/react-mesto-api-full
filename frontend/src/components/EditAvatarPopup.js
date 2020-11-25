import React from 'react';
import PopupWidthForm from './PopupWithForm'


function EditAvatarPopup({isOpen, isClose, onUpdateAvatar}) {

    const editAvatar = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();      
        onUpdateAvatar({
          avatar: editAvatar.current.value,
        });
        
    }
    
    React.useEffect(() => {
        editAvatar.current.value = ''
    })

    return (
        <PopupWidthForm
            name='avatar'
            title='Обновить аватар'
            nameForm='popup__form_avatar'
            method='GET'
            isOpen={isOpen}
            isClose={isClose}
            onSubmit={handleSubmit}
          >
            <div
                className="popup__inputs">
                    <input
                        ref={editAvatar}
                        id="avatar-input"
                        className="popup__input popup__input_url"
                        type="url" name="url"
                        required
                        placeholder="https://..."
                        autoComplete="off"
                    />
                    <span
                        id="avatar-input-error"
                        className="popup__input-error">
                        
                    </span>
          </div>
                <button
                    className="popup__button-save popup__button-save_profile"
                    type="submit"
                    aria-label="Save">
                    Сохранить
                </button>                
      </PopupWidthForm>  
    )
}

export default EditAvatarPopup