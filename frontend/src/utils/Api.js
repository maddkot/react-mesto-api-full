
 class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;        
    }
    
    //promisAll
     getServerDatas() {
         return Promise.all([this.getInitialCards(), this.getUserInfo()])
         
    } 
     
    //метод вызова карточек с сервера
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
            method: "GET"
        })
            .then(res => {
                console.log(`1`, res)
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(`Ошибка: ${res.status}`));
                }});           
    }

    //метод отправки карточки на сервер
    addNewCard(item) {
        return fetch(`${this.baseUrl}/cards`,
            {
                method: 'POST',
                headers: this.headers,
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
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });           
    }

    //метод удаления карточки
    deleteCard(id) { 
        return fetch(`${this.baseUrl}/cards/${id}`,
        {
            method: "DELETE",
            headers: this.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });
    }


    //метод отправки лайка карточек
    setLike(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`,
            {
                method: "PUT",
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            });
    }

    //метод удаления лайка карточек
    deleteLike(id) {
        return fetch(`${this.baseUrl}/cards/likes/${id}`,
            {
                method: "DELETE",
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            });
    }


    //метод получения данных о профиле
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: this.headers            
        })
            .then(res => {
                console.log(`2`, res)
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(`Ошибка: ${res.status}`));
                }})
    }

    //метод изменение аватарки
    changeAvatar(avatarItem) {
        //console.log(avatarItem);
        return fetch(`${this.baseUrl}/users/me/avatar`,
            {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify({
                    avatar: avatarItem.avatar
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            });
    }

    //метод отправки данных профиля
    setUserInfo(item) {
        return fetch(`${this.baseUrl}/users/me`,
            {
                method: "PATCH",
                headers: this.headers,
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
                        }
                        return Promise.reject(new Error(`Ошибка: ${res.status}`));
            })
    }


}

export const apiData = new Api({
    //baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14", 
    baseUrl:'http://localhost:3000',
    headers: {
        'Authorization': localStorage.getItem('jwt'),
        'Content-Type': 'application/json'
    },
  });