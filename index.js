let todos = [
    {
        "id": 1,
        "title": "first title",
        "description": "first description",
        "endDate": "2024-02-23",
        "status": "todo",
        "priority": 3
    },
    {
        "id": 2,
        "title": "second title",
        "description": "second description",
        "endDate": "2024-02-28",
        "status": "todo",
        "priority": 2
    }
];

let sort = null;

const addTodo = (title, description, endDate) => {
    const priority = Math.floor(Math.random() * 3) + 1;
    const todo = { id: todos.length + 1, title, description, endDate, status: 'todo', priority: priority };
    todos.push(todo);
    renderTodos();
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

const completeTodo = (uid) => {
    const index = todos.findIndex(x => x.id === uid);
    todos[index].status = 'done';
    renderTodos();
}

const doingTodo = (uid) => {
    const index = todos.findIndex(x => x.id === uid);
    todos[index].status = 'doing';
    renderTodos();
}

const deleteTodo = (uid) => {
    const index = todos.findIndex(x => x.id === uid);
    todos.splice(index, 1);
    renderTodos();
}

const editTodo = (uid, updatedTodo) => {
    const index = todos.findIndex(x => x.id === uid);
    todos[index] = { ...todos[index], ...updatedTodo };
    renderTodos();
}

const sortTodosByEndDate = (e) => {
    sort = e.target.value || null;
    renderTodos();
}

const sortSelect = document.getElementById('sortSelect');
sortSelect.addEventListener('change', sortTodosByEndDate);

const renderList = (list, mainList) => {
    list.forEach((todo) => {
        const todoItem = document.createElement('li');
        const wrapper = document.createElement('div');
        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.textContent = `Title : ${todo.title}`;

        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('description');
        descriptionElement.textContent = `Description : ${todo.description}`;



        const endDateElement = document.createElement('div');
        endDateElement.classList.add('endDate');
        endDateElement.textContent = `End Date : ${todo.endDate}`;

        const statusElement = document.createElement('div');
        statusElement.classList.add('status');
        statusElement.textContent = `Status : ${todo.status}`;

        const priorityElement = document.createElement('div');
        priorityElement.classList.add('priority');
        priorityElement.textContent = `Priority : ${todo.priority === 1 && 'low' || todo.priority === 2 && 'medium' || todo.priority === 3 && 'high'}`;

        const textViewElement = document.createElement('div');
        textViewElement.classList.add('text-view');

        textViewElement.appendChild(titleElement);
        textViewElement.appendChild(descriptionElement);
        textViewElement.appendChild(endDateElement);
        textViewElement.appendChild(statusElement);
        textViewElement.appendChild(priorityElement);

        const buttonsElement = document.createElement('div');
        buttonsElement.classList.add('button-view');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            const editInput = document.createElement('input');
            editInput.value = todo.title;

            const editDescription = document.createElement('input');
            editDescription.value = todo.description;

            const endDate = document.createElement('input');
            endDate.type = "date";
            endDate.value = todo.endDate;

            wrapper.innerHTML = '';
            const buttonsElementEdit = document.createElement('div');
            buttonsElementEdit.classList.add('button-view');
            const textViewElementEdit = document.createElement('div');
            textViewElementEdit.classList.add('text-view');

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.classList.add('update-button');
            updateButton.addEventListener('click', () => editTodo(todo.id, {
                title: editInput.value,
                description: editDescription.value,
                endDate: endDate.value,
            }));

            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.classList.add('cancel-button');
            cancelButton.addEventListener('click', () => renderTodos());

            textViewElementEdit.appendChild(editInput);
            textViewElementEdit.appendChild(editDescription);
            textViewElementEdit.appendChild(endDate);
            buttonsElementEdit.appendChild(updateButton);
            buttonsElementEdit.appendChild(cancelButton);

            wrapper.appendChild(textViewElementEdit);
            wrapper.appendChild(buttonsElementEdit);

        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteTodo(todo.id));

        if (todo.status === 'todo') {
            const doingButton = document.createElement('button');
            doingButton.textContent = 'Todo Doing';
            doingButton.classList.add('doing-todo-button');
            doingButton.addEventListener('click', () => doingTodo(todo.id));
            buttonsElement.appendChild(doingButton);
        }

        if (todo.status === 'todo' || todo.status === 'doing') {
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Todo Complete';
            completeButton.classList.add('complete-todo-button');
            completeButton.addEventListener('click', () => completeTodo(todo.id));
            buttonsElement.appendChild(completeButton);
        }

        buttonsElement.appendChild(editButton);
        buttonsElement.appendChild(deleteButton);

        wrapper.appendChild(textViewElement);
        wrapper.appendChild(buttonsElement);
        todoItem.appendChild(wrapper)
        mainList.appendChild(todoItem);
    });
}

const renderTodos = () => {
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = '';

    const todoListDoing = document.querySelector('.todo-list-doing');
    todoListDoing.innerHTML = '';

    const todoListDone = document.querySelector('.todo-list-done');
    todoListDone.innerHTML = '';

    const dataSort = [...todos];

    if (sort === 'ascDate') {
        dataSort.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    }

    if (sort === 'decDate') {
        dataSort.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    }

    if(sort === 'decPriority'){
        dataSort.sort((a, b) => b.priority - a.priority);
    }

    if(sort === 'ascPriority'){
        dataSort.sort((a, b) => a.priority - b.priority);
    }

    renderList(dataSort.filter(z => z.status === 'todo'), todoList);
    renderList(dataSort.filter(z => z.status === 'doing'), todoListDoing);
    renderList(dataSort.filter(z => z.status === 'done'), todoListDone);

}

renderTodos();