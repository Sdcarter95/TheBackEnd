// Existing interface and class representing a temperature in Celsius
interface CelsiusTemperature {
    getCelsius(): number;
}

class CelsiusSensor implements CelsiusTemperature {
    private temperature: number;

    constructor(temperature: number) {
        this.temperature = temperature;
    }

    getCelsius(): number {
        return this.temperature;
    }
}

interface FahrenheitTemperature {
    getFahrenheit(): number;
}

class CelsiusToFahrenheitAdapter implements FahrenheitTemperature {
    private celsiusSensor: CelsiusTemperature;

    constructor(celsiusSensor: CelsiusTemperature) {
        this.celsiusSensor = celsiusSensor;
    }

    getFahrenheit(): number {
        const celsius = this.celsiusSensor.getCelsius();
        // Conversion formula: (Celsius * 9/5) + 32
        return (celsius * 9 / 5) + 32;
    }
}


export enum adapterFunctions {
    "CelsiusTemperature",
    "CelsiusSensor",
    "FahrenheitTemperature",
    "CelsiusToFahrenheitAdapter",
    "result"
}

/**
 * provides access to the stringified functions of the adapter class for use in a printed example.
 * @param functionToPrint member of the enum adapterFunction that represents the function name to stringify.
 * @returns string representations of adapter functions for the temperature example.
 */
export function adapterExample(functionToPrint: adapterFunctions): string {
    if (functionToPrint === adapterFunctions.CelsiusSensor) {
        return CelsiusSensor.toString();
    } else if (functionToPrint === adapterFunctions.CelsiusTemperature) {
        return `interface CelsiusTemperature {\n    getCelsius(): number;\n}`
    } else if (functionToPrint === adapterFunctions.FahrenheitTemperature) {
        return `interface FahrenheitTemperature {\n    getFahrenheit(): number;\n}`
    } else if (functionToPrint === adapterFunctions.CelsiusToFahrenheitAdapter) {
        return CelsiusToFahrenheitAdapter.toString();
    }
    else {
        const celsiusSensor = new CelsiusSensor(20); // 20 degrees Celsius
        const adapter = new CelsiusToFahrenheitAdapter(celsiusSensor);
        const result = adapter.getFahrenheit();
        return result.toString();
    }
}   