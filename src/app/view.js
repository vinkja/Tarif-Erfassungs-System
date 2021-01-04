export class View {
    constructor() {
    }

    addOperatorsToList(operators) {
        let mainContainer = document.getElementById("energieversoger");
        for (let i = 1; i < operators.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = operators[i].name;
            mainContainer.appendChild(option);
            option.addEventListener('click', function (e) {
                e.valueOf()
                console.log(e);
            })
        }
        mainContainer.addEventListener('change', function () {
            let containerSelection = this.options[this.selectedIndex].value;
            console.log(containerSelection)
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
            select.addEventListener('change', function () {
                let yearSelection = this.options[this.selectedIndex].value;
                console.log(yearSelection)
            })
        }
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
        let summerEnergyHT = document.getElementById("summerEnergyHT").value;
        let summerNetHT = document.getElementById("summerNetHT").value;
        let summerEnergyNT = document.getElementById("summerEnergyNT").value;
        let summerNetNT = document.getElementById("summerNetNT").value;
        let winterEnergyHT = document.getElementById("winterEnergyHT").value;
        let winterNetHT = document.getElementById("winterNetHT").value;
        let winterEnergyNT = document.getElementById("winterEnergyNT").value;
        let winterNetNT = document.getElementById("winterNetNT").value;

        function additionEnergyNet(p1, p2) {
            let result = parseFloat(p1) + parseFloat(p2);
            return result
        }

        document.getElementById("totalSummerHT").innerHTML = additionEnergyNet(summerEnergyHT, summerNetHT);
        document.getElementById("totalSummerNT").innerHTML = additionEnergyNet(summerEnergyNT, summerNetNT);
        document.getElementById("totalWinterHT").innerHTML = additionEnergyNet(winterEnergyHT, winterNetHT);
        document.getElementById("totalWinterNT").innerHTML = additionEnergyNet(winterEnergyNT, winterNetNT);

    }
}