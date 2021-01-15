
const noop = () => {}
function $(field) {return document.getElementById(field)}
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
        let hourElements = document.getElementsByClassName("hours_select")
        for (let hourElement of hourElements) {
            for (let hour = 1; hour < 25; hour++) {
                let option = document.createElement('option')
                option.innerHTML = String(hour + ":00")
                option.value = String(hour)
                hourElement.appendChild(option)
            }
        }
    }

    autoCalculate() {
        let consumptionRateInputElements = document.getElementsByClassName('consumptionRateInput');

        for (let consumptionRateInputElement = 0; consumptionRateInputElement < consumptionRateInputElements.length; consumptionRateInputElement++) {
            consumptionRateInputElements[consumptionRateInputElement].addEventListener('change', () => {

                // for (var consumptionRateInputElement in consumptionRateInputElements) {
                //     consumptionRateInputElements[consumptionRateInputElement].addEventListener('change', () => {

                let summerEnergyHT = $("summerEnergyHT").value;
                let summerNetHT = $("summerNetHT").value;
                let summerEnergyNT = $("summerEnergyNT").value;
                let summerNetNT = $("summerNetNT").value;
                let winterEnergyHT = $("winterEnergyHT").value;
                let winterNetHT = $("winterNetHT").value;
                let winterEnergyNT = $("winterEnergyNT").value;
                let winterNetNT = $("winterNetNT").value;

                function add(p1, p2){
                    let result = parseFloat(p1) + parseFloat(p2);
                    return result
                }

                let additionEnergyNetSummerHTResult = add(summerEnergyHT, summerNetHT)
                let additionEnergyNetSummerNTResult = add(summerEnergyNT, summerNetNT)
                let additionEnergyNetWinterHTResult = add(winterEnergyHT, winterNetHT)
                let additionEnergyNetWinterNTResult = add(winterEnergyNT, winterNetNT)

                $("totalSummerHT").innerText = additionEnergyNetSummerHTResult;
                this[onAddSummerHighTariff](additionEnergyNetSummerHTResult)
                $("totalSummerNT").innerText = additionEnergyNetSummerNTResult;
                this[onAddSummerLowTariff](additionEnergyNetSummerNTResult)
                $("totalWinterHT").innerText = additionEnergyNetWinterHTResult;
                this[onAddWinterHighTariff](additionEnergyNetWinterHTResult)
                $("totalWinterNT").innerText = additionEnergyNetWinterNTResult;
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

    bindEvents() {
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