import React from 'react';
import Accept from '../images/Accept.svg';
import Decline from '../images/decline.svg'

function InfoTooltip({ onClose, isOpen, showMessage, errorMessage }) {
    return (
        <div className={`popup popup_info ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__close-button popup__close-button_center"
                    type="button"
                    aria-label="Close"
                    onClick={onClose}></button>
                <div className="popup__form">
                    {showMessage ?
                        <>
                          <img className="popup__icon" alt="Decline" src={Accept}></img>
                          <p className="popup__title popup__title_info">Вы успешно зарегистрировались!</p>  
                        </>
                    
                     :
                        <>
                          <img className="popup__icon" alt="Decline" src={Decline}></img>
                          <p className="popup__title popup__title_info">{errorMessage}</p>
                        </>    
                    }
                    
                </div>
            </div>
       </div> 
    )
}

export default InfoTooltip;