import assert from 'assert'
import chai from 'chai'
import {describe, it, beforeEach, after} from 'mocha'
import {Store} from "../../app/store.js";

describe('Store', function () {
    let store
    beforeEach(function () {
        store = new Store('test')
        store.createProduct()
    })
    describe('instantiate', function () {
        it('should create a empty operatorList', function () {
            assert.equal(store.operators.length, 0);
        })
        it('should create a api with URL: test', function () {
            assert.equal(store.api.url, 'test');
        })
        it('should create a empty operators list', function () {
            assert.equal(store.operators.length, 0)
        })
    })
    let store2
    beforeEach(async function () {
        store2 = new Store('https://ep-dev-03.eturnity.ch')
        await store2.loadOperators()
        store2.createProduct()
        store2.setOperator(2)
    })
    describe('loadOperators', function () {
        it('fill up operatorList', function () {
            assert.ok(store2.operators.length);
        })
    })
    describe('setOperators with operatorId 2', function () {
        it('operator.id should be 2', function () {
            assert.strictEqual(store2.product.operator.id, 2);
        })
        it('operator.vseId should be 10153012345', function () {
            assert.strictEqual(store2.product.operator.vseId, 10153012345);
        })
        it('operator.elcomNumber should be 486', function () {
            assert.strictEqual(store2.product.operator.elcomNumber, 486);
        })
    })
    describe('setSummerStart with start month 3', function () {
        it('should set summer.start on 3', function () {
            store2.setSummerStart(3)
            assert.strictEqual(store2.product.tariff.summer.start, 3)
        })
        it('should set winter.end on 2', function () {
            store2.setSummerStart(3)
            assert.strictEqual(store2.product.tariff.winter.end, 2)
        })
        it('should leave months of winter empty', function () {
            store2.setSummerStart(3)
            assert.strictEqual(store2.product.tariff.winter.months.length, 0)
        })
        it('should leave months of winter empty', function () {
            store2.setSummerStart(3)
            assert.strictEqual(store2.product.tariff.winter.months.length, 0)
        })
    })
    describe('setSummerStart to 2 and setSummerEnd to 6', function () {
        it('should fill summer.month with 5 entries', function () {
            store2.setSummerStart(2)
            store2.setSummerEnd(6)
            assert.strictEqual(store2.product.tariff.summer.months.length, 5)
        })
        it('should fill winter.month with 7 entries', function () {
            store2.setSummerStart(2)
            store2.setSummerEnd(6)
            assert.strictEqual(store2.product.tariff.winter.months.length, 7)
        })
    })
})