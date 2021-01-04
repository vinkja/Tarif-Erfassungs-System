import fetch from 'node-fetch'
import {Operator, Product, Tariff} from './model.js'

export class LEASettingsAPI {
    constructor() {
        this.url = "http://ela-prod-01.eturnity.io/"
        this.apiOperators = "lea_settings/api/operators"
        this.apiProducts = "lea_settings/api/electricity-products-egt/"
        this.apiProduct = "lea_settings/api/electricity-product-structure-view/"
        this.operators = []
    }

    async loadOperators() {
        await fetch(this.url + this.apiOperators)
            .then(res => res.json())
            .then(data => {
                for (let entry of data) {
                    let op = new Operator(entry.id, entry.name)
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
                    let product = new Product(entry.id, operator.id, entry.name, null,  entry.standard)
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
