/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (response.success) {
        const form = document.getElementById('login-form');
        form.reset();
        App.setState('user-logged');
        let modal = new Modal(form);
        modal.onClose('form');
      }
    })
  }
}