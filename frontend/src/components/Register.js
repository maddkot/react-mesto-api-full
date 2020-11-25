import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register({onRegistration}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }
    
    const handleSubmitRegister = (event) => {
        event.preventDefault();
        onRegistration(email, password);
        setEmail('');
        setPassword('');
    }

    return (
    <form className="auth" onSubmit={handleSubmitRegister}>
        <h4 className="auth__title">Регистрация</h4>
        <input className="auth__email"
            required
            placeholder="Email"                
            type="email"
            name="email"
            value={email}
            onChange={handleChangeEmail}    
            />
        <input className="auth__password"
            required
            placeholder="Пароль"                
            type="password"
            minLength="5"
            maxLength="12"
            name="password"
            value={password}
            onChange={handleChangePassword}
            />
        <button className="auth__button-submit">Зарегистрироваться</button>
        <p className="auth__question">Уже зарегистрированы?
        &nbsp;<Link to="/sign-in" className="auth__link">Войти</Link>   
        </p>    
    </form> 
    )
}

export default withRouter(Register);