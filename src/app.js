import {
    Request
} from "./request"
import {
    UI
} from "./ui"


const header = document.getElementById("header"),
    main = document.getElementById("main")


const request = new Request("http://localhost:3000/results");
const ui = new UI();


addEventListeners();

function addEventListeners() {
    header.addEventListener("click", showMain);
}

function showMain() {
    ui.showMainContainer();
}



request.get()
    .then(data => {
        ui.dataPushTable(data)
    })
    .catch(err => console.log(err));
