import './index.scss';

import checkArrow from "../src/static/icons/check_arrow.svg";

const taskElem = document.querySelector(".tasks");
const categoryElem = document.querySelector(".сategory");


const listData = [
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


renderTasks(listData);

categoryElem.addEventListener("change", () => {
    const category = categoryElem.value;
    const filterProduct = filterTask(listData, category);

    clearTasksElem();

    renderTasks(filterProduct);


});

function renderTasks(listData) {
    listData.forEach((task) => {
        const taskHTML = ` <div class="task">
        <span>${task.text}</span>
        <span>${task.category}</span>
          
        `;

        taskElem.insertAdjacentHTML("beforeend", taskHTML);
    });

}

function filterTask(listData, category) {

    if (category === "all-list") {
        return listData;
    } else {
        return listData.filter((task) => task.category === category)
    }

}

function clearTasksElem() {
    while (taskElem.lastChild) {
        taskElem.lastChild.remove();
    }
}