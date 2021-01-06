export class Controller {
    constructor(view, api) {
        this.api = api
        this.view = view
    }
    async start() {
        await this.api.loadOperators()
        this.view.stopEnterKey()
        this.view.addOperatorsToList(this.api.getOperators())
        this.view.addBasicFeeMonthlyToList()
        this.view.addMonthsToList('sommerbeginn')
        this.view.addMonthsToList('sommerende')
        this.view.addYearstoList()
        this.view.addNameToList()
        this.view.addGridPeakPowerTariffToList()
        this.view.addValidFromKwhToList()
        this.view.addValidToKwhToList()
        this.view.addConsumerTypeToList()
        this.view.addMunicipalityFeeToList()
        this.view.addStandardTariffToList()
        this.view.addKevTaxToList()
        this.view.autoCalculate();
    }
}