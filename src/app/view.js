import {add} from 'mathjs'

const noop = () => {}
const onAddOperator = Symbol()
const onAddProductName = Symbol()
const onAddTariffYear = Symbol()
const onAddBasicFeeMonthly = Symbol()
const onAddGridPeakPowerTariff = Symbol()
const onAddValidFromKwh = Symbol()
const onAddValidToKwh = Symbol()
const onAddConsumerType = Symbol()
const onAddMunicipalityFee = Symbol()
const onAddStandardTariff = Symbol()
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
    onAddStandardTariff: "called when Standardtarif is set",
    onAddKevTax: "called when KEVis set",
    onAddSummerStart: "TODO 1",
    onAddSummerEnd: "TODO 2",
    onAddSummerMondayStart: "TODO 3",
    onAddSummerMondayEnd: "TODO 5",
    onAddSummerSaturdayStart: "TODO 4",
    onAddSummerSaturdayEnd: "Todo",
    onAddSummerSundayStart: "TODO 6",
    onAddSummerSundayEnd: "TODO 7",
    onAddSummerHighTariff: "TODO 8 ",
    onAddSummerLowTariff: "TODO 9",
    onAddWinterMondayStart: "todo1",
    onAddWinterMondayEnd: "todo2",
    onAddWinterSaturdayStart: "todo3",
    onAddWinterSaturdayEnd: "todo4",
    onAddWinterSundayStart: "todo5",
    onAddWinterSundayEnd: "todo6",
    onAddWinterHighTariff: "todo7",
    onAddWinterLowTariff: "todo8",
}

export class View {

    constructor() {
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
            [events.onAddStandardTariff]: noop,
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
        }

        this.bindEvents()
    }

    registerEventHandlers(handlers) {
        for (let event in handlers){
            if(this.eventHandlers[event]){
                this.eventHandlers[event] = handlers[event]
            }
        }
    }
    //TODO: make Enter go to next field
    stopEnterKey() {
        document.getElementById('myForm').addEventListener('keydown', function (event) {
            let key = event.keyCode;
            if (key === 13) {
                event.preventDefault();
            }
        })
    }

    renderOperator(operator) {
        let elcomNumber = document.getElementById("operator_elcom_number");
        let vseId = document.getElementById("vse-id")
        elcomNumber.innerHTML = operator.elcomNumber
        vseId.innerHTML = operator.vseId
    }

    addOperatorsToList(operators) {
        let mainContainer = document.getElementById("energieversoger");
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
        let select = document.getElementById('year');
        for (let i = actualYear; i <= maxDate; i++) {
            let opt = document.createElement('option');
            opt.innerHTML = i;
            select.appendChild(opt);
        }
    }


    addMonthsToList(element) {
        let month = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        let monthDropdown = document.getElementById(element)
        for (let i = 0; i < 12; i++) {
            let option = document.createElement('option');
            option.innerHTML = month[i];
            option.value = String((i + 1))
            monthDropdown.appendChild(option);
            monthDropdown.addEventListener('change', function () {
                let sommerbeginnSelection = this.options[this.selectedIndex].value;
                console.log(sommerbeginnSelection)
            })
        }
    }

    autoCalculate() {
        let consumptionRateInputElements = document.getElementsByClassName('consumptionRateInput');

        for (let consumptionRateInputElement = 0; consumptionRateInputElement < consumptionRateInputElements.length; consumptionRateInputElement++) {
            consumptionRateInputElements[consumptionRateInputElement].addEventListener('change', () => {

                // for (var consumptionRateInputElement in consumptionRateInputElements) {
                //     consumptionRateInputElements[consumptionRateInputElement].addEventListener('change', () => {

                let summerEnergyHT = document.getElementById("summerEnergyHT").value;
                let summerNetHT = document.getElementById("summerNetHT").value;
                let summerEnergyNT = document.getElementById("summerEnergyNT").value;
                let summerNetNT = document.getElementById("summerNetNT").value;
                let winterEnergyHT = document.getElementById("winterEnergyHT").value;
                let winterNetHT = document.getElementById("winterNetHT").value;
                let winterEnergyNT = document.getElementById("winterEnergyNT").value;
                let winterNetNT = document.getElementById("winterNetNT").value;

                let additionEnergyNetSummerHTResult = add(summerEnergyHT, summerNetHT)
                let additionEnergyNetSummerNTResult = add(summerEnergyNT, summerNetNT)
                let additionEnergyNetWinterHTResult = add(winterEnergyHT, winterNetHT)
                let additionEnergyNetWinterNTResult = add(winterEnergyNT, winterNetNT)

                document.getElementById("totalSummerHT").innerText = additionEnergyNetSummerHTResult;
                this[onAddSummerHighTariff](additionEnergyNetSummerHTResult)
                document.getElementById("totalSummerNT").innerText = additionEnergyNetSummerNTResult;
                this[onAddSummerLowTariff](additionEnergyNetSummerNTResult)
                document.getElementById("totalWinterHT").innerText = additionEnergyNetWinterHTResult;
                this[onAddWinterHighTariff](additionEnergyNetWinterHTResult)
                document.getElementById("totalWinterNT").innerText = additionEnergyNetWinterNTResult;
                this[onAddWinterLowTariff](additionEnergyNetWinterNTResult)
            })
        }
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
    [onAddStandardTariff](standardTariff) {
        return this.eventHandlers[events.onAddStandardTariff](standardTariff)
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

    bindEvents() {
        document.getElementById("energieversoger").addEventListener('change', ({target}) => {
            let operatorId = Number(target.options[target.selectedIndex].value)
            this[onAddOperator](operatorId)
        })

        document.getElementById('name').addEventListener('change', ({target}) => {
            let productName = target.value
            this[onAddProductName](productName)
        })

        document.getElementById('year').addEventListener('change', ({target}) => {
            let tariffYear = Number(target.options[target.selectedIndex].value)
            this[onAddTariffYear](tariffYear)
        })

        document.getElementById('basic_fee_monthly').addEventListener('change', ({target}) => {
            let basicFeeMonthly = Number(target.value)
            this[onAddBasicFeeMonthly](basicFeeMonthly)
        })

        document.getElementById('gridPeakPowerTariff').addEventListener('change', ({target}) => {
            let gridPeakPowerTariff = Number(target.value)
            this[onAddGridPeakPowerTariff](gridPeakPowerTariff)
        })

        document.getElementById('valid_from_kwp').addEventListener('change', ({target}) => {
            let validFromKwh = Number(target.value)
            this[onAddValidFromKwh](validFromKwh)
        })

        document.getElementById('valid_to_kwp').addEventListener('change', ({target}) => {
            let validToKwh = Number(target.value)
            this[onAddValidToKwh](validToKwh)
        })

        document.getElementById('verbrauchertyp').addEventListener('change', ({target}) => {
            this[onAddConsumerType](Number(target.options[target.selectedIndex].value))
        })

        document.getElementById('municipality_fee').addEventListener('change', ({target}) => {
            this[onAddMunicipalityFee](Number(target.value))
        })

        document.getElementById('is_default').addEventListener('change', ({target}) => {
            this[onAddStandardTariff](Number(target.options[target.selectedIndex].value))
        })

        document.getElementById('kev').addEventListener('change', ({target}) => {
            this[onAddKevTax](Number(target.value))
        })

        document.getElementById('sommerbeginn').addEventListener('change', ({target}) => {
            this[onAddSummerStart](Number(target.options[target.selectedIndex].value))
        })

        document.getElementById('sommerende').addEventListener('change', ({target}) => {
            this[onAddSummerEnd](Number(target.options[target.selectedIndex].value))
        })

        document.getElementById('ht_start_monday_summer').addEventListener('change', ({target}) => {
            this[onAddSummerMondayStart](Number(target.value))
        })

        document.getElementById('ht_end_monday_summer').addEventListener('change', ({target}) => {
            this[onAddSummerMondayEnd](Number(target.value))
        })

        document.getElementById('ht_start_saturday_summer').addEventListener('change', ({target}) => {
            this[onAddSummerSaturdayStart](Number(target.value))
        })
        document.getElementById('ht_end_saturday_summer').addEventListener('change', ({target}) => {
            this[onAddSummerSaturdayEnd](Number(target.value))
        })
        document.getElementById('ht_start_sunday_summer').addEventListener('change', ({target}) => {
            this[onAddSummerSundayStart](Number(target.value))
        })
        document.getElementById('ht_end_sunday_summer').addEventListener('change', ({target}) => {
            this[onAddSummerSundayEnd](Number(target.value))
        })
        document.getElementById('ht_start_monday_winter').addEventListener('change', ({target}) => {
            this[onAddWinterMondayStart](Number(target.value))
        })

        document.getElementById('ht_end_monday_winter').addEventListener('change', ({target}) => {
            this[onAddWinterMondayEnd](Number(target.value))
        })

        document.getElementById('ht_start_saturday_winter').addEventListener('change', ({target}) => {
            this[onAddWinterSaturdayStart](Number(target.value))
        })
        document.getElementById('ht_end_saturday_winter').addEventListener('change', ({target}) => {
            this[onAddWinterSaturdayEnd](Number(target.value))
        })
        document.getElementById('ht_start_sunday_winter').addEventListener('change', ({target}) => {
            this[onAddWinterSundayStart](Number(target.value))
        })
        document.getElementById('ht_end_sunday_winter').addEventListener('change', ({target}) => {
            this[onAddWinterSundayEnd](Number(target.value))
        })
    }
}