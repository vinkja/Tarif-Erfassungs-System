import assert from 'assert'
import {describe, it, beforeEach, after} from 'mocha'
import {Operator, Product, SeasonalTariff, Tariff} from "../../app/model.js";

describe('Model', function() {
    describe('SeasonalTariff', function() {
        let seasonalTariff
        beforeEach(function() {
            seasonalTariff = new SeasonalTariff()
        })
        describe('instantiate', function () {
            it('wihtouh arguments: start should be null', function () {
                assert.equal(seasonalTariff.start, null);
            })
            it('wihtouh arguments: end should be null', function () {
                assert.equal(seasonalTariff.end, null);
            })
        })

        describe('createMonthsList', function () {
            it('start: 3 end:6 should return 4 months', function() {
                let monthsList = seasonalTariff.createMonthsList(3, 6)
                assert.equal(monthsList.length, 4);
            });

            it('start: 6 end: 2 should return 9 months', function() {
                let monthsList = seasonalTariff.createMonthsList(6, 2)
                assert.equal(monthsList.length, 9);
            })

            it('start: 1 end: 12 should return 12 months', function() {
                let monthsList = seasonalTariff.createMonthsList(1, 12)
                assert.equal(monthsList.length, 12);
            })

            it('start: 12 end: 1 should return 0 months', function() {
                let monthsList = seasonalTariff.createMonthsList(12, 1)
                assert.equal(monthsList.length, 2);
            })
            it('start: 12 end: 1 should return 0 months', function() {
                let monthsList = seasonalTariff.createMonthsList(12, 1)
                assert.equal(monthsList.length, 2);
            })
            it('start: 13 end: 0 should return 0 months', function() {
                let monthsList = seasonalTariff.createMonthsList(13, 0)
                assert.equal(monthsList.length, 0);
            })
        })

        describe('setMonths', function () {
            it('if start and end are set, months should be >0', function () {
                seasonalTariff.start = 1
                seasonalTariff.end = 3
                seasonalTariff.setMonths()
                assert.equal(seasonalTariff.months.length, 3);
            })
            it('if start is not set and end is set, months should be 0', function () {
                seasonalTariff.end = 3
                seasonalTariff.setMonths()
                assert.equal(seasonalTariff.months.length, 0);
            })
            it('if start is set and end is not set, months should be 0', function () {
                seasonalTariff.start = 3
                seasonalTariff.setMonths()
                assert.equal(seasonalTariff.months.length, 0);
            })
        })

        describe('the value is last element', function () {
            it('should return length-1', function () {
                assert.equal([2, 3, 1].indexOf(1), 2)
            })
        })
    });

    describe('Product', function() {
        let product
        let operator
        let tariff
        let winterTariff
        let summerTariff

        beforeEach(function () {
            operator = new Operator(1, "test", 13, 14)
            summerTariff = new SeasonalTariff(1,2,3,4,5,6,7, 8)
            winterTariff = new SeasonalTariff(9,8,7,6,5,4,3,2)
            tariff = new Tariff(2020, 0, 10000, 5.0, 4.5, 12.3, winterTariff, summerTariff, 1, 12.34)
            product = new Product(1, operator, "whatever", tariff)
        })
        describe('toJSON', function () {
            it('should contain a list with 11 fields', function () {
                assert.equal(Object.keys(product.toSwissJSON(true)).length, 11);
            })
            it('should contain summer list with 9 fields', function () {
                assert.equal(Object.keys(product.toSwissJSON(true).summer).length, 9);
            })
            it('should contain winter list with 9 fields', function () {
                assert.equal(Object.values(product.toSwissJSON(true).winter).length, 9);
            })
        })
    })
})