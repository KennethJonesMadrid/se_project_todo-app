import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  formSubmitHandler: (inputValues) => {
    const id = uuidv4();
    const values = { ...inputValues, id };

    const todo = new Todo(
      values,
      "#todo-template",
      handleCheck,
      (wasCompleted) => {
        todoCounter.updateTotal(false);
        if (wasCompleted) {
          todoCounter.updateCompleted(false);
        }
      }
    );

    const todoElement = todo.getView();

    if (todoElement) {
      section.addItem(todoElement);
      todoCounter.updateTotal(true);
    }

    newTodoValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(
      item,
      "#todo-template",
      handleCheck,
      (wasCompleted) => {
        todoCounter.updateTotal(false);
        if (wasCompleted) {
          todoCounter.updateCompleted(false);
        }
      }
    );

    const todoElement = todo.getView();

    if (todoElement) {
      section.addItem(todoElement);
    }
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
