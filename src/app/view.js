import {Months, Operator, Product, SeasonalTariff, Tariff} from "./model";
const { add } = require('mathjs')

let op = new Operator(123, "test")
let summerMonths = new Months().createMonthsList(3, 9)
let summerTariff = new SeasonalTariff(17.1, 13.3, 7, 19, 0, 0, 0, 0, summerMonths)
let winterMonths = new Months().createMonthsList(10, 2)
let winterTariff = new SeasonalTariff(27.1, 23.3, 8, 17, 0, 0, 0, 0, winterMonths)
let tariff = new Tariff(2020, 0, 10000, 0.0, 0.3, 5.00, winterTariff, summerTariff, 'Privat', 'Ja', '123')
let pro = new Product(1, op, "test1212", tariff, 0)


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
        for (let i = 1; i < operators.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = operators[i].name;
            mainContainer.appendChild(option);

        }
        mainContainer.addEventListener('change', function () {
            let containerSelection = this.options[this.selectedIndex].value;
            op.id = containerSelection
            console.log(pro)
        })
    }

    addNameToList(){
        let stromProdukt = document.getElementById('name')
        stromProdukt.addEventListener('change', function (e) {
            let input = document.getElementById('name').value;
            op.name = input;
            console.log(pro)
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
                let yearSelection = this.options[this.selectedIndex].value;
                tariff.year = yearSelection
                console.log(pro)
        })
    }

    addBasicFeeMonthlyToList(){
        let basicFeeMonthly = document.getElementById('basic_fee_monthly')
        basicFeeMonthly.addEventListener('change', function (e) {
            tariff.basicFeeMonthly = document.getElementById('basic_fee_monthly').value;
            console.log(pro)
        })
    }

    addGridPeakPowerTariffToList(){
        let GridPeakPowerTariff = document.getElementById('load_counter_fee_monthly')
        GridPeakPowerTariff.addEventListener('change', function (e) {
            tariff.gridPeakPowerTariff = document.getElementById('load_counter_fee_monthly').value;
            console.log(pro)
        })
    }

    addValidFromKwhToList(){
        document.getElementById('valid_from_kwp').addEventListener('change',function (e) {
            tariff.validFromKwh = document.getElementById('valid_from_kwp').value;
            console.log(pro)
        });
    }

    addValidToKwhToList(){
        document.getElementById('valid_to_kwp').addEventListener('change',function (e) {
            tariff.validtoKwh = document.getElementById('valid_to_kwp').value;
            console.log(pro)
        });
    }

    addConsumerTypeToList(){
        document.getElementById('verbrauchertyp').addEventListener('change',function (e) {
            tariff.consumerType = this.options[this.selectedIndex].value
            console.log(pro)
        })
    }

    addMunicipalityFeeToList(){
        document.getElementById('municipality_fee').addEventListener('change',function (e) {
            tariff.municipalityFee = document.getElementById('municipality_fee').value;
            console.log(pro)
        });
    }

    addStandardTariffToList(){
        document.getElementById('is_default').addEventListener('change',function (e) {
            tariff.standardTariff = this.options[this.selectedIndex].value
            console.log(pro)
        })
    }

    addKevTaxToList(){
        document.getElementById('kev').addEventListener('change',function (e) {
            tariff.kevTax = document.getElementById('kev').value;
            console.log(pro)
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