"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapterExample = exports.adapterFunctions = void 0;
class CelsiusSensor {
    constructor(temperature) {
        this.temperature = temperature;
    }
    getCelsius() {
        return this.temperature;
    }
}
class CelsiusToFahrenheitAdapter {
    constructor(celsiusSensor) {
        this.celsiusSensor = celsiusSensor;
    }
    getFahrenheit() {
        const celsius = this.celsiusSensor.getCelsius();
        // Conversion formula: (Celsius * 9/5) + 32
        return (celsius * 9 / 5) + 32;
    }
}
var adapterFunctions;
(function (adapterFunctions) {
    adapterFunctions[adapterFunctions["CelsiusTemperature"] = 0] = "CelsiusTemperature";
    adapterFunctions[adapterFunctions["CelsiusSensor"] = 1] = "CelsiusSensor";
    adapterFunctions[adapterFunctions["FahrenheitTemperature"] = 2] = "FahrenheitTemperature";
    adapterFunctions[adapterFunctions["CelsiusToFahrenheitAdapter"] = 3] = "CelsiusToFahrenheitAdapter";
    adapterFunctions[adapterFunctions["result"] = 4] = "result";
})(adapterFunctions = exports.adapterFunctions || (exports.adapterFunctions = {}));
/**
 * provides access to the stringified functions of the adapter class for use in a printed example.
 * @param functionToPrint member of the enum adapterFunction that represents the function name to stringify.
 * @returns string representations of adapter functions for the temperature example.
 */
function adapterExample(functionToPrint) {
    if (functionToPrint === adapterFunctions.CelsiusSensor) {
        return CelsiusSensor.toString();
    }
    else if (functionToPrint === adapterFunctions.CelsiusTemperature) {
        return `interface CelsiusTemperature {\n    getCelsius(): number;\n}`;
    }
    else if (functionToPrint === adapterFunctions.FahrenheitTemperature) {
        return `interface FahrenheitTemperature {\n    getFahrenheit(): number;\n}`;
    }
    else if (functionToPrint === adapterFunctions.CelsiusToFahrenheitAdapter) {
        return CelsiusToFahrenheitAdapter.toString();
    }
    else {
        const celsiusSensor = new CelsiusSensor(20); // 20 degrees Celsius
        const adapter = new CelsiusToFahrenheitAdapter(celsiusSensor);
        const result = adapter.getFahrenheit();
        return result.toString();
    }
}
exports.adapterExample = adapterExample;
