import {LEASettingsAPI} from "./LEASettingsAPI";
import {View} from './view.js'
import {Controller} from "./controller";

let api = new LEASettingsAPI()
let view = new View()
new Controller(view, api).start()