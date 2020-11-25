import React from 'react';
import { withRouter } from 'react-router-dom';

function Login({ onLogin }) {
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        if (!email || !password) {
            console.log('Ошибка. Нет данных!')
            return;
        } else {
            onLogin(email, password);
            setEmail('');
            setPassword('');
        }
    }


    return (        
        
        <form className="auth" onSubmit={handleSubmitLogin}>
            <h4 className="auth__title">Вход</h4>
            <input className="auth__email"
                required
                placeholder="Email"                
                type="email"
                name="email"
                onChange={handleChangeEmail}
                value={email}
            />
            <input className="auth__password"
                required                
                placeholder="Пароль"                
                type="password"
                minLength="5"
                maxLength="12"
                name="password"
                onChange={handleChangePassword}
                value={password}
            />
            <button className="auth__button-submit">Войти</button>    
        </form>        
        
        
    )
}

export default withRouter(Login);