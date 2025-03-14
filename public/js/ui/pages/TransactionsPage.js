/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element === null) {
      throw "пустой элемент";
    } else {
      this.element = element;
      this.registerEvents();
    }
  }


  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    let removeAccount = [... document.getElementsByClassName("remove-account")];
   // let removeTransaction = [... document.getElementsByClassName("transaction__remove"); // не возможно найти, т.к элемент не существует  
    removeAccount.forEach(item => item.addEventListener('click', () => {
      this.removeAccount();
     }) 
    )
   // this.removeTransaction.forEach(item => item.addEventListener('click', () => {
   //   this.removeTransaction(this.lastOptions);
   //  }) 
    //)
  } 

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions && confirm("Вы действительно хотите удалить счёт?")) {
      Account.remove(this.lastOptions, (err, response) => {
        if (response.success) {
          App.updateWidgets();
          App.updateForms();
        }
      })      
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
      Transaction.remove(id, (err, response) => {
        if (response.success) {
          App.update();
        }
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    this.lastOptions = options;
    Account.get(options.account_id, (err, response) => {
      if (response.success) {
        this.renderTitle(response.user.name);
      }
    })
    Transaction.list(options, (err, response) => {
      if (response.success) {
        this.renderTransactions(response);
      }
    })
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счета');
    this.lastOptions = '';
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    let contentTitle = [... document.getElementsByClassName('content-title')][0];
    contentTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    let dateFormat = new Date(data);
    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric'
    };
    return dateFormat.toLocaleString("ru", options);
    
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    let strHtml = 
     `<div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">Новый будильник</h4>
            <div class="transaction__date">${formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.user_id}">
            <i class="fa fa-trash"></i>  
          </button>
        </div>
      </div>`;
    return strHtml;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    let content = [... document.getElementsByClassName('content')][0];
    data.forEach(item => {
      let newElement = document.createElement('div');
      newElement.outerHTML = getTransactionHTML(item);
      content.appendChild(newElement);
    })
    this.removeTransaction = [... content.getElementsByClassName("transaction__remove")]; // не возможно найти, т.к элемент не существует  

  }
}