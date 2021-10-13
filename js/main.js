const todoBtn = document.querySelector('.todo__add-btn');
const todoInput = document.querySelector('.todo__add-input');
const todoList = document.querySelector('.todo__list');
const todoFilter = document.querySelector('.todo__filter');

document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', createItem);
todoList.addEventListener('click', delItem);
todoFilter.addEventListener('click', filterItem);

function createItem(event) {
  event.preventDefault();
  //create li
  const todoItem = document.createElement('li');
  todoItem.classList.add('todo__item');
  todoList.appendChild(todoItem);
  //create text
  const todoText = document.createElement('p');
  todoText.innerHTML = todoInput.value;
  todoText.classList.add('todo__text');
  todoItem.appendChild(todoText);
  saveLocal(todoInput.value);

  //create btns wrapper
  const todoBtnsWrapper = document.createElement('div');
  todoBtnsWrapper.classList.add('todo__btns');
  todoItem.appendChild(todoBtnsWrapper);
  //create checkbox
  const todoCheck = document.createElement('button');
  todoCheck.classList.add('todo__checkbox');
  todoBtnsWrapper.appendChild(todoCheck);
  //create brn for del
  const todoDel = document.createElement('button');
  todoDel.innerHTML = 'del';
  todoDel.classList.add('todo__del-btn');
  todoBtnsWrapper.appendChild(todoDel);
  todoInput.value = '';
}

function delItem(e) {
  const item = e.target;
  //delete
  if (item.classList.contains('todo__del-btn')) {
    const todo = item.closest('li');
    delLocalTodo(todo);

    todo.classList.add('del-anim');
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  //complete
  if (item.classList.contains('todo__checkbox')) {
    item.classList.toggle('todo__checkbox--complete');
    item.closest('li').classList.toggle('todo__item--complete');
  }
}

function filterItem(e) {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('todo__item--complete')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('todo__item--complete')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocal(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo__item');
    todoList.appendChild(todoItem);
    //create text
    const todoText = document.createElement('p');
    todoText.innerHTML = todo;
    todoText.classList.add('todo__text');
    todoItem.appendChild(todoText);
    //create btns wrapper
    const todoBtnsWrapper = document.createElement('div');
    todoBtnsWrapper.classList.add('todo__btns');
    todoItem.appendChild(todoBtnsWrapper);
    //create checkbox
    const todoCheck = document.createElement('button');
    todoCheck.classList.add('todo__checkbox');
    todoBtnsWrapper.appendChild(todoCheck);
    //create brn for del
    const todoDel = document.createElement('button');
    todoDel.innerHTML = 'del';
    todoDel.classList.add('todo__del-btn');
    todoBtnsWrapper.appendChild(todoDel);
    todoInput.value = '';
  });
}

function delLocalTodo(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  console.log(todo);
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
