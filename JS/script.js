const form = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filter = document.getElementById("filter");
const errorMessage = document.getElementById("error-message");

let todos = [];

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const task = todoInput.value.trim();
    const date = dateInput.value;

    // Validation
    if (task === "" || date === "") {
        errorMessage.textContent = "Please enter task and date.";
        return;
    }

    errorMessage.textContent = "";

    const todo = {
        id: Date.now(),
        task,
        date
    };

    todos.push(todo);
    renderTodos();

    form.reset();
});

function renderTodos() {
    todoList.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    let filteredTodos = todos;

    if (filter.value === "today") {
        filteredTodos = todos.filter(todo => todo.date === today);
    } else if (filter.value === "upcoming") {
        filteredTodos = todos.filter(todo => todo.date > today);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.classList.add("todo-item");

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("todo-info");

        const taskText = document.createElement("span");
        taskText.textContent = todo.task;

        const dateText = document.createElement("span");
        dateText.textContent = todo.date;
        dateText.classList.add("todo-date");

        infoDiv.appendChild(taskText);
        infoDiv.appendChild(dateText);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            todos = todos.filter(t => t.id !== todo.id);
            renderTodos();
        });

        li.appendChild(infoDiv);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

filter.addEventListener("change", renderTodos);