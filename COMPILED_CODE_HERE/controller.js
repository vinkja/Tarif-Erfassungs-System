"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = void 0;

class Controller {
  constructor(view, api) {
    this.api = api;
    this.view = view;
  }

  async start() {
    await this.api.loadOperators();
    this.view.addOperatorsToList(this.api.getOperators());
    this.view.addYearstoList();
    this.view.addMonthsToList('sommerbeginn');
    this.view.addMonthsToList('sommerende');
  }

}

exports.Controller = Controller;