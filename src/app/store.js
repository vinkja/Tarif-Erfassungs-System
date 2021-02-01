import {Operator, Product, SeasonalTariff, Tariff} from "./model.js";
import {LEASettingsAPI} from "./LEASettingsAPI.js";

export class Store {
    operators
    api
    product
    winterTariffSelected
    constructor(serverUrl) {
        this.operators = []
        this.api = new LEASettingsAPI(serverUrl)
        this.winterTariffSelected = false
    }

    createProduct() {
        this.product = new Product(null,
            new Operator(),
            null,
            this.tariff = new Tariff(new Date().getFullYear(),
                0,
                10000,
                0,
                0,
                0,
                new SeasonalTariff(null, null, 0, 24, 0, 24, 0, 24),
                new SeasonalTariff(null, null, 0, 24, 0, 24, 0, 24),
                1,
                1,
                0),
            null)
    }

    setWinterTariffSelected(winterTariffSelected){
        if (winterTariffSelected === false) {
            this.winterTariffSelected = false
        }
        else {
            this.winterTariffSelected = true
        }
    }

    async loadOperators() {
        this.operators = await this.api.getOperators()
    }

    getOperators() {
        return this.operators
    }

    setOperator(operatorId) {
        this.operators.forEach(lookUpOperator => {
            if(lookUpOperator.id === operatorId) {
                this.product.operator.id = lookUpOperator.id
                this.product.operator.name = lookUpOperator.name
                this.product.operator.vseId = lookUpOperator.vseId
                this.product.operator.elcomNumber = lookUpOperator.elcomNumber
            }
        })
        return this.product.operator
    }

    setProductName(productName) {
        this.product.name = productName
    }

    setTariffYear(tariffYear) {
        this.product.tariff.year = tariffYear
    }

    setBasicFeeMonthly(basicFeeMonthly) {
        this.product.tariff.basicFeeMonthly = basicFeeMonthly
    }

    setGridPeakPowerTariff(gridPeakPowerTariff) {
        this.product.tariff.gridPeakPowerTariff = gridPeakPowerTariff
    }

    setValidFromKwh(validFromKwh) {
        this.product.tariff.validFromKwh = validFromKwh
    }

    setValidToKwh(validToKwh) {
        this.product.tariff.validToKwh = validToKwh
    }

    setConsumerType(consumerType) {
        this.product.tariff.consumerType = consumerType
    }

    setMunicipalityFee(municipalityFee) {
        this.product.tariff.municipalityFee = municipalityFee
    }

    setIsDefault(isDefault) {
        this.product.tariff.isDefault= isDefault
    }

    setKevTax(kevTax) {
        this.product.tariff.kevTax = kevTax
    }

    setSummerStart(start) {
        this.product.tariff.summer.start = start
        this.product.tariff.winter.end = start -1
        this.product.tariff.summer.setMonths()
        this.product.tariff.winter.setMonths()
    }

    setSummerEnd(end) {
        this.product.tariff.summer.end = end
        this.product.tariff.winter.start = end +1
        this.product.tariff.summer.setMonths()
        this.product.tariff.winter.setMonths()
    }

    setSummerMondayStart(summerMondayStart) {
        this.product.tariff.summer.htMondayStart = summerMondayStart
    }

    setSummerMondayEnd(summerMondayEnd) {
        this.product.tariff.summer.htMondayEnd = summerMondayEnd
    }

    setSummerSaturdayStart(summerSaturdayStart) {
        this.product.tariff.summer.htSaturdayStart = summerSaturdayStart
    }

    setSummerSaturdayEnd(summerSaturdayEnd) {
        this.product.tariff.summer.htSaturdayEnd = summerSaturdayEnd
    }

    setSummerSundayStart(summerSundayStart) {
        this.product.tariff.summer.htSundayStart = summerSundayStart
    }

    setSummerSundayEnd(summerSundayEnd) {
        this.product.tariff.summer.htSundayEnd = summerSundayEnd
    }

    setSummerHighTariff(summerHighTariff) {
        this.product.tariff.summer.highTariff = summerHighTariff
    }

    setSummerLowTariff(summerLowTariff) {
        this.product.tariff.summer.lowTariff = summerLowTariff
    }

    setWinterMondayStart(winterMondayStart) {
        this.product.tariff.winter.htMondayStart = winterMondayStart
    }

    setWinterMondayEnd(winterMondayEnd) {
        this.product.tariff.winter.htMondayEnd = winterMondayEnd
    }

    setWinterSaturdayStart(winterSaturdayStart) {
        this.product.tariff.winter.htSaturdayStart = winterSaturdayStart
    }

    setWinterSaturdayEnd(winterSaturdayEnd) {
        this.product.tariff.winter.htSaturdayEnd = winterSaturdayEnd
    }

    setWinterSundayStart(winterSundayStart) {
        this.product.tariff.winter.htSundayStart = winterSundayStart
    }

    setWinterSundayEnd(winterSundayEnd) {
        this.product.tariff.winter.htSundayEnd = winterSundayEnd
    }

    setWinterHighTariff(winterHighTariff) {
        this.product.tariff.winter.highTariff = winterHighTariff
    }

    setWinterLowTariff(winterLowTariff) {
        this.product.tariff.winter.lowTariff = winterLowTariff
    }
}