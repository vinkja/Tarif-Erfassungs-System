import fetch from "node-fetch";
import {Operator, Product} from './model.js'

export class LEASettingsAPI {
    constructor() {
        this.url = "http://ela-prod-01.eturnity.io/"
        this.apiOperators = "lea_settings/api/operators"
        this.apiProduct = "lea_settings/api/feed-in-variation-structure/"
        this.operators = null
    }

    async getOperators() {
        if (this.operators === null) {
            this.operators = []
            await fetch(this.url + this.apiOperators)
                .then(res => res.json())
                .then(data => {
                    for (let entry of data) {
                        let op = new Operator(entry.id, entry.name)
                        this.operators.push(op)
                    }
                })
            return this.operators
        } else {
            return this.operators
        }
    }
}

//console.log(await getProduct(1024))
