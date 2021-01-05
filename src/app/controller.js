export class Controller {
    constructor(view, api) {
        this.api = api
        this.view = view
    }
    async start() {
        await this.api.loadOperators()
        this.view.addOperatorsToList(this.api.getOperators())
        this.view.addYearstoList()
        this.view.addMonthsToList('sommerbeginn')
        this.view.addMonthsToList('sommerende')
        this.view.autoCalculate();
    }
}