const todoInput = document.querySelector('.todo__input');
const todoBtnAdd = document.querySelector('.todo__add');
const todoList = document.querySelector('.todo__list');

let tasks = [];

if (localStorage.getItem('todo')) {
  tasks = JSON.parse(localStorage.getItem('todo'));
  tasksDisplay();
}

todoBtnAdd.addEventListener('click', () => {
  const tasksPattern = {
    id: new Date().valueOf(),
    task: todoInput.value,
    status: false,
  };

  tasks.push(tasksPattern);

  tasksDisplay();
  localStorage.setItem('todo', JSON.stringify(tasks));
  todoInput.value = '';
});

function tasksDisplay() {
  todoList.innerHTML = '';
  tasks.forEach(item => {
    let tasksDisplay = `
		<li id="todo__item-${item.id}" class="todo__item">
					<lable for="todo__check-${item.id}" class="todo__lable">${item.task}</lable>
					<div class="todo__btns">
						<input class="todo__check" type="checkbox" id="todo__check-${item.id}" ${
      item.status ? 'checked' : ''
    }>
						<label class="todo__check-lable" for="todo__check-${item.id}"></label>
						<button id="${item.id}" class="todo__del">DEL</button>
					</div>
				</li>
		`;
    todoList.innerHTML += tasksDisplay;
  });
}

todoList.addEventListener('change', e => {
  const todoLable = document.querySelector(
    `[for=${e.target.getAttribute('id')}]`
  ).innerHTML;

  tasks.forEach(function (item) {
    if (item.task === todoLable) {
      item.status
        ? (e.target.parentNode.parentNode.style.opacity = '1')
        : (e.target.parentNode.parentNode.style.opacity = '0.5');

      item.status = !item.status;

      localStorage.setItem('todo', JSON.stringify(tasks));
    }
  });
});

const todoBtnDel = document.querySelectorAll('.todo__del');
todoBtnDel.forEach(item => {
  item.addEventListener('click', function () {
    const btnId = item.getAttribute('id');

    const todoItem = document.querySelector(`#todo__item-${btnId}`);
    todoItem.style.display = 'none';

    tasks.forEach(function (el, i) {
      if (el.id == btnId) {
        tasks.splice(i, 1);
        console.log(el.id);
      }
    });

    localStorage.setItem('todo', JSON.stringify(tasks));
  });
});
