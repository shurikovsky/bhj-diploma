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
    return localStorage.user;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    userFetch = createRequest(this.url + '/current', this.current(), 'GET', callback);
    if (userFetch.succeess) {
      this.setCurrent(userFetch);
    } else {
      this.unsetCurrent();
    }
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
    userRegister = createRequest(this.url + '/register', data, 'POST', callback);
    if (userRegister.succeess) {
      this.setCurrent(userRegister);
    }
  }


  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    userLogout = createRequest(this.url + '/logout', data, 'POST', callback);
    if (userRegister.succeess) {
      this.unsetCurrent();
    }
  }
}
