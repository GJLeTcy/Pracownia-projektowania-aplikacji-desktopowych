"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addButton = document.querySelector("#tododdButton");
const inputTextField = document.querySelector("#todoInputField");
const todosContainer = document.querySelector("#todoContainer");
let arrayOfTodos = [];
if (addButton && inputTextField && todosContainer) {
    addButton?.addEventListener('click', (e) => {
        let textValue = inputTextField?.value;
        arrayOfTodos.push({ id: arrayOfTodos.length, title: inputTextField.value });
        inputTextField.value = '';
        buildlist();
    });
}
function buildlist() {
    todosContainer.innerHTML = "";
    arrayOfTodos.forEach(element => {
        let container = document.createElement("div");
        container.classList.add("card", "card-body");
        let title = document.createElement('h3');
        let id = document.createElement('p');
        title.textContent = "Tytuł: " + element.title;
        id.textContent = "ID: " + element.id;
        container.appendChild(title);
        container.appendChild(id);
        todosContainer?.appendChild(container);
    });
}
//# sourceMappingURL=main.js.map