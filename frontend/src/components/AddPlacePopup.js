import React from 'react';
import PopupWidthForm from './PopupWithForm';

function AddPlacePopup({ isOpen, isClose, addNewCard }) {
    
    const [titleCard, setTitle] = React.useState('');
    const [linkCard, setLinkCard] = React.useState('');

    function handleSubmitCard(e) {
        e.preventDefault();
        addNewCard({
            name: titleCard,
            link: linkCard
        })
        console.log(titleCard, linkCard)
    }

    function handleTitleCard (event) {
        setTitle(event.target.value)
    }

    function handleLinkCard(event) {
        setLinkCard(event.target.value)    
    }

    React.useEffect(() => {
        setTitle('')
        setLinkCard('')
    }, [isOpen])
    

    return (
        <PopupWidthForm
          name='add-form'
          title='Новое место'
          nameForm='popup__form_add-newCard'
          method='GET'
          isOpen={isOpen}
          isClose={isClose}
          onSubmit={handleSubmitCard}  
        > 
            
            <div
                className="popup__inputs">
                <input
                    value={titleCard || ''}
                    onChange={handleTitleCard}
                    id="card-title-input"
                    className="popup__input popup__input_title"
                    type="text"
                    name="title"              
                    required
                    placeholder="Название"
                    minLength="1"
                    maxLength="30"
                    autoComplete="off"
                />
                <span
                    id="card-title-input-error"
                    className="popup__input-error">                    
                </span>
                <input
                    value={linkCard || ''}
                    onChange={handleLinkCard}
                    id="url-input"
                    className="popup__input popup__input_url"
                    type="url" name="url" required
                    placeholder="Cсылка на картинку (url)"
                    autoComplete="off"
                />
                <span
                    id="url-input-error"
                    className="popup__input-error">
                    
                </span>
          </div>
            <button
                className="popup__button-save popup__button-save_form_add"
                type="submit"
                aria-label="Save">
                Создать
            </button>         
          
          </PopupWidthForm>
    )
}

export default AddPlacePopup