import {
    Request
} from "./request"

const request = new Request("http://localhost:3000/results");


request.get()
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err));
request.post({
    "name": "name",
    "height": "height",
    "mass": "mass",
    "hair_color": "hair",
    "skin_color": "skin",
    "eye_color": "eye",
    "birth_year": "birthDay",
    "gender": "genderV"
}).then(data=>console.log(data)
)