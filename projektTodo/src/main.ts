const addButton: HTMLButtonElement | null = document.querySelector("#todoAddButton");
const inputTextField: HTMLInputElement | null = document.querySelector("#todoInputField");
const todosContainer: HTMLDivElement = document.querySelector("#todoContainer")!;
const categorySelect: HTMLSelectElement | null = document.querySelector("#todoCategory");

type Todo = {
    id: number;
    title: string;
    description?: string;
    isDone?: boolean;
    category?: string;
};

let arrayOfTodos: Todo[] = [];
const savedData = localStorage.getItem("elektro_bud_products");

if (savedData !== null) {
    try {
        arrayOfTodos = JSON.parse(savedData);
    } catch (error) {
        console.error("Błąd parsowania danych z localStorage:", error);
        arrayOfTodos = [];
    }
}

// Wywołujemy funkcję przy starcie, żeby wczytać dane z localStorage
buildlist();

if (addButton && inputTextField && todosContainer && categorySelect) {
    addButton.addEventListener('click', (e) => {
        let textValue: string = inputTextField.value.trim();
        let selectedCategory: string = categorySelect.value;
        
        if (textValue === "") return;

        const newTodo: Todo = {
            id: arrayOfTodos.length > 0 ? arrayOfTodos[arrayOfTodos.length - 1].id + 1 : 1,
            title: textValue,
            category: selectedCategory
        };

        arrayOfTodos.push(newTodo);
        saveToLocalStorage(); // Zapis do localStorage
        
        inputTextField.value = '';
        buildlist(); // Poprawiona nazwa funkcji (mała litera)
    });
}

function saveToLocalStorage(): void {
    localStorage.setItem("elektro_bud_products", JSON.stringify(arrayOfTodos));
}

function buildlist() {
    todosContainer.innerHTML = "";
    arrayOfTodos.forEach((element, index) => {

        let container = document.createElement("div");
        container.classList.add("card", "card-body", "shadow", "mb-2");

        let title = document.createElement('h3');
        title.classList.add("h3");
        title.textContent = "Tytuł: " + element.title;

        let id = document.createElement('p');
        id.classList.add("small");
        id.textContent = "ID: " + element.id;

        let button = document.createElement('button');
        button.classList.add("button", "bg-danger", "rounded", "text-white", "btn", "btn-sm");
        button.textContent = "Usuń";
        
        // Obsługa usuwania elementu z tablicy + zapis do localStorage
        button.addEventListener('click', () => {
            arrayOfTodos.splice(index, 1);
            saveToLocalStorage(); // <--- DODANE: zapis po usunięciu!
            buildlist();
        });

        let select = document.createElement('select');
        select.classList.add("select", "rounded", "mb-2");

        let option1 = document.createElement('option');
        option1.value = "1";
        option1.textContent = "Do zrobienia";

        let option2 = document.createElement('option');
        option2.value = "2";
        option2.textContent = "W trakcie";

        let option3 = document.createElement('option');
        option3.value = "3";
        option3.textContent = "Zrobione";

        select.addEventListener('change', (e) => {
            // logika zmiany statusu
        });

        container.appendChild(title);
        container.appendChild(id);
        container.appendChild(button);
        
        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);
        container.appendChild(select);

        todosContainer?.appendChild(container);
    });
}