export class Operator {
    constructor(id, name, vseId, elcomNumber) {
        this.id = id
        this.name = name
        this.vseId = vseId
        this.elcomNumber = elcomNumber
    }
}

export class Product {
    constructor(id, operator, name, tariff) {
        this.id = id
        this.operator = operator
        this.name = name
        this.tariff = tariff
    }

    toSwissJSON(winterTariffSelected) {
        let JSON = {
            "utility_id": this.operator.id,
            "operator_elcom_number": this.operator.elcomNumber,
            "basic_fee_monthly": this.tariff.basicFeeMonthly,
            "valid_from_kwh": this.tariff.validFromKwh,
            "valid_to_kwh": this.tariff.validToKwh,
            "name": this.name,
            "municipality_fee": this.tariff.municipalityFee,
            "is_default": this.tariff.isDefault,
            "grid_peak_power_tariff": this.tariff.gridPeakPowerTariff,
            "year": this.tariff.year,
        }
        let summer = {
            "ht_start_monday": this.tariff.summer.htMondayStart,
            "ht_end_monday": this.tariff.summer.htMondayEnd,
            "ht_start_saturday": this.tariff.summer.htSaturdayStart,
            "ht_end_saturday": this.tariff.summer.htSaturdayEnd,
            "ht_start_sunday": this.tariff.summer.htSundayStart,
            "ht_end_sunday": this.tariff.summer.htSundayEnd,
            "ht": this.tariff.summer.highTariff,
            "lt": this.tariff.summer.lowTariff,
            "months": this.tariff.summer.months
        }
        let winter = {
            "ht_end_monday": this.tariff.winter.htMondayStart,
            "ht_start_monday": this.tariff.winter.htMondayEnd,
            "ht_start_saturday": this.tariff.winter.htSaturdayStart,
            "ht_end_saturday": this.tariff.winter.htSaturdayEnd,
            "ht_start_sunday": this.tariff.winter.htSundayStart,
            "ht_end_sunday": this.tariff.winter.htSundayEnd,
            "ht": this.tariff.winter.highTariff,
            "lt": this.tariff.winter.lowTariff,
            "months": this.tariff.winter.months
        }
        JSON.summer = summer
        if (winterTariffSelected === true) {
            JSON.winter = winter
        }
        return JSON
    }

    getTariff(season, day, hour) {
        let seasonTariff
        if (season == "summer") {
            seasonTariff = this.tariff.summer
        } else if (season == "winter") {
            seasonTariff = this.tariff.winter
        }

        let start, end
        if (day === 6) {
            start = seasonTariff.htSaturdayStart
            end = seasonTariff.htSaturdayEnd
        } else if (day === 7) {
            start = seasonTariff.htSundayStart
            end = seasonTariff.htSundayEnd
        } else {
            start = seasonTariff.htMondayStart
            end = seasonTariff.htMondayEnd
        }
        if (hour >=start && hour < end) {
            return seasonTariff.highTariff
        } else if (hour < start || hour >= end) {
            return seasonTariff.lowTariff
        }
    }
}



export class Tariff {
    constructor(year, validFromKwh, validToKwh, gridPeakPowerTariff, municipalityFee, basicFeeMonthly, winter, summer, consumerType, isDefault, kevTax) {
        this.year = year
        this.validFromKwh = validFromKwh
        this.validToKwh = validToKwh
        this.gridPeakPowerTariff = gridPeakPowerTariff
        this.municipalityFee = municipalityFee
        this.basicFeeMonthly = basicFeeMonthly
        this.winter = winter
        this.summer = summer
        this.consumerType = consumerType
        this.isDefault = isDefault
        this.kevTax = kevTax
    }
}

export class SeasonalTariff {
    constructor(highTariff, lowTariff, htMondayStart, htMondayEnd, htSaturdayStart, htSaturdayEnd, htSundayStart, htSundayEnd, start, end) {
        this.highTariff = highTariff
        this.lowTariff = lowTariff
        this.htMondayStart = htMondayStart
        this.htMondayEnd = htMondayEnd
        this.htSaturdayStart = htSaturdayStart
        this.htSaturdayEnd = htSaturdayEnd
        this.htSundayStart = htSundayStart
        this.htSundayEnd = htSundayEnd
        this.start = start
        this.end = end
        this.months = []
    }
    setMonths() {
        if (this.start !== null && this.end !== null) {
            this.months = this.createMonthsList(this.start, this.end)
        }
    }

    createMonthsList(start, end) {
        let months = []
        if (start != null && end != null) {
            if (start < end) {
                for (let i = start; i <= end; i++) {
                    pushMonth(i)
                }
            } else {
                for (let i = 1; i <= end; i++) {
                    pushMonth(i)
                }
                for (let i = start; i <=12; i++) {
                    pushMonth(i)
                }
            }
        }
        return months

        function pushMonth(number) {
            let monthsList = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
            months.push({"name": monthsList[number-1], "number": number})
        }

    }
}
