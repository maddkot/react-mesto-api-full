import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWidthForm from './PopupWithForm';
import PopupImage from './PopupImage';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { apiData } from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as Auth from '../utils/Auth';

function App() {

  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false)  
  function handleEditProfileClick() {
    setEditProfile(true);
  }
  
  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false)
  function handleEditAvatarClick() {
    setEditAvatar(true);
  }

  const [isAddPlacePopupOpen, setAddCard] = React.useState(false)
  function handleAddPlaceClick() {
    setAddCard(true)
  }

  const [selectedCard, setSelectCardClick] = React.useState(null)
  function handleCardClick(card) {
    setSelectCardClick(card)
  }

  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);
  function handleInfoToolTip() {
    setInfoToolTipOpen(true);
  }

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [showMessage, setShowMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [userData, setUserEmail] = React.useState(null);  
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [token, setToken] = React.useState('')

  const history = useHistory();  

  const handleCheckedToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setToken(jwt)
      Auth.checkedToken(jwt)
        .then((res) => {
          if (res) {            
            setUserEmail(res.email);
            setLoggedIn(true);
            history.push('./')
          }
        })
        .catch((error) => {
          handleInfoToolTip();
          setShowMessage(false);
          if (error === 400) {
            console.log('Токен не передан или передан не в том формате');
            setErrorMessage('Токен не передан или передан не в том формате')
            history.push('./sign-in')
          } else if (error === 401) {
            console.log('Переданный токен некорректен');
            setErrorMessage('Переданный токен некорректен')
            history.push('./sign-in')
          }
      })
    }
  }
  
   React.useEffect(() => {
    if (loggedIn) {
      Promise.all([apiData.getUserInfo(token), apiData.getInitialCards(token)])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData)
        setCards(initialCards)
      })
      .catch((error) => {
        console.log(error);
      })
    }
    
  }, [loggedIn, token]); 
  
   /* https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook */
   React.useEffect(() => {    
    handleCheckedToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps    
   }, [])  

  function closeAllPopups() {    
    setEditProfile(false);
    setEditAvatar(false);
    setAddCard(false);
    handleCardClick(null);
    setInfoToolTipOpen(false);    
  }

  function closeEscapePopup(event) {
    if (event.key === 'Escape') {
      closeAllPopups()
    }
  }

  function closeOverlayPopup(event) {
    if (event.target.classList.contains('popup')) {
      closeAllPopups()
    }
  }

  //тренажер.тема useEffect c mousemove
  React.useEffect(() => {
    document.addEventListener('keydown', closeEscapePopup);
    document.addEventListener('click', closeOverlayPopup);
    return () => {
      document.removeEventListener('keydown', closeEscapePopup);
      document.removeEventListener('click', closeOverlayPopup);
    }

  })     

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (!isLiked) {
      apiData.setLike(card._id, token)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
      });
    } else {
      apiData.deleteLike(card._id, token)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
      })
    }
  }

  
  function handleCardDelete(card) {
      apiData.deleteCard(card._id, token)
        .then(() => {
          const newCards = cards.filter((c) => c._id !== card._id );          
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
      })
  }

  function handleUpdateUser(items) {
      apiData.setUserInfo(items, token)
        .then((res) => {
          setCurrentUser(res)
          closeAllPopups()
        })
        .catch((error) => {
          console.log(error);
      })
    }
    
  
  function handleUpdateAvatar(item) {
      apiData.changeAvatar(item, token)
        .then((res) => {
          setCurrentUser(res)
          closeAllPopups()
        })
        .catch((error) => {
          console.log(error);
      })  
  }

  function handleAddPlaceSubmit(item) {
      apiData.addNewCard(item, token)
        .then((res) => {
          console.log(res.card);          
          setCards([res.card, ...cards])          
          closeAllPopups()
        })
        .catch((error) => {
          console.log(error);
      })  
  }

  function handleRegistration(email, password) {
    Auth.registration(email, password)
      .then((res) => {        
          handleInfoToolTip();
          setShowMessage(true);
          history.push('./sign-in');       
      })
      .catch((error) => {
        handleInfoToolTip();
        setShowMessage(false);        
        if (error === 400) {
          console.log('Некорректно заполнено одно из полей');
          setErrorMessage('Некорректно заполнено одно из полей');
        } else if (error === 409) {
          console.log('Данный email уже зарегистрирован');
          setErrorMessage('Данный email уже зарегистрирован');
        }
      })
  }

  function handleSubmitLogin(email, password) {
    Auth.login(email, password)
    .then((data) => {
      if (data.token) {          
        localStorage.setItem('jwt', data.token)
        return data;
      } 
    })  
      .then((data) => {        
        if (data.token) {
          setToken(data.token);
          setUserEmail(email);
          setLoggedIn(true);          
          history.push('./');
          
      }
      })
      .catch((error) => {
        handleInfoToolTip();
        setShowMessage(false);
        if (error === 400) {
          console.log('Не передано одно из полей');
          setErrorMessage('Не передано одно из полей');
        } else if (error === 401) {
          console.log('Пользователь с таким логином и паролем не найден');
          setErrorMessage('Пользователь с таким логином и паролем не найден');
        }
      })    
  }
   
  function logout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('./sign-up');    
  } 

 

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">       
    
      <Header
        logout={logout}
        userData={userData}  
      />

      <Switch>
          
      <Route path='/sign-up'>
            <Register onRegistration={handleRegistration } />
      </Route>
          
      <Route path='/sign-in'>
            <Login onLogin={handleSubmitLogin} />
      </Route>

      <ProtectedRoute
        path="/"
        loggedIn={loggedIn}
        component={Main}
        cards={cards}    
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}  
      />
      
      <Route exact path="/">
        {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
      </Route>    
      </Switch>
          
      <Footer />
    
      

    <section className="popups">  

    <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          >  
    </EditProfilePopup>
          
    <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}>   
    </EditAvatarPopup>      
          
    <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isClose={closeAllPopups}
          addNewCard={handleAddPlaceSubmit}  
          >
            
    </AddPlacePopup>

    <PopupWidthForm
          name='delete-card'
          title='Вы уверены?'
          nameForm='popup__form_delete-card'
          method='POST'
          isClose ={closeAllPopups}
          children={
            <>
              <button className="popup__button-delete" type="submit">Да</button>
            </>
          }
    />

    
        
    <PopupImage
        card={selectedCard}
        onClose={closeAllPopups}  
    />
          
    <InfoTooltip
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}
        showMessage={showMessage}
        errorMessage={errorMessage}
    />
        
    </section>

  </div>
  </CurrentUserContext.Provider>
      
  );
}

export default App;
