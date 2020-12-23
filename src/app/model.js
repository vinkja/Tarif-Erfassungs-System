import fetch from "node-fetch";

// const url = "http://ela-prod-01.eturnity.io/"
// const apiOperator = "lea_settings/api/operators"
//
// let test
// fetch(url+apiOperator)
//     .then(response => response.json())
//     .then(data => {
//         let test = JSON.parse(data)
//
//     })
//
// console.log(test)

class Operator {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

class Product {
    constructor(name, tarif, operator) {
        this.basicFeeMonthly = null
        this.validFromKwh = null
        this.operator = operator
        this.name = name
        this.tarif = tarif
        this.municipality_fee = null
        this.is_default = null
        this.grid_peak_power_tariff = null
        this.year = null
        this.operator_elcom_number = null
        this.valid_to_kwh = null
    }

}

class Tarif {
    constructor(ht, lt, month) {
        this.ht_end_monday = null
        this.ht_end_sunday = null
        this.ht_start_sunday = null
        this.ht_start_saturday = null
        this.ht = ht
        this.lt = lt
        this.ht_start_monday = null
        this.ht_end_saturday = null
        this.month = new Month()
    }
}

class Month {
    constructor(name, number ) {
        this.name = name
        this.number = number
    }
}


let januar = new Month("January", 1)
let februar = new Month("Februar", 2)
let months = [januar, februar]

let tarif1 = new Tarif(12.3,14)
tarif1.month = months

let operator1 = new Operator("Rhiienergie", 1244)

let product = new Product("sdsdf")
product.tarif = tarif1
product.operator = operator1

console.log(product)

JSONSerializer