/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static url = '/user';
  static setCurrent(user) {
    localStorage.user = user;
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user){
      return localStorage.user;
    } 
    return undefined;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
      createRequest({
        url: this.url + "/current", 
        data: this.current(), 
        method: 'GET', 
        callback: (err, response) => {
          if (response.success) {
            this.setCurrent(response.user);
          } else {
            this.unsetCurrent();
          }
          callback(err, response);
        }
      })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.url + '/login',
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: this.url + "/register", 
      data: data, 
      method: 'POST', 
      callback: (err, response) => {
        if (response.success) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    })  
  }


  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.url + "/logout", 
      data: this.current(), 
      method: 'POST', 
      callback: (err, response) => {
        if (response.success) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    })
  }
  
}
