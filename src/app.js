import {
    Request
} from "./request"

const request = new Request("http://localhost:3000/results");


request.get()
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err))
