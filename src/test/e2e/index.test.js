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
            assert.strictEqual(await page.operatorElcomField().getText(), '7')
        })
        it('should render VSE Id number on vse field', async () => {
            await driver.wait(until.elementLocated(page.specificOperatorSelector(301)))

            await page.specificOperatorField(301).click()
            assert.strictEqual(await page.operatorVSEField().getText(), '10751012345')
        })
    })
})

// await driver.takeScreenshot().then((image, err) => {
//     fs.writeFile(
//         'screenshot.png',
//         image,
//         'base64',
//         (err) => console.log(err)
//     )
// })