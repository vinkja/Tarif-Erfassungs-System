import {Months, Operator, Product, SeasonalTariff, Tariff} from "./model";
import {LEASettingsAPI} from "./LEASettingsAPI";

export class Store {
    summerStart
    summerEnd
    constructor(serverUrl) {
        this.operators = []
        this.api = new LEASettingsAPI(serverUrl)
        this.operator = new Operator
        this.summerMonths = new Months().createMonthsList(null, null)
        this.summerTariff = new SeasonalTariff(null, null, null, null, null, null, null, null, this.summerMonths)
        this.winterMonths = new Months().createMonthsList(null, null)
        this.winterTariff = new SeasonalTariff(null, null, null, null, null, null, null, null, this.winterMonths)
        this.tariff = new Tariff(null, null, null, null, null, null, this.winterTariff, this.summerTariff, null, null, null)
        this.product = new Product(null, this.operator, null, this.tariff, null)
    }

    async loadOperators() {
        this.operators = await this.api.loadOperators()
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

    setStandardTariff(standardTariff) {
        this.tariff.standardTariff = standardTariff
        console.log(this.product)
    }

    setKevTax(kevTax) {
        this.tariff.kevTax = kevTax
        console.log(this.product)
    }

    setSummerStart(summerStart) {
        this.summerStart = summerStart
        this.summerMonths.createMonthsList(this.summerStart, this.summerEnd)
        console.log(this.summerTariff)
    }

    setSummerEnd(summerEnd) {
        this.summerEnd = summerEnd
        this.summerMonths.createMonthsList(this.summerStart, this.summerEnd)
        console.log(this.summerTariff)
    }

    setSummerMondayStart(summerMondayStart) {
        this.summerTariff.htMondayStart = summerMondayStart
        console.log(this.summerTariff)
    }

    setSummerMondayEnd(summerMondayEnd) {
        this.summerTariff.htMondayEnd = summerMondayEnd
        console.log(this.summerTariff)
    }

    setSummerSaturdayStart(summerSaturdayStart) {
        this.summerTariff.htSaturdayStart = summerSaturdayStart
        console.log(this.summerTariff)
    }

    setSummerSaturdayEnd(summerSaturdayEnd) {
        this.summerTariff.htSaturdayEnd = summerSaturdayEnd
        console.log(this.summerTariff)
    }

    setSummerSundayStart(summerSundayStart) {
        this.summerTariff.htSundayStart = summerSundayStart
        console.log(this.summerTariff)
    }

    setSummerSundayEnd(summerSundayEnd) {
        this.summerTariff.htSundayEnd = summerSundayEnd
        console.log(this.summerTariff)
    }

    setSummerHighTariff(summerHighTariff) {
        this.summerTariff.highTariff = summerHighTariff
        console.log(this.summerTariff)
    }

    setSummerLowTariff(summerLowTariff) {
        this.summerTariff.lowTariff = summerLowTariff
        console.log(this.summerTariff)
    }
}