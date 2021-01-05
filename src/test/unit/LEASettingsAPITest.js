import assert from 'assert'
import {describe, it, beforeEach, after} from 'mocha'
import {LEASettingsAPI} from "../../app/LEASettingsAPI.js";
import {Operator, Product} from "../../app/model.js";

describe('LEA Settings API', function() {
    describe('Get operators', function () {
        let api
        let operators
        beforeEach(async function() {
            api = new LEASettingsAPI()
            await api.loadOperators()
            operators = api.getOperators()
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
        describe('get for operator 1', function() {
            let api
            let products
            beforeEach(async function() {
                api = new LEASettingsAPI()
                let operator = new Operator(1, "Standard")
                products = await api.getProductsFromOperator(operator)
            })
            it ('should return an object which is not null', function() {
                assert.ok(products)
            })
            it('first product should have a id as int', function() {
                assert.strictEqual(typeof(products[0].id), typeof(1))
            })
            it('first product should have a name as string', function() {
                assert.strictEqual(typeof(products[0].name), typeof(" "))
            })
            it('first product should have a operator of type Operator', function() {
                assert.strictEqual(typeof(products[0].operator), typeof new Operator())
            })
            it('first product should have a isDefault as int', function() {
                assert.strictEqual(typeof(products[0].isDefault), typeof (1))
            })
            it('should return a list with 3 objects', async function() {
                assert.strictEqual(products.length, 3)
            })
        })
        describe('get for non-existing operator', function() {
            it ('should return a empty list', async function() {
                let api = new LEASettingsAPI()
                let operator = new Operator(11233434234213, "Standard")
                let products = await api.getProductsFromOperator(operator)
                assert.strictEqual(products.length, 0)
            })
        })
    })

    //TODO: delete .skip as soon API is ready, add more tests with Tariffs & months etc.
    describe.skip('getProductFromProductId', function () {
        describe('get for product id 6490', function() {
            let api
            let product
            let productWithTariff
            beforeEach(async function() {
                api = new LEASettingsAPI()
                product = new Product(6490, 1)
                productWithTariff = await api.getProductFromProduct(product)
            })
            it ('should return an object which is not null', function() {
                assert.ok(productWithTariff)
            })
            it('product should have a id as int', function() {
                assert.strictEqual(typeof(product.id), typeof(1))
            })
            it('product should have a id 6490', function() {
                assert.strictEqual(product.id, 6490)
            })
            it('product should have a name as string', function() {
                assert.strictEqual(typeof(products[0].name), typeof(" "))
            })
            it('product should have a operatorId as int', function() {
                assert.strictEqual(typeof(products[0].operatorId), typeof (1))
            })
            it('product should have a isDefault as int', function() {
                assert.strictEqual(typeof(products[0].operatorId), typeof (1))
            })
            it('should return a list with 3 objects', async function() {
                assert.strictEqual(products.length, 3)
            })
        })
        describe('get for non-existing operator', function() {
            it ('should return a empty list', async function() {
                let api = new LEASettingsAPI()
                let operator = new Operator(11233434234213, "Standard")
                let products = await api.getProductsFromOperator(operator)
                assert.strictEqual(products.length, 0)
            })
        })
    })
})