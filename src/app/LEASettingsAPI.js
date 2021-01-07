import fetch from 'node-fetch'
import {Operator, Product, Tariff} from './model.js'

export class LEASettingsAPI {
    constructor() {
        this.url = "https://ep-dev-03.eturnity.ch/lea_settings/api/"
        this.apiOperators = "operators"
        this.apiProducts = "electricity-products-egt/"
        this.apiProduct = "electricity-product-structure-view/"
        this.operators = []
    }

    async loadOperators() {
        await fetch(this.url + this.apiOperators)
            .then(res => res.json())
            .then(data => {
                for (let entry of data) {
                    let op = new Operator(entry.id, entry.name, entry.vse_id, entry.elcom_number)
                    this.operators.push(op)
                }
            })
    }

    getOperators() {
        if (this.operators.length === 0) {
            return "no operators loaded"
        } else {
            return this.operators
        }
    }

    async getProductsFromOperator(operator) {
        let products = []
        await fetch(this.url + this.apiProducts + operator.id)
            .then(res => res.json())
            .then(data => {
                for (let entry of data) {
                    let product = new Product(entry.id, operator, entry.name, null,  entry.standard)
                    products.push(product)
                }
            })
            .catch(err => console.log(err))
        return products
    }

    //TODO: implement as soon as API is ready
    async getProductFromProduct(product) {
        await fetch(this.url + this.apiProduct + product)
            .then(res => res.json())
            .then(data => {
                console.log("API not yet ready")
            })
            .catch(err => console.log(err))
        return product
    }

    //TODO: implement as soon as API is ready
    sendProduct(product) {
        fetch(this.url + this.apiPostProduct, {
            method: "post",
            body: JSON.stringify(product), // new function, should be serialized first
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
    }
}
