const todoInput = document.querySelector('.header__input');
const todoAdd = document.querySelector('.header__btn');
const todoList = document.querySelector('.content__list');
const todoFilter = document.querySelector('.header__filter');

//Масив для хранения данных
let todos = [];

//Получение данных с LocalStorage
if (localStorage.getItem('tasks')) {
  todos = JSON.parse(localStorage.getItem('tasks'));
  createTask();
}

//Клик на кнопку "ADD"
todoAdd.addEventListener('click', () => {
  //Своеобразный шаблон для данных
  const taskTemplate = {
    //Генерация рандомного ID
    id: Math.random(),
    message: todoInput.value,
    stat: false,
  };

  //Проверка инпута на пустоту
  if (todoInput.value) {
    //Добавление нового объекта в масив
    todos.push(taskTemplate);
  } else {
    alert('Введите название задачи');
  }
  //Отображение данных из масива
  localStorage.setItem('tasks', JSON.stringify(todos));
  createTask();
  //Обнуление данных для инпута
  todoInput.value = '';
});

function createTask() {
  //Обнуление списка
  todoList.innerHTML = '';
  //Перебор всех эл масива
  todos.forEach(item => {
    //Шаблон для элементов
    let taskDisplay = `<li id="${item.id}" class="content__item ${
      item.stat ? 'compl' : ''
    }">
  			<p class="content__text">${item.message}</p>
  			<div class="content__btns">
  				<button class="content__btn content__compl">+</button>
  				<button class="content__btn content__del">-</button>
  			</div>
  		</li>
  		`;
    //Добавление эл в список
    todoList.innerHTML += taskDisplay;

    const todoBtnDel = document.querySelectorAll('.content__del');
    todoBtnDel.forEach(item => {
      item.addEventListener('click', function () {
        //Узнаем ID элемента
        const todoItemId = item.closest('li').getAttribute('id');
        todos.forEach((item, index) => {
          //В ходе перебора сравниваем ID с нужным
          if (item.id == todoItemId) {
            //Удаляем объект из масива
            todos.splice(index, 1);
            createTask();
            localStorage.setItem('tasks', JSON.stringify(todos));
          }
        });
      });
    });

    const todoCompl = document.querySelectorAll('.content__compl');
    todoCompl.forEach(item => {
      item.addEventListener('click', function () {
        //Узнаем ID элемента
        const todoComplItemId = item.closest('li').getAttribute('id');
        todos.forEach(item => {
          //В ходе перебора сравниваем ID с нужным
          if (item.id == todoComplItemId) {
            //Меняем занчение статуса на противоположное
            item.stat = !item.stat;
          }
        });
        localStorage.setItem('tasks', JSON.stringify(todos));
        createTask();
      });
    });
  });
}
