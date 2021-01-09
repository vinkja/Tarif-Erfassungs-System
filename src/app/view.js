import {Months, Operator, Product, SeasonalTariff, Tariff} from "./model";

const { add } = require('mathjs')

let operator = new Operator
let summerMonths = new Months().createMonthsList(null, null)
let summerTariff = new SeasonalTariff(null, null, null, null, null, null, null, null, summerMonths)
let winterMonths = new Months().createMonthsList(null, null)
let winterTariff = new SeasonalTariff(null, null, null, null, null, null, null, null, winterMonths)
let tariff = new Tariff(null, null, null, null, null, null, winterTariff, summerTariff, null, null, null)
let product = new Product(null, operator, null, tariff, null)


export class View {
    constructor() {
    }
    stopEnterKey(){
        document.getElementById('myForm').addEventListener('keydown',function (event) {
            let key = event.keyCode;
            if (key === 13){
                event.preventDefault();
            }
        })
    }

    addOperatorsToList(operators) {
        let mainContainer = document.getElementById("energieversoger");
        let elcomNumber = document.getElementById("operator_elcom_number");
        let vseId = document.getElementById("vse-id")
        operators.forEach(operator => {
            let option = document.createElement("option");
            option.innerHTML = operator.name;
            option.id = operator.id;
            mainContainer.appendChild(option);
          
        elcomNumber.innerHTML = operators[0].elcomNumber
        vseId.innerHTML = operators[0].vseId
        mainContainer.addEventListener('change', function () {
            let operatorSelection = this.options[this.selectedIndex];
            operator.name = operatorSelection.value
            operator.id = operatorSelection.id
            // operators = this.api.getOperators()
            // let operatorSelection = this.options[this.selectedIndex];
            // operators.forEach(op => {
            //     if (op.id === operatorSelection.id) {
            //         operator.id = op.id
            //         operator.name = op.name
            //         operator.vseId = op.vseId
            //         operator.elcomNumber = op.elcomNumber
            //     }
            // })
            // elcomNumber.innerHTML = operator.elcomNumber
            // vseId.innerHTML = operator.vseId
            console.log(product)
        })
    }

    addNameToList(){
        let stromProdukt = document.getElementById('name')
        stromProdukt.addEventListener('change', function (e) {
            op.name = document.getElementById('name').value;
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
            select.addEventListener('change', function () {
                tariff.year = this.options[this.selectedIndex].value
        })
    }

    addBasicFeeMonthlyToList(){
        document.getElementById('basic_fee_monthly').addEventListener('change', function (e) {
            tariff.basicFeeMonthly = document.getElementById('basic_fee_monthly').value;
        })
    }

    addGridPeakPowerTariffToList(){
        document.getElementById('load_counter_fee_monthly').addEventListener('change', function (e) {
            tariff.gridPeakPowerTariff = document.getElementById('load_counter_fee_monthly').value;
        })
    }

    addValidFromKwhToList(){
        document.getElementById('valid_from_kwp').addEventListener('change',function (e) {
            tariff.validFromKwh = document.getElementById('valid_from_kwp').value;
        });
    }

    addValidToKwhToList(){
        document.getElementById('valid_to_kwp').addEventListener('change',function (e) {
            tariff.validtoKwh = document.getElementById('valid_to_kwp').value;
        });
    }

    addConsumerTypeToList(){
        document.getElementById('verbrauchertyp').addEventListener('change',function (e) {
            tariff.consumerType = this.options[this.selectedIndex].value
        })
    }

    addMunicipalityFeeToList(){
        document.getElementById('municipality_fee').addEventListener('change',function (e) {
            tariff.municipalityFee = document.getElementById('municipality_fee').value;
        });
    }

    addStandardTariffToList(){
        document.getElementById('is_default').addEventListener('change',function (e) {
            tariff.standardTariff = this.options[this.selectedIndex].value
        })
    }

    addKevTaxToList(){
        document.getElementById('kev').addEventListener('change',function (e) {
            tariff.kevTax = document.getElementById('kev').value;
        });
    }

    addMonthsToList(element) {
        let month = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        let monthDropdown = document.getElementById(element)
        for (let i = 0; i < 12; i++) {
            let option = document.createElement('option');
            option.innerHTML = month[i];
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

                let additionEnergyNetSummerHTResult = add(summerEnergyHT,summerNetHT)
                let additionEnergyNetSummerNTResult = add(summerEnergyNT,summerNetNT)
                let additionEnergyNetWinterHTResult = add(winterEnergyHT,winterNetHT)
                let additionEnergyNetWinterNTResult = add(winterEnergyNT,winterNetNT)

                document.getElementById("totalSummerHT").innerText = additionEnergyNetSummerHTResult;
                document.getElementById("totalSummerNT").innerText = additionEnergyNetSummerNTResult;
                document.getElementById("totalWinterHT").innerText = additionEnergyNetWinterHTResult;
                document.getElementById("totalWinterNT").innerText = additionEnergyNetWinterNTResult;

            })
        }
    }
}