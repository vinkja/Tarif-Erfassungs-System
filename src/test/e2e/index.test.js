import {By, until, Key} from 'selenium-webdriver'
import {describe, it, beforeEach, after} from 'mocha'
import fs from 'fs'

import init from './selenium.helper.js'
const {driver, config, assert} = init()

import Index from './index.po.js'
const page = new Index(driver, config.target)

describe('Index', () => {

    beforeEach(async () => {
        await page.gotoIndex()
    })

    after(async () => {
        await driver.quit()
    })

    xit('should show operator dropdown', async () => {
        await driver.wait(until.elementLocated(page.operatorSelector()))
    })

    describe('select operator', () => {

        it('should render elcom number on elcom field', async () => {
            await driver.wait(until.elementLocated(page.specificOperatorSelector(301)))

            await page.specificOperatorField(301).click()
            await driver.takeScreenshot().then((image, err) => {
                fs.writeFile(
                    'screenshot.png',
                    image,
                    'base64',
                    (err) => console.log(err)
                )
            })
            assert.strictEqual(await page.operatorElcomField().getText(), '7')
        })
        it('should render VSE Id number on vse field', async () => {
            await driver.wait(until.elementLocated(page.specificOperatorSelector(301)))

            await page.specificOperatorField(301).click()
            assert.strictEqual(await page.operatorVSEField().getText(), '10751012345')
        })
    })

    describe('set summerEnergyHTField and summerNetHTField', ()=>{

        it('should calculate summer HT', async () => {
            await driver.wait(until.elementsLocated(page.summerEnergyHTSelector()))
            await page.summerEnergyHTField().sendKeys('5')
            await page.summerNetHTField().sendKeys('5')
            await page.summerNetHTField().sendKeys(Key.ENTER)

            await assert.strictEqual(await page.totalSummerHTField().getText(),'10')
        })
    })

    describe('click winterTariffsCheck, set winterEnergyHTField and winterNetHTField', ()=>{

        it('should calculate winter HT after clicking checkbox', async () => {
            await page.winterTariffsCheckBoxField().click()

            await driver.wait(until.elementsLocated(page.winterEnergyHTSelector()))
            await page.winterEnergyHTField().sendKeys('6')
            await page.winterNetHTField().sendKeys('6')
            await page.winterNetHTField().sendKeys(Key.ENTER)

            await assert.strictEqual(await page.totalWinterHTField().getText(),'12')
        })
    })
})