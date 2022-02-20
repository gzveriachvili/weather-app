import 'babel-polyfill';
import { UI } from './modules/dom';
import './css/style.css';

UI.showWeather('London', false);
UI.getInput();

const myInput = document.getElementById('#myInput');
