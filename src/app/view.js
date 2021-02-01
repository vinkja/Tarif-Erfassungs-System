import {Helper} from "./helper";

const noop = () => {}
const $ = (field) => document.getElementById(field)
const onAddOperator = Symbol()
const onAddProductName = Symbol()
const onAddTariffYear = Symbol()
const onAddBasicFeeMonthly = Symbol()
const onAddGridPeakPowerTariff = Symbol()
const onAddValidFromKwh = Symbol()
const onAddValidToKwh = Symbol()
const onAddConsumerType = Symbol()
const onAddMunicipalityFee = Symbol()
const onAddIsDefault = Symbol()
const onAddKevTax = Symbol()
const onAddSummerStart = Symbol()
const onAddSummerEnd = Symbol()
const onAddSummerMondayStart = Symbol()
const onAddSummerMondayEnd = Symbol()
const onAddSummerSaturdayStart = Symbol()
const onAddSummerSaturdayEnd= Symbol()
const onAddSummerSundayStart = Symbol()
const onAddSummerSundayEnd = Symbol()
const onAddSummerHighTariff = Symbol()
const onAddSummerLowTariff = Symbol()
const onAddWinterMondayStart = Symbol()
const onAddWinterMondayEnd = Symbol()
const onAddWinterSaturdayStart = Symbol()
const onAddWinterSaturdayEnd= Symbol()
const onAddWinterSundayStart = Symbol()
const onAddWinterSundayEnd = Symbol()
const onAddWinterHighTariff = Symbol()
const onAddWinterLowTariff = Symbol()
const onClickSubmitButton = Symbol()
const onSelectWinterTimes = Symbol()

export const events = {
    onAddOperator: "called when Energieversorger is chosen",
    onAddProductName: "called when Stromprodukt is set",
    onAddTariffYear: "called when Jahr is chosen",
    onAddBasicFeeMonthly: "called when Grundgebühr is set",
    onAddGridPeakPowerTariff: "called when Leistungstarif is set",
    onAddValidFromKwh: "called when Gültigkeit von von kwH is set",
    onAddValidToKwh: "called when Gültigkeit bis kwH is set",
    onAddConsumerType: "called when Verbrauchertypis set",
    onAddMunicipalityFee: "called when Gemeindeabgaben is set",
    onAddIsDefault: "called when Standardtarif is set",
    onAddKevTax: "called when KEVis set",
    onAddSummerStart: "called when Sommerbeginn is chosen",
    onAddSummerEnd: "called when Sommerende is chosen",
    onAddSummerMondayStart: "called when Sommer Montag Hochtarif Start is chosen",
    onAddSummerMondayEnd: "called when Sommer Montag Hochtarif Ende is chosen",
    onAddSummerSaturdayStart: "called when Sommer Samstag Hochtarif Start is chosen",
    onAddSummerSaturdayEnd: "called when Sommer Samstag Hochtarif Ende is chosen",
    onAddSummerSundayStart: "called when Sommer Sonntag Hochtarif Start is chosen",
    onAddSummerSundayEnd: "called when Sommer Sonntag Hochtarif Ende is chosen",
    onAddSummerHighTariff: "called when Sommer Hochtarif is set",
    onAddSummerLowTariff: "called when Sommer Niedertarif is set",
    onAddWinterMondayStart: "called when Winter Montag Hochtarif Start is chosen",
    onAddWinterMondayEnd: "called when Winter Montag Hochtarif Ende is chosen",
    onAddWinterSaturdayStart: "called when Winter Samstag Hochtarif Start is chosen",
    onAddWinterSaturdayEnd: "called when Winter Samstag Hochtarif Ende is chosen",
    onAddWinterSundayStart: "called when Winter Sonntag Hochtarif Start is chosen",
    onAddWinterSundayEnd: "called when Winter Sonntag Hochtarif Ende is chosen",
    onAddWinterHighTariff: "called when Winter Hochtarif is set",
    onAddWinterLowTariff: "called when Winter Niedertarif is set",
    onClickSubmitButton: "called when Submit is clicked",
    onSelectWinterTimes: "called when summer and wintertariffs"
}

export class View {
    constructor() {
        this.helper = new Helper();
        this.eventHandlers = {
            [events.onAddOperator]: noop,
            [events.onAddProductName]: noop,
            [events.onAddTariffYear]: noop,
            [events.onAddBasicFeeMonthly]: noop,
            [events.onAddGridPeakPowerTariff]: noop,
            [events.onAddValidFromKwh]: noop,
            [events.onAddValidToKwh]: noop,
            [events.onAddConsumerType]: noop,
            [events.onAddMunicipalityFee]: noop,
            [events.onAddIsDefault]: noop,
            [events.onAddKevTax]: noop,
            [events.onAddSummerStart]: noop,
            [events.onAddSummerEnd]: noop,
            [events.onAddSummerMondayStart]: noop,
            [events.onAddSummerMondayEnd]: noop,
            [events.onAddSummerSaturdayStart]: noop,
            [events.onAddSummerSaturdayEnd]: noop,
            [events.onAddSummerSundayStart]: noop,
            [events.onAddSummerSundayEnd]: noop,
            [events.onAddSummerHighTariff]: noop,
            [events.onAddSummerLowTariff]: noop,
            [events.onAddWinterMondayStart]: noop,
            [events.onAddWinterMondayEnd]: noop,
            [events.onAddWinterSaturdayStart]: noop,
            [events.onAddWinterSaturdayEnd]: noop,
            [events.onAddWinterSundayStart]: noop,
            [events.onAddWinterSundayEnd]: noop,
            [events.onAddWinterHighTariff]: noop,
            [events.onAddWinterLowTariff]: noop,
            [events.onClickSubmitButton]: noop,
            [events.onSelectWinterTimes]: noop,
        }
        this.bindEvents()
    }

    renderTables(product, winterTariffSelected) {

        let summerTable = $("summerTable")
        this.removeAllChildren(summerTable)
        summerTable.appendChild(tableHead())

        let winterTable = $("winterTable")
        this.removeAllChildren(winterTable)
        winterTable.appendChild(tableHead())

        for (let hour = 0; hour < 24; hour ++) {
            summerTable.appendChild(tableBody("summer", hour))
            if (winterTariffSelected === true) {
                winterTable.appendChild(tableBody("winter", hour))
            }
        }
        this.colorTableFields()

        function tableBody(season, hour) {
            let tbody = document.createElement("tbody")
            let tr = document.createElement("tr")
            let time = document.createElement("th")
            time.scope = "row"
            time.innerHTML = hour + ":00"
            tr.appendChild(time)
            for (let day = 1; day <= 7; day++) {
                let td = document.createElement("td")
                td.innerHTML = product.getTariff(season, day, hour)
                tr.appendChild(td)
            }
            tbody.appendChild(tr)
            return tbody
        }
        function tableHead() {
            let thead = document.createElement("thead")
            let trTitle = document.createElement("tr")
            let thEmpty = document.createElement("th")
            trTitle.appendChild(thEmpty)
            let weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
            weekDays.forEach(day => {
                let th = document.createElement("th")
                th.innerHTML = day
                trTitle.appendChild(th)
            })
            thead.appendChild(trTitle)
            return thead
        }
    }

    colorTableFields() {
        let summerTable = document.querySelector('#summerTable')
        let tdSummerElements = summerTable.getElementsByTagName("td")
        let winterTable = document.querySelector('#winterTable')
        let tdWinterElements = winterTable.getElementsByTagName("td")
        colorFields(tdSummerElements)
        colorFields(tdWinterElements)

        function colorFields(tdElements) {
            let highTariff = 0
            for (let tdElement of tdElements) {
                if (Number(tdElement.innerHTML) > highTariff) {
                    highTariff = Number(tdElement.innerHTML)
                }
            }
            for (let tdElement of tdElements) {
                if (Number(tdElement.innerHTML) === highTariff) {
                    tdElement.style.backgroundColor = "white"
                }
            }
        }
    }

    removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    registerEventHandlers(handlers) {
        for (let event in handlers){
            if(this.eventHandlers[event]){
                this.eventHandlers[event] = handlers[event]
            }
        }
    }

    EnterKeyToNextField() {
        document.addEventListener('keydown', function (event){
            let isFormField = event.target.nodeName === 'INPUT' || event.target.nodeName === 'SELECT'
            if (event.code === "Enter" && isFormField) {
                let form = event.target.form;
                let index = Array.prototype.indexOf.call(form, event.target);
                form.elements[index + 1].focus();
                event.preventDefault();
                return false;
            }
        })
    }

    renderOperator(operator) {
        let elcomNumber = $("operator_elcom_number");
        let vseId = $("vse-id")
        elcomNumber.innerHTML = operator.elcomNumber
        vseId.innerHTML = operator.vseId
    }

    addOperatorsToList(operators) {
        let mainContainer = $("energieversoger");
        operators.forEach(operator => {
            let option = document.createElement("option");
            option.innerHTML = operator.name;
            option.value = operator.id;
            mainContainer.appendChild(option);
        })
    }

    addYearstoList() {
        let actualYear = new Date().getFullYear();
        let maxDate = actualYear + 1;
        let select = $('year');
        for (let i = actualYear; i <= maxDate; i++) {
            let opt = document.createElement('option');
            opt.innerHTML = i;
            select.appendChild(opt);
        }
    }


    addMonthsToList(element) {
        let month = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        let monthDropdown = $(element)
        for (let i = 0; i < 12; i++) {
            let option = document.createElement('option');
            option.innerHTML = month[i];
            option.value = String((i + 1))
            monthDropdown.appendChild(option);
        }
    }

    addHoursToList() {
        let endTimes = ["ht_end_monday_summer", "ht_end_saturday_summer", "ht_end_sunday_summer",
        "ht_end_monday_winter", "ht_end_saturday_winter", "ht_end_sunday_winter"]
        let hourElements = document.getElementsByClassName("hours_select")
        for (let hourElement of hourElements) {
            for (let hour = 0; hour < 25; hour++) {
                let option = document.createElement('option')
                option.innerHTML = String(hour + ":00")
                option.value = String(hour)
                hourElement.appendChild(option)
            }
            if (endTimes.includes(hourElement.id )) {
                hourElement.value = 24
            }
        }
    }

    [onSelectWinterTimes](){
        return this.eventHandlers[events.onSelectWinterTimes]()
    }
    [onAddOperator](operatorId) {
        return this.eventHandlers[events.onAddOperator](operatorId)
    }
    [onAddProductName](productName) {
        return this.eventHandlers[events.onAddProductName](productName)
    }
    [onAddTariffYear](tariffYear) {
        return this.eventHandlers[events.onAddTariffYear](tariffYear)
    }

    [onAddBasicFeeMonthly](basicFeeMonthly) {
        return this.eventHandlers[events.onAddBasicFeeMonthly](basicFeeMonthly)
    }
    [onAddGridPeakPowerTariff](gridPeakPowerTariff) {
        return this.eventHandlers[events.onAddGridPeakPowerTariff](gridPeakPowerTariff)
    }
    [onAddValidFromKwh](validFromKwh) {
        return this.eventHandlers[events.onAddValidFromKwh](validFromKwh)
    }
    [onAddValidToKwh](validToKwh) {
        return this.eventHandlers[events.onAddValidToKwh](validToKwh)
    }
    [onAddConsumerType](consumerType) {
        return this.eventHandlers[events.onAddConsumerType](consumerType)
    }
    [onAddMunicipalityFee](municipalityFee) {
        return this.eventHandlers[events.onAddMunicipalityFee](municipalityFee)
    }
    [onAddIsDefault](isDefault) {
        return this.eventHandlers[events.onAddIsDefault](isDefault)
    }
    [onAddKevTax](kevTax) {
        return this.eventHandlers[events.onAddKevTax](kevTax)
    }
    [onAddSummerStart](summerStart){
        return this.eventHandlers[events.onAddSummerStart](summerStart)
    }
    [onAddSummerEnd](summerEnd){
        return this.eventHandlers[events.onAddSummerEnd](summerEnd)
    }
    [onAddSummerMondayStart](SummerMondayStart){
        return this.eventHandlers[events.onAddSummerMondayStart](SummerMondayStart)
    }
    [onAddSummerMondayEnd](SummerMondayEnd){
        return this.eventHandlers[events.onAddSummerMondayEnd](SummerMondayEnd)
    }
    [onAddSummerSaturdayStart](SummerSaturdayStart){
        return this.eventHandlers[events.onAddSummerSaturdayStart](SummerSaturdayStart)
    }
    [onAddSummerSaturdayEnd](SummerSaturdayEnd){
        return this.eventHandlers[events.onAddSummerSaturdayEnd](SummerSaturdayEnd)
    }
    [onAddSummerSundayStart](SummerSundayStart){
        return this.eventHandlers[events.onAddSummerSundayStart](SummerSundayStart)
    }
    [onAddSummerSundayEnd](SummerSundayEnd){
        return this.eventHandlers[events.onAddSummerSundayEnd](SummerSundayEnd)
    }
    [onAddSummerHighTariff](summerHighTariff){
        return this.eventHandlers[events.onAddSummerHighTariff](summerHighTariff)
    }
    [onAddSummerLowTariff](summerLowTariff){
        return this.eventHandlers[events.onAddSummerLowTariff](summerLowTariff)
    }
    [onAddWinterMondayStart](WinterMondayStart){
        return this.eventHandlers[events.onAddWinterMondayStart](WinterMondayStart)
    }
    [onAddWinterMondayEnd](WinterMondayEnd){
        return this.eventHandlers[events.onAddWinterMondayEnd](WinterMondayEnd)
    }
    [onAddWinterSaturdayStart](WinterSaturdayStart){
        return this.eventHandlers[events.onAddWinterSaturdayStart](WinterSaturdayStart)
    }
    [onAddWinterSaturdayEnd](WinterSaturdayEnd){
        return this.eventHandlers[events.onAddWinterSaturdayEnd](WinterSaturdayEnd)
    }
    [onAddWinterSundayStart](WinterSundayStart){
        return this.eventHandlers[events.onAddWinterSundayStart](WinterSundayStart)
    }
    [onAddWinterSundayEnd](WinterSundayEnd){
        return this.eventHandlers[events.onAddWinterSundayEnd](WinterSundayEnd)
    }
    [onAddWinterHighTariff](WinterHighTariff){
        return this.eventHandlers[events.onAddWinterHighTariff](WinterHighTariff)
    }
    [onAddWinterLowTariff](WinterLowTariff){
        return this.eventHandlers[events.onAddWinterLowTariff](WinterLowTariff)
    }
    [onClickSubmitButton](){
        return this.eventHandlers[events.onClickSubmitButton]()
    }


    calculateSummerHTTotal() {
        let summerEnergyHT = $("summerEnergyHT").value;
        let summerNetHT = $("summerNetHT").value;
        let additionEnergyNetSummerHTResult = this.helper.add(summerEnergyHT, summerNetHT)
        $("totalSummerHT").innerText = additionEnergyNetSummerHTResult;
        this[onAddSummerHighTariff](additionEnergyNetSummerHTResult)
    }

    calculateSummerNTTotal() {
        let summerEnergyNT = $("summerEnergyNT").value;
        let summerNetNT = $("summerNetNT").value;
        let additionEnergyNetSummerNTResult = this.helper.add(summerEnergyNT, summerNetNT)
        $("totalSummerNT").innerText = additionEnergyNetSummerNTResult;
        this[onAddSummerLowTariff](additionEnergyNetSummerNTResult)
    }

    calculateWinterHTTotal() {
        let winterEnergyHT = $("winterEnergyHT").value;
        let winterNetHT = $("winterNetHT").value;
        let additionEnergyNetWinterHTResult = this.helper.add(winterEnergyHT, winterNetHT)
        $("totalWinterHT").innerText = additionEnergyNetWinterHTResult;
        this[onAddWinterHighTariff](additionEnergyNetWinterHTResult)
    }

    calculateWinterNTTotal() {
        let winterEnergyNT = $("winterEnergyNT").value;
        let winterNetNT = $("winterNetNT").value;
        let additionEnergyNetWinterNTResult = this.helper.add(winterEnergyNT, winterNetNT)
        $("totalWinterNT").innerText = additionEnergyNetWinterNTResult;
        this[onAddWinterLowTariff](additionEnergyNetWinterNTResult)
    }

    bindEvents() {
        $("summerEnergyHT").addEventListener('change', () => this.calculateSummerHTTotal())
        $("summerNetHT").addEventListener('change', () => this.calculateSummerHTTotal())
        $("summerEnergyNT").addEventListener('change', () => this.calculateSummerNTTotal())
        $("summerNetNT").addEventListener('change', () => this.calculateSummerNTTotal())
        $("winterEnergyHT").addEventListener('change', () => this.calculateWinterHTTotal())
        $("winterNetHT").addEventListener('change', () => this.calculateWinterHTTotal())
        $("winterEnergyNT").addEventListener('change', () => this.calculateWinterNTTotal())
        $("winterNetNT").addEventListener('change', () => this.calculateWinterNTTotal())

        $("winterTariffsCheck").addEventListener('change', ({target}) => {
            if (target.checked) {
                $('yearSpecification').hidden = false
                $('winterTimes').hidden = false
                $('winterTariffs').hidden = false
            }
            else {
                $('yearSpecification').hidden = true
                $('winterTimes').hidden = true
                $('winterTariffs').hidden = true
            }
            this[onSelectWinterTimes]()
        })

        $("submitButton").addEventListener('click', ({tagert}) => {
            this[onClickSubmitButton]()
        })
      
        $("energieversoger").addEventListener('change', ({target}) => {
            let operatorId = Number(target.options[target.selectedIndex].value)
            this[onAddOperator](operatorId)
        })

        $('name').addEventListener('change', ({target}) => {
            let productName = target.value
            this[onAddProductName](productName)
        })

        $('year').addEventListener('change', ({target}) => {
            let tariffYear = Number(target.options[target.selectedIndex].value)
            this[onAddTariffYear](tariffYear)
        })

        $('basic_fee_monthly').addEventListener('change', ({target}) => {
            let basicFeeMonthly = Number(target.value)
            this[onAddBasicFeeMonthly](basicFeeMonthly)
        })

        $('gridPeakPowerTariff').addEventListener('change', ({target}) => {
            let gridPeakPowerTariff = Number(target.value)
            this[onAddGridPeakPowerTariff](gridPeakPowerTariff)
        })

        $('valid_from_kwp').addEventListener('change', ({target}) => {
            let validFromKwh = Number(target.value)
            this[onAddValidFromKwh](validFromKwh)
        })

        $('valid_to_kwp').addEventListener('change', ({target}) => {
            let validToKwh = Number(target.value)
            this[onAddValidToKwh](validToKwh)
        })

        $('verbrauchertyp').addEventListener('change', ({target}) => {
            this[onAddConsumerType](Number(target.options[target.selectedIndex].value))
        })

        $('municipality_fee').addEventListener('change', ({target}) => {
            this[onAddMunicipalityFee](Number(target.value))
        })

        $('is_default').addEventListener('change', ({target}) => {
            this[onAddIsDefault](Number(target.options[target.selectedIndex].value))
        })

        $('kev').addEventListener('change', ({target}) => {
            this[onAddKevTax](Number(target.value))
        })

        $('sommerbeginn').addEventListener('change', ({target}) => {
            this[onAddSummerStart](Number(target.options[target.selectedIndex].value))
        })

        $('sommerende').addEventListener('change', ({target}) => {
            this[onAddSummerEnd](Number(target.options[target.selectedIndex].value))
        })

        $('ht_start_monday_summer').addEventListener('change', ({target}) => {
            this[onAddSummerMondayStart](Number(target.value))
        })

        $('ht_end_monday_summer').addEventListener('change', ({target}) => {
            this[onAddSummerMondayEnd](Number(target.value))
        })

        $('ht_start_saturday_summer').addEventListener('change', ({target}) => {
            this[onAddSummerSaturdayStart](Number(target.value))
        })
        $('ht_end_saturday_summer').addEventListener('change', ({target}) => {
            this[onAddSummerSaturdayEnd](Number(target.value))
        })
        $('ht_start_sunday_summer').addEventListener('change', ({target}) => {
            this[onAddSummerSundayStart](Number(target.value))
        })
        $('ht_end_sunday_summer').addEventListener('change', ({target}) => {
            this[onAddSummerSundayEnd](Number(target.value))
        })
        $('ht_start_monday_winter').addEventListener('change', ({target}) => {
            this[onAddWinterMondayStart](Number(target.value))
        })

        $('ht_end_monday_winter').addEventListener('change', ({target}) => {
            this[onAddWinterMondayEnd](Number(target.value))
        })

        $('ht_start_saturday_winter').addEventListener('change', ({target}) => {
            this[onAddWinterSaturdayStart](Number(target.value))
        })
        $('ht_end_saturday_winter').addEventListener('change', ({target}) => {
            this[onAddWinterSaturdayEnd](Number(target.value))
        })
        $('ht_start_sunday_winter').addEventListener('change', ({target}) => {
            this[onAddWinterSundayStart](Number(target.value))
        })
        $('ht_end_sunday_winter').addEventListener('change', ({target}) => {
            this[onAddWinterSundayEnd](Number(target.value))
        })
    }
}