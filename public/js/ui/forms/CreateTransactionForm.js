/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(this.element, (err, response) => {
      if (response.success) {
        let accountList = document.getElementsById('.expense-accounts-list');
        response.forEach(item => {
          let option = document.createElement('option');
          option.outerHTML = `<option value="${this.element.id}">${this.element.name}</option>`;
          accountList.appendChild(option);
        })
      }
    })
   
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        data.reset();
        Modal.onClose(data);
        App.updata();
      }
    })
  }
}