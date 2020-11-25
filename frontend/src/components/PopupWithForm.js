import React from 'react';

function PopupWidthForm({name, isOpen, isClose, method, nameForm, title, children, onSubmit,}) {
    return (
    <div 
      className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
        <div
          className="popup__container">
          <button
            className="popup__close-button"
            type="button"
            aria-label="Close"
            onClick={isClose}>
        </button>
          <form
            onSubmit={onSubmit}
            className="popup__form"
            action="#"
            method={`${method}`}
            name={`${nameForm}`}
            noValidate>
          <h3 className="popup__title">{title}</h3>
          {children}
        </form>
      </div>
    </div>
    )
}

export default PopupWidthForm;