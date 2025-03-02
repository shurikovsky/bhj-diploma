/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const pushMenu = [... document.getElementsByClassName('sidebar-toggle')][0];
    const bodyClassToggle = [... document.getElementsByClassName('skin-blue')][0];
    pushMenu.addEventListener('click', () => {
      bodyClassToggle.classList.toggle('sidebar-open');
      bodyClassToggle.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let registration = [... document.getElementsByClassName('menu-item_register')][0];
    let entrance = [... document.getElementsByClassName('menu-item_login')][0];
    let exit = [... document.getElementsByClassName('menu-item_logout')][0];
    
    registration.addEventListener('click', () => {
      App.getModal('register').open();
    })

    entrance.addEventListener('click', () => {
      App.getModal('login').open();
     })

     exit.addEventListener('click', () => {
       User.logout((err, response) => {
         if (response.success) {
           App.setState('init');
         } 
       })
     })
    
  }
}