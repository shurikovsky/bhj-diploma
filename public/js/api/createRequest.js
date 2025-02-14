/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {
        url: 'https://example.com', // адрес
        data: { // произвольные данные, могут отсутствовать
          email: 'ivan@poselok.ru',
          password: 'odinodin'
        },
        method: 'GET', // метод запроса
        callback: (err, response) => {
            if (!err) {
                return response;
            }
            return err;
          console.log( 'Ошибка, если есть', err );
          console.log( 'Данные, если нет ошибки', response );
        }
      }) => {
        const xhr = new XMLHttpRequest;
        xhr.responseType = 'json';
        if (options.method === 'GET') {
            try {
              xhr.open('GET', options.url + '?mail=' + options.email + '&password=' + options.password);
              xhr.send();
            } catch (err) {
                return err
            }
        } else {
            let formData = new FormData();
            formData.append('mail', options.email);
            formData.append('password', options.password);
            try {
              xhr.open('POST', options.url);
              xhr.send(formData);    
            } catch (err) {
                return err
            } 
        }
        xhr.addEventListener('load', callback(null, xhr.response));
      }
 
