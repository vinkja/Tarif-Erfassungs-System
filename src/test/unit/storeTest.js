import assert from 'assert'
import chai from 'chai'
import {describe, it, beforeEach, after} from 'mocha'
import {Store} from "../../app/store.js";

describe('Store', function() {
    let store
    beforeEach(function() {
        store = new Store('test')
    })
    describe('instantiate', function() {
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
    // let store2
    // beforeEach(function() {
    //     store2 = new Store()
    // })
    // describe('laodOperators', function() {
    //     it('fill up operatorList', async function () {
    //         await store2.loadOperators()
    //         assert.equal(store.operator.length, 0);
    //     })
    //     it('should create a api with URL: test', function () {
    //         chai.expect(store.operator).to.be.a('Object')
    //     })
    //     it('should create a empty operator', function () {
    //         assert.equal(store.operator, 'test');
    //     })
    // })

})