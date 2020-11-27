
 class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        //this.headers = headers;        
    }
         
    //метод вызова карточек с сервера
    getInitialCards(token) {
        return fetch(`${this.baseUrl}/cards`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(`Ошибка: ${res.status}`));
                }
                
            });           
    }

    //метод отправки карточки на сервер
    addNewCard(item, token) {
        return fetch(`${this.baseUrl}/cards`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        /* name: item.title,
                        link: item.url */
                        name: item.name,
                        link: item.link
                    })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            }            
        });           
    }

    //метод удаления карточки
    deleteCard(id, token) { 
        return fetch(`${this.baseUrl}/cards/${id}`,
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else { 
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            }            
        });
    }


    //метод отправки лайка карточек
    setLike(id, token) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`,
            {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(`Ошибка: ${res.status}`));
                }                
            });
    }

    //метод удаления лайка карточек
    deleteLike(id, token) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`,
            {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            });
    }


    //метод получения данных о профиле
    getUserInfo(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {                
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(`Ошибка: ${res.status}`));
                }})
    }

    //метод изменение аватарки
    changeAvatar(avatarItem, token) {
        
        return fetch(`${this.baseUrl}/users/me/avatar`,
            {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: avatarItem.avatar
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else { 
                    return Promise.reject(new Error(`Ошибка: ${res.status}`));
                }                
            });
    }

    //метод отправки данных профиля
    setUserInfo(item, token) {
        return fetch(`${this.baseUrl}/users/me`,
            {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    /* name: item.fullName,
                    about: item.description */
                    name: item.name,
                    about: item.about
                })
            })
            .then(res => {                    
                    if (res.ok) {
                        return res.json();
                    } else { 
                        return Promise.reject(new Error(`Ошибка: ${res.status}`));
                    }                    
            })
    }


}

export const apiData = new Api({
    //baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14", 
    baseUrl:'https://api.mestomaddkot.students.nomoreparties.space',    
  });