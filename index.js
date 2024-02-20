let todos = [];

const addTodo = (title, description, endDate) => {
    const priority = Math.floor(Math.random() * 3) + 1;
    const todo = { id: todos.length + 1, title, description, endDate, status: 'todo', priority: priority };
    todos.push(todo);
}

const newTitle = document.getElementById('todoTitle');
const newDescription = document.getElementById('todoDescription');
const newDate = document.getElementById('todoDate')
const todoButton = document.getElementById('todoButton');

const addList = () => {
    const title = newTitle.value;
    const description = newDescription.value;
    const endDate = newDate.value

    if (!title || !description || !endDate) {
        alert('Add tile, description and end date in todo')
        return
    }
    addTodo(title, description, endDate);
    newTitle.value = '';
    newDescription.value = '';
    newDate.value = ''
}

todoButton.addEventListener('click', addList);