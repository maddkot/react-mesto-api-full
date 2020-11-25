import React from 'react';
import { Link, Route } from 'react-router-dom';

function Header({logout, userData}) {
    return (
    <header className="header">
      <div className="header__logo">
      </div>
      
        <Route path="/sign-up">
            <Link className="header__authorization" to="/sign-in">Войти</Link>
          </Route>
          
          <Route path="/sign-in">
            <Link className="header__authorization" to="/sign-up">Регистрация</Link>
          </Route>

          <Route exact path='/'>
            <div className="header__data-user">
            <h5 className="header__email">{ userData }</h5>
              <Link className="header__logout"  to='' onClick={logout}>Выйти</Link>
            </div>
          </Route>
        
    </header>
    );
}

export default Header;