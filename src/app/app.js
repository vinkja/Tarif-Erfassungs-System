import {LEASettingsAPI} from "./LEASettingsAPI";
import {events as viewEvents, View} from './view.js'
import {Controller} from "./controller";
import {Store} from "./Store";

let serverUrl = "https://ep-dev-03.eturnity.ch"
let store = new Store(serverUrl)
let view = new View()
new Controller(view, viewEvents, store).start()