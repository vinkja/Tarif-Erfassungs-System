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
}