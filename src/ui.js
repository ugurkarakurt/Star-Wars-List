export class UI {
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
    // Fake API'den gelen dataları tabloya yazıyoruyorum.
    dataPushTable(datas) {
        datas.forEach(((data, i) => {
            this.tableLenght = this.row.length
            this.tbody.innerHTML += `<tr id="row">
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
                                        <td id="delete-update">
                                            <i id="update" class="fas fa-wrench"></i>
                                            <i id="delete" class="fas fa-trash"></i>
                                        </td>
                                        <td id="closeButton">
                                            <i id="close" class="fas fa-window-close"></i>
                                        </td>
                                    </tr>`
        }))
    }
    showMainContainer() {
        this.header.className = "animate__animated animate__bounceOutUp animate__slow 2s"
        setTimeout(() => {
            this.header.style.display = "none"
        }, 1500);
        setTimeout(() => {
            this.main.style.display = "block"
        }, 1500);
    };
}