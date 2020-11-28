//export const base_url = 'http://localhost:3000';
export const base_url = 'https://api.mestomaddkot.students.nomoreparties.space';

export const registration = (email, password) =>{
    return fetch(`${base_url}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(res.status);
        })       
}

export const login = (email, password) =>{
    return fetch(`${base_url}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(res.status);
        })
          
        
}

export const checkedToken =(token) =>{
    return fetch(`${base_url}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(res.status); 
        })        
}

