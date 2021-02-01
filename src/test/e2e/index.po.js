import webdriver from 'selenium-webdriver'
const {By} = webdriver

export default class Index{
    constructor(driver, url){
        this.driver = driver
        this.url = url
    }

    gotoIndex(){
        return this.driver.navigate().to(this.url)
    }

    operatorSelector(){
        return By.id('energieversoger')
    }

    operatorField(){
        return this.driver.findElement(this.operatorSelector())
    }

    specificOperatorSelector(value){
        return By.xpath(`//*[@value="${value}"]`)
    }

    specificOperatorField(value){
        return this.driver.findElement(By.xpath(`//*[@value="${value}"]`))
    }

    operatorElcomSelector(){
        return By.id('operator_elcom_number')
    }

    operatorElcomField(){
        return this.driver.findElement(this.operatorElcomSelector())
    }

    operatorVSESelector(){
        return By.id('vse-id')
    }

    operatorVSEField(){
        return this.driver.findElement(this.operatorVSESelector())
    }
    summerEnergyHTSelector(){
        return By.id('summerEnergyHT')
    }

    summerEnergyHTField(){
        return this.driver.findElement(this.summerEnergyHTSelector())
    }

    summerNetSelector() {
        return By.id('summerNetHT')
    }

    summerNetHTField() {
        return this.driver.findElement(this.summerNetSelector())
    }

    totalSummerHTSelector(){
        return By.id('totalSummerHT')
    }

    totalSummerHTField(){
        return this.driver.findElement(this.totalSummerHTSelector())
    }

    winterTariffsCheckBoxSelector() {
        return By.id('winterTariffsCheck')
    }

    winterTariffsCheckBoxField(){
        return this.driver.findElement(this.winterTariffsCheckBoxSelector())
    }

    winterEnergyHTSelector() {
        return By.id('winterEnergyHT')
    }

    winterEnergyHTField() {
        return this.driver.findElement(this.winterEnergyHTSelector())
    }

    winterNetSelector(){
        return By.id('winterNetHT')
    }

    winterNetHTField() {
        return this.driver.findElement(this.winterNetSelector())
    }

    totalWinterHTSelector(){
        return By.id('totalWinterHT')
    }

    totalWinterHTField(){
        return this.driver.findElement(this.totalWinterHTSelector())
    }
}