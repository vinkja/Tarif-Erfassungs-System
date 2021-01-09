import fetch from 'node-fetch'
import {Operator, Product, Tariff} from './model.js'

export class LEASettingsAPI {
    constructor(serverUrl) {
        this.url = serverUrl
        this.apiOperators = "/lea_settings/api/operators"
        this.apiProducts = "/lea_settings/api/electricity-products-egt/"
        this.apiProduct = "/lea_settings/api/electricity-product-structure-view/"
    }

    async loadOperators() {
        let operators = []
        await fetch(this.url + this.apiOperators)
            .then(res => res.json())
            .then(data => {
                for (let entry of data) {
                    let operator = new Operator(entry.id, entry.name, entry.vse_id, entry.elcom_number)
                    operators.push(operator)
                }
            })
        return operators
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
