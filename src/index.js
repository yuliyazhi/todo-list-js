import './index.scss';

import checkArrow from "../src/static/icons/check_arrow.svg";

const listTask = document.querySelector(".list-task");
const newTaskForm = document.querySelector(".new-task");
const btnColor = document.querySelectorAll(".btn-color");
const categoriesElem = document.querySelector(".filter-category");

const listTaskData = [
    {
        id: 1,
        text: "Забрать документы",
        comleted: true,
        color: "green",
        category: "work",
    },
    {
        id: 2,
        text: "Парикмахер",
        comleted: false,
        color: "pink",
        category: "other",
    },
    {
        id: 3,
        text: "Заказать букет маме",
        comleted: false,
        color: "yellow",
        category: "family",
    },
    {
        id: 4,
        text: "Собрание в школе",
        comleted: true,
        color: "yellow",
        category: "family",
    },
    {
        id: 5,
        text: "Купить купальник",
        color: "orange",
        comleted: true,
        category: "shop",

    },
    {
        id: 6,
        text: "Мыть балкон",
        comleted: true,
        color: "green",
        category: "home",

    },
    {
        id: 7,
        text: "Записаться к стоматологу",
        comleted: false,
        color: "blue",
        category: "helth",

    },
    {
        id: 8,
        text: "Массаж",
        comleted: false,
        color: "red",
        category: "helth",

    },
    {
        id: 9,
        text: "Новые бокалы",
        comleted: true,
        color: "blue",
        category: "shop",

    },
    {
        id: 10,
        text: "Стирка",
        color: "orange",
        comleted: true,
        category: "home",

    },

]

renderListTask(listTaskData);

newTaskForm.addEventListener("submit", addNewTask);

categoriesElem.addEventListener("change", () => {
    const category = categoriesElem.value;
    console.log(category);

    const filteredTasks = filterTasks(listTaskData, category);

    clearTask();

    renderListTask(filteredTasks);
})




function renderListTask(listTaskData) {
    listTaskData.forEach((task) => renderTask(task));
}

function renderTask(task) {
    const taskElem = document.createElement("div");
    taskElem.classList.add("list-wrapper");

    // taskElem.setAttribute("data-id", task.id);

    const taskHTML = `
    <div class="list-status ${task.color} ${task.comleted ? "checked" : ""}">
        <input type="checkbox" ${task.comleted ? "checked" : ""}>
        <img src="${checkArrow}" alt="">
    </div>

    <div class="list btn-color ${task.color}">
        <span>${task.text}</span>

        /* <span>${task.category}</span> */
    </div>`;
    taskElem.insertAdjacentHTML("beforeend", taskHTML);

    // taskElem.querySelector(".list-status").addEventListener("click", () => {
    //     console.log("click list-status");
    // });

    const listStatus = taskElem.querySelector(".list-status");
    listStatus.setAttribute("data-id", task.id);

    listStatus.addEventListener("click", changeTaskStatus);


    taskElem.querySelector(".list").addEventListener("click", () => {
        console.log("click list");
    });

    listTask.append(taskElem);
};

function addNewTask(ev) {
    // const text = newTaskInput.value; для form не требуется
    ev.preventDefault();

    const formData = new FormData(newTaskForm);
    const title = formData.get("title");
    const category = formData.get("category");
    const importance = formData.get("importance");
    const comment = formData.get("comment");
    const taskColor = formData.get("task-color");


    if (title, comment) {

        const newTask = {
            id: Date.now(),
            text: title,
            comment: comment,
            importance: importance,
            category: category,
            comleted: false,
            color: taskColor,

        }

        listTaskData.push(newTask);
        console.log(listTaskData);

        renderTask(newTask);
        newTaskForm.reset();


    }
}

function changeTaskStatus(ev) {

    ev.preventDefault();

    // console.log(ev.currentTarget);

    const listStatus = ev.currentTarget; /*показывает div на который происходит клик */
    // некорректно работает, при клике на checkbox не меняет статус

    listStatus.classList.toggle("checked");

    const inputElem = listStatus.querySelector("input");
    if (inputElem.checked) {
        inputElem.checked = false;
    } else {
        inputElem.checked = true;
    }

    /*
    или так
     inputElem.checked = !inputElem.checked;
    */
    const id = listStatus.getAttribute("data-id");

    const taskFound = listTaskData.find((elem) => elem.id === Number(id));
    if (taskFound.comleted) {
        taskFound.comleted = false;
    } else {
        taskFound.comleted = true;
    }
    console.log(listTaskData);
}


// Прикрепляем обработчик события 'click' к каждому элементу
btnColor.forEach(function (btn) {
    btn.addEventListener('click', function () {
        // Находим элемент, который был кликнут
        const choiceBtn = this;

        // Удаляем класс 'choice' со всех элементов
        btnColor.forEach(function (otherbuttons) {
            otherbuttons.classList.remove('choice');
        });

        // Добавляем класс 'active' к кликнутому элементу
        choiceBtn.classList.add('choice');
    });
});


function filterTasks(listTaskData, category) {
    if (category === "all-list") {
        return listTaskData;
    } else {
        return listTaskData.filter((task) => task.category === category)
    }
}


function clearTask() {
    while (listTask.lastChild) {
        listTask.lastChild.remove();
    }
}