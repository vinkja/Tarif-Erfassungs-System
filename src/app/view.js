//import fetch from "node-fetch";

const url = "http://ela-prod-01.eturnity.io/"
const apiOperator = "lea_settings/api/operators"


// fetch(url+apiOperator)
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))

fetch(url+apiOperator)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log(err);
    });

function appendData(data) {
    let mainContainer = document.getElementById("energieversoger");
    for (var i = 1; i < data.length; i++) {
        let option = document.createElement("option");
        option.innerHTML = data[i].name;
        mainContainer.appendChild(option);
    }
}