import fetch from 'node-fetch'
import {Operator, Product, Tariff} from './model.js'

export class LEASettingsAPI {
    constructor(serverUrl) {
        this.url = serverUrl
        this.apiOperators = "/lea_settings/api/operators"
        this.apiProducts = "/lea_settings/api/electricity-products-egt/"
        this.apiProduct = "/lea_settings/api/electricity-product-structure-view/"
        this.apiPostUrl = "/lea_settings/api/electricity-product"
    }

    async getOperators() {
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

    async getProductsFromOperator(operator) {
        let products = []
        await fetch(this.url + this.apiProducts + operator.id)
            .then(res => res.json())
            .then(data => {
                for (let entry of data) {
                    let product = new Product(entry.id, operator, entry.name, null)
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

    async sendSwissProducts(product, winterTariffSelected) {
        let status
        await fetch(this.url + this.apiPostUrl, {
            method: 'POST',
            body: JSON.stringify(product.toSwissJSON(winterTariffSelected)),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => {
                //TODO: change status as soon API is ready
                if (res.status === 400) {
                    status = "ok"
                } else {
                    status = "nok"
                }
            })
            .catch(err => {
                status = err
            });
        return status
    }
}
