function autoCalculate(){
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

    document.getElementById("totalSummerHT").innerHTML = additionEnergyNet(summerEnergyHT,summerNetHT);
    document.getElementById("totalSummerNT").innerHTML = additionEnergyNet(summerEnergyNT,summerNetNT);
    document.getElementById("totalWinterHT").innerHTML = additionEnergyNet(winterEnergyHT,winterNetHT);
    document.getElementById("totalWinterNT").innerHTML = additionEnergyNet(winterEnergyNT,winterNetNT);

}
