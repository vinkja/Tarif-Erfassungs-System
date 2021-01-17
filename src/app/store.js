import {Operator, Product, SeasonalTariff, Tariff} from "./model.js";
import {LEASettingsAPI} from "./LEASettingsAPI.js";

export class Store {
    constructor(serverUrl) {
        this.operators = []
        this.api = new LEASettingsAPI(serverUrl)
        this.operator = new Operator()
        this.summerTariff = new SeasonalTariff(null, null, 0, 24, 0, 24, 0, 24)
        this.winterTariff = new SeasonalTariff(null, null, 0, 24, 0, 24, 0, 24)
        this.tariff = new Tariff(new Date().getFullYear(), 0, 10000, null, null, null, this.winterTariff, this.summerTariff, 1, 1, null)
        this.product = new Product(null, this.operator, null, this.tariff, null)
    }

    async loadOperators() {
        this.operators = await this.api.getOperators()
        this.operator = this.operators[0]
    }

    getOperators() {
        return this.operators
    }

    setOperator(operatorId) {
        this.operators.forEach(lookUpOperator => {
            if(lookUpOperator.id === operatorId) {
                this.operator.id = lookUpOperator.id
                this.operator.name = lookUpOperator.name
                this.operator.vseId = lookUpOperator.vseId
                this.operator.elcomNumber = lookUpOperator.elcomNumber
            }
        })
        console.log(this.product)
        return this.operator
    }

    setProductName(productName) {
        this.product.name = productName
        console.log(this.product)
    }

    setTariffYear(tariffYear) {
        this.tariff.year = tariffYear
        console.log(this.product)
    }

    setBasicFeeMonthly(basicFeeMonthly) {
        this.tariff.basicFeeMonthly = basicFeeMonthly
        console.log(this.product)
    }

    setGridPeakPowerTariff(gridPeakPowerTariff) {
        this.tariff.gridPeakPowerTariff = gridPeakPowerTariff
        console.log(this.product)
    }

    setValidFromKwh(validFromKwh) {
        this.tariff.validFromKwh = validFromKwh
        console.log(this.product)
    }

    setValidToKwh(validToKwh) {
        this.tariff.validToKwh = validToKwh
        console.log(this.product)
    }

    setConsumerType(consumerType) {
        this.tariff.consumerType = consumerType
        console.log(this.product)
    }

    setMunicipalityFee(municipalityFee) {
        this.tariff.municipalityFee = municipalityFee
        console.log(this.product)
    }

    setIsDefault(isDefault) {
        this.tariff.isDefault= isDefault
        console.log(this.product)
    }

    setKevTax(kevTax) {
        this.tariff.kevTax = kevTax
        console.log(this.product)
    }

    setSummerStart(start) {
        this.summerTariff.start = start
        this.winterTariff.end = start -1
        this.summerTariff.setMonths()
        this.winterTariff.setMonths()
        console.log(this.product)
    }

    setSummerEnd(end) {
        this.summerTariff.end = end
        this.winterTariff.start = end +1
        this.summerTariff.setMonths()
        this.winterTariff.setMonths()
        console.log(this.product)
    }

    setSummerMondayStart(summerMondayStart) {
        this.summerTariff.htMondayStart = summerMondayStart
        console.log(this.product)
    }

    setSummerMondayEnd(summerMondayEnd) {
        this.summerTariff.htMondayEnd = summerMondayEnd
        console.log(this.product)
    }

    setSummerSaturdayStart(summerSaturdayStart) {
        this.summerTariff.htSaturdayStart = summerSaturdayStart
        console.log(this.product)
    }

    setSummerSaturdayEnd(summerSaturdayEnd) {
        this.summerTariff.htSaturdayEnd = summerSaturdayEnd
        console.log(this.product)
    }

    setSummerSundayStart(summerSundayStart) {
        this.summerTariff.htSundayStart = summerSundayStart
        console.log(this.product)
    }

    setSummerSundayEnd(summerSundayEnd) {
        this.summerTariff.htSundayEnd = summerSundayEnd
        console.log(this.product)
    }

    setSummerHighTariff(summerHighTariff) {
        this.summerTariff.highTariff = summerHighTariff
        console.log(this.product)
    }

    setSummerLowTariff(summerLowTariff) {
        this.summerTariff.lowTariff = summerLowTariff
        console.log(this.product)
    }

    setWinterMondayStart(winterMondayStart) {
        this.winterTariff.htMondayStart = winterMondayStart
        console.log(this.product)
    }

    setWinterMondayEnd(winterMondayEnd) {
        this.winterTariff.htMondayEnd = winterMondayEnd
        console.log(this.product)
    }

    setWinterSaturdayStart(winterSaturdayStart) {
        this.winterTariff.htSaturdayStart = winterSaturdayStart
        console.log(this.product)
    }

    setWinterSaturdayEnd(winterSaturdayEnd) {
        this.winterTariff.htSaturdayEnd = winterSaturdayEnd
        console.log(this.product)
    }

    setWinterSundayStart(winterSundayStart) {
        this.winterTariff.htSundayStart = winterSundayStart
        console.log(this.product)
    }

    setWinterSundayEnd(winterSundayEnd) {
        this.winterTariff.htSundayEnd = winterSundayEnd
        console.log(this.product)
    }

    setWinterHighTariff(winterHighTariff) {
        this.winterTariff.highTariff = winterHighTariff
        console.log(this.product)
    }

    setWinterLowTariff(winterLowTariff) {
        this.winterTariff.lowTariff = winterLowTariff
        console.log(this.product)
    }
}