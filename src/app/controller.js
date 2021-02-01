export class Controller {
    constructor(view, viewEvents, store) {
        this.store = store
        this.view = view

        view.registerEventHandlers({
            [viewEvents.onSelectWinterTimes]: winterTariffSelected => this.store.setWinterTariffSelected(winterTariffSelected),
            [viewEvents.onAddOperator]: operatorId => this.addOperator(operatorId),
            [viewEvents.onAddProductName]: productName => this.addProductName(productName),
            [viewEvents.onAddTariffYear]: tariffYear => this.addTariffYear(tariffYear),
            [viewEvents.onAddBasicFeeMonthly]: basicFeeMonthly => this.addBasicFeeMonthly(basicFeeMonthly),
            [viewEvents.onAddGridPeakPowerTariff]: gridPeakPowerTariff => this.addGridPeakPowerTariff(gridPeakPowerTariff),
            [viewEvents.onAddValidFromKwh]: validFromKwh => this.addValidFromKwh(validFromKwh),
            [viewEvents.onAddValidToKwh]: validToKwh => this.addValidToKwh(validToKwh),
            [viewEvents.onAddConsumerType]: consumerType => this.addConsumerType(consumerType),
            [viewEvents.onAddMunicipalityFee]: municipalityFee => this.addMunicipalityFee(municipalityFee),
            [viewEvents.onAddIsDefault]: isDefault => this.addIsDefault(isDefault),
            [viewEvents.onAddKevTax]: kevTax => this.addKevTax(kevTax),
            [viewEvents.onAddSummerStart]: summerStart => this.addSummerStart(summerStart),
            [viewEvents.onAddSummerEnd]: summerEnd => this.addSummerEnd(summerEnd),
            [viewEvents.onAddSummerMondayStart]: summerMondayStart => {
                this.addSummerMondayStart(summerMondayStart)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddSummerMondayEnd]: summerMondayEnd => {
                this.addSummerMondayEnd(summerMondayEnd)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddSummerSaturdayStart]: summerSaturdayStart => {
                this.addSummerSaturdayStart(summerSaturdayStart)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddSummerSaturdayEnd]: summerSaturdayEnd => {
                this.addSummerSaturdayEnd(summerSaturdayEnd)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddSummerSundayStart]: summerSundayStart => {
                this.addSummerSundayStart(summerSundayStart)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddSummerSundayEnd]: summerSundayEnd => {
                this.addSummerSundayEnd(summerSundayEnd)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddSummerHighTariff]: summerHighTariff => {
                this.addSummerHighTariff(summerHighTariff)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddSummerLowTariff]: summerLowTariff => {
                this.addSummerLowTariff(summerLowTariff)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddWinterMondayStart]: winterMondayStart => {
                this.addWinterMondayStart(winterMondayStart)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddWinterMondayEnd]: winterMondayEnd => {
                this.addWinterMondayEnd(winterMondayEnd)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddWinterSaturdayStart]: winterSaturdayStart => {
                this.addWinterSaturdayStart(winterSaturdayStart)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddWinterSaturdayEnd]: winterSaturdayEnd => {
                this.addWinterSaturdayEnd(winterSaturdayEnd)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddWinterSundayStart]: winterSundayStart => {
                this.addWinterSundayStart(winterSundayStart)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddWinterSundayEnd]: winterSundayEnd => {
                this.addWinterSundayEnd(winterSundayEnd)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddWinterHighTariff]: winterHighTariff => {
                this.addWinterHighTariff(winterHighTariff)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onAddWinterLowTariff]: winterLowTariff => {
                this.addWinterLowTariff(winterLowTariff)
                this.view.renderTables(this.store.product, this.store.winterTariffSelected)
            },
            [viewEvents.onClickSubmitButton]: async () => {
                let status = await this.store.api.sendSwissProducts(this.store.product, this.store.winterTariffSelected)
                console.log(status)
                if (status === "ok") {
                    this.view.renderModal("Das Produkt wurde erfasst.")
                } else {
                    this.view.renderModal("Das Produkt konnte nicht erfasst werden.")
                }
            }
        })
    }

    async start() {
        await this.store.loadOperators()
        this.view.addOperatorsToList(this.store.getOperators())
        this.view.renderOperator(this.store.operators[0])
        this.store.createProduct()
        this.store.setOperator(this.store.operators[0].id)
        this.view.addMonthsToList('sommerbeginn')
        this.view.addMonthsToList('sommerende')
        this.view.addHoursToList()
        this.view.addYearstoList()
        this.store.setSummerStart(1)
        this.store.setSummerEnd(12)
    }

    addOperator(operatorId){
        let operator = this.store.setOperator(operatorId)
        this.view.renderOperator(operator)
    }

    addProductName(productName) {
        this.store.setProductName(productName)
    }

    addTariffYear(tariffYear) {
        this.store.setTariffYear(tariffYear)
    }

    addBasicFeeMonthly(basicFeeMonthly) {
        this.store.setBasicFeeMonthly(basicFeeMonthly)
    }

    addGridPeakPowerTariff(gridPeakPowerTariff) {
        this.store.setGridPeakPowerTariff(gridPeakPowerTariff)
    }

    addValidFromKwh(validFromKwh) {
        this.store.setValidFromKwh(validFromKwh)
    }

    addValidToKwh(validToKwh) {
        this.store.setValidToKwh(validToKwh)
    }

    addConsumerType(consumerType) {
        this.store.setConsumerType(consumerType)
    }

    addMunicipalityFee(municipalityFee) {
        this.store.setMunicipalityFee(municipalityFee)
    }

    addIsDefault(isDefault) {
        this.store.setIsDefault(isDefault)
    }

    addKevTax(kevTax) {
        this.store.setKevTax(kevTax)
    }

    addSummerStart(summerStart) {
        this.store.setSummerStart(summerStart)
    }

    addSummerEnd(summerEnd) {
        this.store.setSummerEnd(summerEnd)
    }

    addSummerMondayStart(summerMondayStart) {
        this.store.setSummerMondayStart(summerMondayStart)
    }

    addSummerMondayEnd(summerMondayEnd) {
        this.store.setSummerMondayEnd(summerMondayEnd)
    }

    addSummerSaturdayStart(summerSaturdayStart) {
        this.store.setSummerSaturdayStart(summerSaturdayStart)
    }

    addSummerSaturdayEnd(summerSaturdayEnd) {
        this.store.setSummerSaturdayEnd(summerSaturdayEnd)
    }

    addSummerSundayStart(summerSundayStart) {
        this.store.setSummerSundayStart(summerSundayStart)
    }

    addSummerSundayEnd(summerSundayEnd) {
        this.store.setSummerSundayEnd(summerSundayEnd)
    }

    addSummerHighTariff(summerHighTariff) {
        this.store.setSummerHighTariff(summerHighTariff)
    }

    addSummerLowTariff(summerLowTariff) {
        this.store.setSummerLowTariff(summerLowTariff)
    }

    addWinterMondayStart(winterMondayStart) {
        this.store.setWinterMondayStart(winterMondayStart)
    }

    addWinterMondayEnd(winterMondayEnd) {
        this.store.setWinterMondayEnd(winterMondayEnd)
    }

    addWinterSaturdayStart(winterSaturdayStart) {
        this.store.setWinterSaturdayStart(winterSaturdayStart)
    }

    addWinterSaturdayEnd(winterSaturdayEnd) {
        this.store.setWinterSaturdayEnd(winterSaturdayEnd)
    }

    addWinterSundayStart(winterSundayStart) {
        this.store.setWinterSundayStart(winterSundayStart)
    }

    addWinterSundayEnd(winterSundayEnd) {
        this.store.setWinterSundayEnd(winterSundayEnd)
    }

    addWinterHighTariff(winterHighTariff) {
        this.store.setWinterHighTariff(winterHighTariff)
    }

    addWinterLowTariff(winterLowTariff) {
        this.store.setWinterLowTariff(winterLowTariff)
    }
}