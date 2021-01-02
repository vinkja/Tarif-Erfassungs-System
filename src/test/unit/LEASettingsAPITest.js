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
                assert.equal(typeof operators[0], typeof new Operator)
            })
            it('first Operator should have a id', function() {
                assert.ok(operators[0].id)
            })
            it('first Operator should have a name', function() {
                assert.ok(operators[0].name)
            })
        })
        describe('second call getOperators', function () {
            it ('should still return an object which is not null', async function() {
                operators = await api.getOperators()
                assert.ok(operators)
            })
        })
    })
})