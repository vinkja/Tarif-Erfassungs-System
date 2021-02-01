import assert from 'assert'
import {describe, it, beforeEach, after} from 'mocha'
import {Helper} from "../../app/helper.js";

describe('Helper', function () {
    let helper
    beforeEach(function () {
        helper = new Helper()
    })
    describe('add two numbers', function () {
        it('should add 5 and 5', function () {
            assert.equal(helper.add(5,5), 10);
        })
    })
})