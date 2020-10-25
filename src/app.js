import {
    Request
} from "./request"
import {
    UI
} from "./ui"


const request = new Request("http://localhost:3000/results");
const ui = new UI();


const header = document.getElementById("header"),
    main = document.getElementById("main")

const search = document.getElementById("search");
const charList = document.getElementById("tbody");

const form = document.getElementById("form");
const name = document.getElementById("name"),
    height = document.getElementById("height"),
    mass = document.getElementById("mass"),
    hair = document.getElementById("hair"),
    skin = document.getElementById("skin"),
    eye = document.getElementById("eye"),
    birthDay = document.getElementById("birth"),
    gender = document.getElementById("gender"),
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
        ui.updateInputText("forEye", this.value)
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

    charList.addEventListener("click", deleteOrUpdate);

    header.addEventListener("click", showMain);

    addButton.addEventListener("click", openForm);

}

let genderVal;

request.get()
    .then(data => {
        ui.dataPushTable(data)
    })
    .catch(err => console.log(err))

function addNewChar(e) {

    if (name.value === "" || height.value === "" || mass.value === "" || hair.value === "" || skin.value === "" || eye.value === "" || eye.value === "" || birthDay.value === "") {
        Swal.fire(
            'Oops!',
            'Please fill in required fields.',
            'warning'
        )
    } else {
        for (let i = 0; i < gender.children.length; i++) {
            if (gender.children[i].checked) {
                genderVal = gender.children[i].value
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

function deleteOrUpdate(e) {
    if (e.target.id === "delete") {

        const id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
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
                    request.delete(id)
                        .then(message => {
                            ui.deleteCharUI(e.target.parentElement.parentElement)
                        })
                        .catch(err => console.error(err))
                )
            }
        })

    }

    let updateData;
    if (e.target.id === "update") {
        const id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
        updateData = e.target.parentElement.parentElement.children,

            e.target.parentElement.parentElement.contentEditable = true,
            e.target.parentElement.contentEditable = false,
            e.target.parentElement.nextElementSibling.contentEditable = false,


            ui.updateRow(e.target.parentElement.parentElement);

        e.target.parentElement.parentElement.onfocusout = function () {
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
                        request.put(id, {
                            "name": updateData[2].innerText,
                            "height": updateData[3].innerText,
                            "mass": updateData[4].innerText,
                            "hair_color": updateData[5].innerText,
                            "skin_color": updateData[6].innerText,
                            "eye_color": updateData[7].innerText,
                            "birth_year": updateData[8].innerText,
                            "gender": updateData[9].innerText
                        }),
                        e.target.parentElement.parentElement.contentEditable = false,
                        ui.defaultRow(e.target.parentElement.parentElement)
                    )
                }
            })

        }
    }
    if (e.target.id === "close") {
        ui.defaultRow(e.target.parentElement.parentElement)
    }
    e.preventDefault();
}

function showMain() {
    ui.showMainContainer();
}

function openForm() {
    ui.openInputs(e.target.parentElement.parentElement)
}

ui.loadSelects()
