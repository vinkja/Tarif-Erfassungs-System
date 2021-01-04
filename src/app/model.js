export class Operator {
    constructor(elcomNumber, name) {
        this.elcomNumber = elcomNumber
        this.name = name
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
    toJSON() {
        let JSON = {
            operator_elcom_number: this.operator.elcomNumber,
            basic_fee_monthly: "test",
            valid_from_kwh: "test",
            name: this.name,
            municipality_fee: "test",
            is_default: this.isDefault,
            grid_peak_power_tariff: "test",
            year: "test",
            valid_to_kwh: "test"
        }

        let summer = {
            ht_end_monday: 19, // summer_high_tariff_time_mfr
            ht_start_monday: 7, //summer_high_tariff_time_mfr
            ht_start_saturday: 0, //summer_high_tariff_time_sa
            ht_end_saturday: 0, //summer_high_tariff_time_sa
            ht_start_sunday: 0, // summer_high_tariff_time_su
            ht_end_sunday: 0, //summer_high_tariff_time_su
            ht: 17.1, // summer_high_tariff
            lt: 13.3, // summer_low_tariff
            months: [{name: "Jan", number: 1},{name: "Feb", number: 2},],
        }

        let winter = {
            ht_end_monday: 19, // summer_high_tariff_time_mfr
            ht_start_monday: 7, //summer_high_tariff_time_mfr
            ht_start_saturday: 0, //summer_high_tariff_time_sa
            ht_end_saturday: 0, //summer_high_tariff_time_sa
            ht_start_sunday: 0, // summer_high_tariff_time_su
            ht_end_sunday: 0, //summer_high_tariff_time_su
            ht: 17.1, // summer_high_tariff
            lt: 13.3, // summer_low_tariff
        }
        JSON.summer = summer
        JSON.winter = winter
        return JSON
    }
}

export class Tariff {
    constructor(year, validFromKwh, validToKwh, gridPeakPowerTariff, municipalityFee, basicFeeMonthly, winter, summer) {
        this.year = year
        this.validFromKwh = validFromKwh
        this.validToKwh = validToKwh
        this.gridPeakPowerTariff = gridPeakPowerTariff //Leistungstariff
        this.municipalityFee = municipalityFee //Abgabe an Gemeinde
        this.basicFeeMonthly = basicFeeMonthly //Grundgebühr
        this.winter = winter
        this.summer = summer
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

class Months {
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
        let monthName = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
        this.months.push({"name": monthName[number-1], "number": number})
    }
}

// example of product creation
// let op = new Operator(123, "test")
// let summerMonths = new Months().createMonthsList(3, 9)
// let summerTariff = new SeasonalTariff(17.1, 13.3, 7, 19, 0, 0, 0, 0, summerMonths)
// let winterMonths = new Months().createMonthsList(10, 2)
// let winterTariff = new SeasonalTariff(27.1, 23.3, 8, 17, 0, 0, 0, 0, winterMonths)
// let tariff = new Tariff(2020, 0, 10000, 0.0, 0.3, 5.00, winterTariff, summerTariff)
// let pro = new Product(op, "tet1212", tariff, 0)
//
// console.log(pro)
// console.log(JSON.stringify(pro))
//
