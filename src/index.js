import './index.scss';

import checkArrow from "../src/static/icons/check_arrow.svg";

const listTask = document.querySelector(".list-task");
const newTaskInput = document.querySelector(".new-task__input");
const addBtn = document.querySelector(".add-btn");
const btnColor = document.querySelector(".btn-color");


const listTaskData = [
    {
        id: 1,
        text: "Забрать документы",
        comleted: true,
        color: "green",
    },
    {
        id: 2,
        text: "Парикмахер",
        comleted: false,
        color: "pink",
    },
    {
        id: 3,
        text: "Заказать букет маме",
        comleted: false,
        color: "yellow",
    },
    {
        id: 4,
        text: "Собрание в школе",
        comleted: true,
        color: "blue",
    },
    {
        id: 5,
        text: "Купить купальник",
        color: "yellow",
        comleted: true,
        color: "green",

    },
]

renderListTask();
addBtn.addEventListener("click", addNewTask)

function renderListTask() {
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

function addNewTask() {
    const text = newTaskInput.value;

    if (text) {
        const newTask = {
            id: Date.now(),
            text,
            comleted: false,
            color: "red",
        };

        listTaskData.push(newTask);

        renderTask(newTask);

        newTaskInput.value = "";
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


