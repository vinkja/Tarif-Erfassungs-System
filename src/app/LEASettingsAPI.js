import fetch from "node-fetch";
import {Operator} from './model.js'

const url = "http://ela-prod- 01.eturnity.io/"
const apiOperator = "lea_settings/api/operators"

async function getOperators() {
    let operators =[]
    fetch(url+apiOperator)
        .then(res => res.json())
        .then(data => {
            for (let entry of data) {
                let op = new Operator(entry.id, entry.name)
                operators.push(op)
            }
        })
    return operators
}

console.log(await getOperators())
