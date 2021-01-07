import {LEASettingsAPI} from "./LEASettingsAPI";

export class Operator {
    constructor(id, name, vseId, elcomNumber) {
        this.id = id
        this.name = name
        this.vseId = vseId
        this.elcomNumber = elcomNumber
    }
}

export class Product {
    constructor(id, operator, name, tariff, isDefault) {
        this.id = id
        this.operator = operator
        this.name = name
        this.tariff = tariff
        this.isDefault = isDefault
    }
    //TODO: Vollende diese Sache
    toJSON() {
        let JSON = {
            operator_elcom_number: this.operator.elcomNumber, //TODO: this is not correct, id != elcomNumber
            basic_fee_monthly: this.tariff.basicFeeMonthly,
            valid_from_kwh: this.tariff.validFromKwh,
            valid_to_kwh: this.tariff.validToKwh,
            name: this.name,
            municipality_fee: this.tariff.municipalityFee,
            is_default: this.isDefault,
            grid_peak_power_tariff: this.tariff.gridPeakPowerTariff,
            year: this.tariff.year,
        }
        let summer = {
            ht_end_monday: this.tariff.summer.htMondayStart,
            ht_start_monday: this.tariff.summer.htMondayEnd,
            ht_start_saturday: this.tariff.summer.htSaturdayStart,
            ht_end_saturday: this.tariff.summer.htSaturdayEnd,
            ht_start_sunday: this.tariff.summer.htSundayStart,
            ht_end_sunday: this.tariff.summer.htSundayEnd,
            ht: this.tariff.summer.highTariff,
            lt: this.tariff.summer.lowTariff,
            months: this.tariff.summer.months
        }
        let winter = {
            ht_end_monday: this.tariff.winter.htMondayStart,
            ht_start_monday: this.tariff.winter.htMondayEnd,
            ht_start_saturday: this.tariff.winter.htSaturdayStart,
            ht_end_saturday: this.tariff.winter.htSaturdayEnd,
            ht_start_sunday: this.tariff.winter.htSundayStart,
            ht_end_sunday: this.tariff.winter.htSundayEnd,
            ht: this.tariff.winter.highTariff,
            lt: this.tariff.winter.lowTariff,
            months: this.tariff.winter.months
        }
        JSON.summer = summer
        JSON.winter = winter
        return JSON
    }
}

export class Tariff {
    constructor(year, validFromKwh, validToKwh, gridPeakPowerTariff, municipalityFee, basicFeeMonthly, winter, summer, consumerType, standardTariff, kevTax) {
        this.year = year
        this.validFromKwh = validFromKwh
        this.validToKwh = validToKwh
        this.gridPeakPowerTariff = gridPeakPowerTariff //Leistungstariff
        this.municipalityFee = municipalityFee //Abgabe an Gemeinde
        this.basicFeeMonthly = basicFeeMonthly //Grundgebühr
        this.winter = winter
        this.summer = summer
        this.consumerType = consumerType
        this.standardTariff = standardTariff
        this.kevTax = kevTax
    }
}

export class SeasonalTariff {
    constructor(highTariff, lowTariff, htMondayStart, htMondayEnd, htSaturdayStart, htSaturdayEnd, htSundayStart, htSundayEnd, monthsList) {
        this.highTariff = highTariff
        this.lowTariff = lowTariff
        this.htMondayStart = htMondayStart
        this.htMondayEnd = htMondayEnd
        this.htSaturdayStart = htSaturdayStart
        this.htSaturdayEnd = htSaturdayEnd
        this.htSundayStart = htSundayStart
        this.htSundayEnd = htSundayEnd
        this.months = monthsList
    }
}

export class Months {
    months = []
    createMonthsList(start, end) {
        if (start < end) {
            for (let i = start; i <= end; i++) {
                this.pushMonth(i)
            }
        } else {
            for (let i = 1; i <= end; i++) {
                this.pushMonth(i)          }
            for (let i = start; i <=12; i++) {
                this.pushMonth(i)
            }
        }
        return this.months
    }
    pushMonth(number){
        let monthsList = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
        this.months.push({"name": monthsList[number-1], "number": number})
    }
}

// example of product creation
// let op = new Operator(123, "test")
// let summerMonths = new Months().createMonthsList(3, 9)
// let summerTariff = new SeasonalTariff(17.1, 13.3, 7, 19, 0, 0, 0, 0, summerMonths)
// let winterMonths = new Months().createMonthsList(10, 2)
// let winterTariff = new SeasonalTariff(27.1, 23.3, 8, 17, 0, 0, 0, 0, winterMonths)
// let tariff = new Tariff(2020, 0, 10000, 0.0, 0.3, 5.00, winterTariff, summerTariff)
// let pro = new Product(1, op, "tet1212", tariff, 0)
//
// console.log(pro)
// console.log(JSON.stringify(pro))
