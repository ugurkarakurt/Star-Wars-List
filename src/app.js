import {
    Request
} from "./request"
import {
    UI
} from "./ui"


const request = new Request("http://localhost:3000/results");
const ui = new UI();

const header = document.getElementById("header");

const search = document.getElementById("search");

const form = document.getElementById("form");
const name = document.getElementById("name"),
    height = document.getElementById("height"),
    mass = document.getElementById("mass"),
    hair = document.getElementById("hair"),
    skin = document.getElementById("skin"),
    eye = document.getElementById("eye"),
    birthDay = document.getElementById("birth"),
    gender = document.querySelectorAll("input[name=gender]"),
    forHeight = document.getElementById("forHeight"),
    forMass = document.getElementById("forMass");

const addButton = document.getElementById("addButton");


addEventListeners();

function addEventListeners() {
    height.addEventListener("input", function () {
        ui.updateInputNumber("forHeight", this.value)
    })
    forHeight.addEventListener("input", function () {
        if (this.value > -1 && this.value < 301) {
            ui.updateInputNumber("height", this.value)
        } else if (this.value < 0) {
            this.value = 0;
            Swal.fire('Please enter a valid value.')
        } else if (this.value > 300) {
            this.value = 300;
            Swal.fire('Please enter a valid value.')
        }
    })
    mass.addEventListener("input", function () {
        ui.updateInputNumber("forMass", this.value)
    })
    forMass.addEventListener("input", function () {
        if (this.value > -1 && this.value < 301) {
            ui.updateInputNumber("mass", this.value)
        } else if (this.value < 0) {
            this.value = 0;
            Swal.fire('Please enter a valid value.')
        } else if (this.value > 300) {
            this.value = 300;
            Swal.fire('Please enter a valid value.')
        }

    })
    eye.addEventListener("input", function () {
        ui.updateInputText("forEye", eye.value)
    })
    hair.addEventListener("input", function () {
        ui.updateInputText("forHair", this.value)
    })
    skin.addEventListener("input", function () {
        ui.updateInputText("forSkin", this.value)
    })

    form.addEventListener("submit", addNewChar);

    search.onkeyup = function () {
        ui.searchInDataTable()
    }

    header.addEventListener("click", showMain);

    addButton.addEventListener("click", openForm);

}

request.get()
    .then(data => {
        ui.dataPushTable(data);

        const updateBTN = document.querySelectorAll(".fa-wrench");
        updateBTN.forEach(function (update) {
            update.addEventListener("click", function () {
                updateRow(update)
            });
        });
        const deleteBTN = document.querySelectorAll(".fa-trash");
        deleteBTN.forEach(function (remove) {
            remove.addEventListener("click", function () {
                deleteRow(remove)
            });
        });
        const closeBTN = document.querySelectorAll(".fa-window-close");
        closeBTN.forEach(function (close) {
            close.addEventListener("click", function () {
                ui.defaultRow(close.parentElement.parentElement)
            });
        });
    })
    .catch(err => console.log(err));

let updateData;

function updateRow(element) {

    updateData = element.parentElement.parentElement.children;

    element.parentElement.parentElement.contentEditable = true,
        element.parentElement.contentEditable = false,
        element.parentElement.nextElementSibling.contentEditable = false,


        ui.updateRow(element.parentElement.parentElement);

    element.parentElement.parentElement.onfocusout = function () {
        Swal.fire({
            title: 'Do you want to save your change?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Saved!',
                    'Your file has been saved.',
                    'success',
                    request.put(element.parentElement.parentElement.id, {
                        "name": updateData[2].innerText,
                        "height": updateData[3].innerText,
                        "mass": updateData[4].innerText,
                        "hair_color": updateData[5].innerText,
                        "skin_color": updateData[6].innerText,
                        "eye_color": updateData[7].innerText,
                        "birth_year": updateData[8].innerText,
                        "gender": updateData[9].innerText
                    }),
                    element.parentElement.parentElement.contentEditable = false,
                    ui.defaultRow(element.parentElement.parentElement)
                )
            }
        })

    }
}
function deleteRow(element) {

    console.log(element.parentElement.parentElement.id);

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success',
                request.delete(element.parentElement.parentElement.id)
                    .then(message => {
                        ui.deleteCharUI(element.parentElement.parentElement)
                    })
                    .catch(err => console.error(err))
            )
        }
    })
}

let genderVal;

function addNewChar(e) {

    if (name.value === "" || height.value === "" || mass.value === "" || hair.value === "" || skin.value === "" || eye.value === "" || eye.value === "" || birthDay.value === "") {
        Swal.fire(
            'Oops!',
            'Please fill in required fields.',
            'warning'
        )
    } else {
        for (let i = 0; i < gender.length; i++) {
            if (gender[i].checked) {
                genderVal = gender[i].value
            }
        }
        request.post({
            "name": name.value.trim(),
            "height": height.value,
            "mass": mass.value,
            "hair_color": hair.value,
            "skin_color": skin.value,
            "eye_color": eye.value,
            "birth_year": birthDay.value.trim(),
            "gender": genderVal
        })
            .then(data => {
                ui.addNewCharTable(data)
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully added.'

                })
            })
        ui.clearInp();
    }

    e.preventDefault();
}

function showMain() {
    ui.showMainContainer();
}

function openForm(e) {
    ui.openInputs(e.target.parentElement.parentElement)
}

ui.loadSelects()
