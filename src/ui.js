export class UI {
    //değişkenleri seçtim.
    constructor() {
        this.main = document.getElementById("main");
        this.header = document.getElementById("header");

        this.form = document.getElementById("form");

        this.hair = document.getElementById("hair");
        this.skin = document.getElementById("skin");
        this.eye = document.getElementById("eye");

        this.tbody = document.getElementById("tbody");
        this.name = document.getElementById("name");
        this.birthDay = document.getElementById("birth");

        this.searchInput = document.getElementById("search");
        this.table = document.getElementById("dataTable");
        this.row = this.table.getElementsByTagName("tr");

        this.tableLenght;
    }


    // Input değerlerini dinamik olarak almak için ortak fonksiyon.
    updateInputText(id, value) {
        document.getElementById(id).innerHTML = value;
    }
    updateInputNumber(id, value) {
        document.getElementById(id).value = value;
    }

    // Fake API'den gelen dataları tabloya yazıyoruyorum.
    dataPushTable(datas) {
        datas.forEach(((data, i) => {
            this.tableLenght = this.row.length
            this.tbody.innerHTML += `<tr id="${data.id}">
                                        <td style="display: none">${data.id}</td>
                                        <td>${i + 1}</td>
                                        <td>${data.name}</td>
                                        <td>${data.height}</td>
                                        <td>${data.mass}</td>
                                        <td>${data.hair_color}</td>
                                        <td>${data.skin_color}</td>
                                        <td>${data.eye_color}</td>
                                        <td>${data.birth_year}</td>
                                        <td>${data.gender}</td>
                                        <td>
                                            <i class="fas fa-wrench"></i>
                                            <i class="fas fa-trash"></i>
                                        </td>
                                        <td>
                                            <i id="close" class="fas fa-window-close"></i>
                                        </td>
                                    </tr>`
        }))
    }

    //Yeni karakteri Kullanıcı arayüzüne eklemek içinç
    addNewCharTable(data) {
        this.tableLenght = this.row.length
        this.tbody.innerHTML += `<tr id="${data.id}">
                                    <td style="display: none">${data.id}</td>
                                    <td>${this.tableLenght}</td>
                                    <td>${data.name}</td>
                                    <td>${data.height}</td>
                                    <td>${data.mass}</td>
                                    <td>${data.hair_color}</td>
                                    <td>${data.skin_color}</td>
                                    <td>${data.eye_color}</td>
                                    <td>${data.birth_year}</td>
                                    <td>${data.gender}</td>
                                    <td>
                                    <i class="fas fa-wrench"></i>
                                    <i class="fas fa-trash"></i>
                                    </td>
                                    <td>
                                    <i class="fas fa-window-close"></i>
                                    </td>
                                </tr>`
    }

    //Ekeleme yaptıktan sonra inputların içini boşaltıyorum. 
    clearInp() {
        this.name.value = ""
        this.birthDay.value = ""
    }

    //Tabloyu filtrelemek için gereken fonksiyon.
    searchInDataTable() {
        for (let i = 0; i < this.row.length; i++) {
            let td = this.row[i].getElementsByTagName("td")[2];
            if (td) {
                let inpVal = td.textContent || td.innerText;
                if (inpVal.toUpperCase().indexOf(this.searchInput.value.toUpperCase()) > -1) {
                    this.row[i].style.display = "";
                } else {
                    this.row[i].style.display = "none"
                }
            }

        }
    }

    deleteCharUI(element) {
        this.tableLenght = this.row.length
        element.remove()
    }

    updateRow(element) {
        element.style.transform = "scale(1.2)"
        element.style.boxShadow = "0px 0px 15px 0px rgba(0,0,0,0.75)"

    }

    defaultRow(element) {
        element.style.transform = "scale(1)"
        element.style.boxShadow = "none"
    }

    showMainContainer() {
        this.header.className = "animate__animated animate__bounceOutUp animate__slow 2s"
        setTimeout(() => {
            this.header.style.display = "none"
        }, 1500);
        setTimeout(() => {
            this.main.style.display = "block"
        }, 1500);

    }

    openInputs() {
        if (this.form.style.display === "block") {
            this.form.style.display = "none"
        } else {
            this.form.style.display = "block"
        }
    }

    loadSelects() {

        this.hair.innerHTML = `
                            <option value="White" selected>White</option>
                            <option value="Black">Black</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Yellow-Green">Yellow-Green</option>
                            <option value="Green">Green</option>
                            <option value="Blue-Green">Blue-Green</option>
                            <option value="Blue">Blue</option>
                            <option value="Blue-Violet">Blue-Violet</option>
                            <option value="Violet">Violet</option>
                            <option value="Red-Violet">Red-Violet</option>
                            <option value="Red">Red</option>
                            <option value="Brown">Brown</option>
                            <option value="Red-Orange">Red-Orange</option>
                            <option value="Orange">Orange</option>
                            <option value="Yellow-Orange">Yellow-Orange</option>
                            `;
        this.skin.innerHTML = `
                            <option value="Black">Black</option>
                            <option value="Brown">Brown</option>
                            <option value="Auburn">Auburn</option>
                            <option value="Golden-Blonde">Golden-Blonde</option>
                            <option value="Blonde">Blonde</option>
                            <option value="Vanllia-Green">Vanllia</option>
                            <option value="Beige">Beige</option>
                            <option value="Almond-Violet">Almond</option>
                            <option value="Golden">Golden</option>
                            <option value="Mocha">Mocha</option>
                            <option value="Toffee">Toffee</option>
                            `;
        this.eye.innerHTML = `
                            <option value="Light-Blue" selected>Light-Blue</option>
                            <option value="Blue">Blue</option>
                            <option value="Green">Green</option>
                            <option value="Hazel">Hazel</option>
                            <option value="Brown">Brown</option>
                            <option value="Brown-Black">Brown-Black</option>
                            `

    }

}