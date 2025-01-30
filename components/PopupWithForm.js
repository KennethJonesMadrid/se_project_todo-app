import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitHandler }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._formSubmitHandler = formSubmitHandler;
  }

  _getInputValues() {
    const inputList = this._popupForm.querySelectorAll("input");
    const inputValues = {};

    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._formSubmitHandler(inputValues);
      this.close();
    });
  }
}
