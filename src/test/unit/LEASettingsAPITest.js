import assert from 'assert'
import {describe, it, beforeEach, after} from 'mocha'
import {LEASettingsAPI} from "../../app/LEASettingsAPI.js";
import {Operator} from "../../app/model.js";

describe('LEA Settings API', function() {
    describe('Get operators', function () {
        let api
        let operators
        beforeEach(async function() {
            api = new LEASettingsAPI()
            operators = await api.getOperators()
        })
        describe('first call getOperators', function () {
            it('should return an object which is not null', function() {
                assert.ok(operators)
            })
            it('first element should be type Operator', function() {
                assert.strictEqual(typeof operators[0], typeof new Operator)
            })
            it('first Operator should have a id as nummber', function() {
                assert.strictEqual(typeof(operators[0].id), typeof(1))
            })
            it('first Operator should have a name as string', function() {
                assert.strictEqual(typeof(operators[0].name), typeof(" "))
            })
        })
    })
    describe('getProductsFromOperator', function () {
        let api
        let products
        beforeEach(async function() {
            api = new LEASettingsAPI()
            let operator = new Operator(1, "Standard")
            products = await api.getProductsFromOperator(operator)
        })
        describe('get for operator 1', function() {
            it ('should return an object which is not null', function() {
                assert.ok(products)
            })
            it('first product should have a id as int', function() {
                assert.strictEqual(typeof(products[0].id), typeof(1))
            })
            it('first product should have a name as string', function() {
                assert.strictEqual(typeof(products[0].name), typeof(" "))
            })
            it('first product should have a operatorId as int', function() {
                assert.strictEqual(typeof(products[0].operatorId), typeof (1))
            })
            it('first product should have a isDefault as int', function() {
                assert.strictEqual(typeof(products[0].operatorId), typeof (1))
            })
            it('should return a list with 3 objects', async function() {
                assert.strictEqual(products.length, 3)
            })
        })
    })
})