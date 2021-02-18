class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._errorSelector = data.errorSelector;
    this._formElement = formElement;
    this._button = formElement.querySelector(data.submitButtonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
  }

  // отображение ошибки ввода
  _showInputError(input, errorMessage) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = errorMessage; 
    error.classList.add(this._errorClass);
  }

  // удаление ошибки ввода
  _hideInputError(input) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.textContent = '';
    error.classList.remove(this._errorClass);
  }

  // проверка валидности ввода
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  // сделать кнопку активной
  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute('disabled');
  }

  // сделать кнопку неактивной
  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute('disabled', 'true');
  }

  // проверка наличия хотя бы одного неверного ввода
  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  // изменение активности submit кнопки
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  // удаление ошибки ввода при закрытии формы
  _handleReset() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _setEventListenersForReset() {
    this._formElement.addEventListener('reset', () => {
      this._handleReset();
    });
  }

  // настройка валидации
  enableValidation() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });

    this._setEventListenersForReset();
  }
}

export default FormValidator;
