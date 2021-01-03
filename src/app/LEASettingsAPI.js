import fetch from "node-fetch";
import {Operator, Product, Tariff} from './model.js'

export class LEASettingsAPI {
    constructor() {
        this.url = "http://ela-prod-01.eturnity.io/"
        this.apiOperators = "lea_settings/api/operators"
        this.apiProducts = "lea_settings/api/electricity-products-egt/"
        this.apiProduct = "lea_settings/api/electricity-product-structure-view/"

    }

    async getOperators() {
        let operators = []
        await fetch(this.url + this.apiOperators)
            .then(res => res.json())
            .then(data => {
                for (let entry of data) {
                    let op = new Operator(entry.id, entry.name)
                    operators.push(op)
                }
            })
        return operators
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
        return products
    }

    async getProductFromProductId(product) {
        await fetch(this.url + this.apiProduct + product)
            .then(res => res.json())
            .then(data => {
                console.log("API not yet ready")
            })
        return product
    }
}
