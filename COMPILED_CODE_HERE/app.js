"use strict";

var _LEASettingsAPI = require("./LEASettingsAPI");

var _view = require("./view.js");

var _controller = require("./controller");

let api = new _LEASettingsAPI.LEASettingsAPI();
let view = new _view.View();
new _controller.Controller(view, api).start();