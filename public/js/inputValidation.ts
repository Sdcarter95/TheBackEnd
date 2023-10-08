const intRegex = /[0-9]/;

/**
* Calculates the length of a string or array, or the value of an int, and checks if it falls within a given range.
* @param input - The string, int, or array for which you want to check the range
* @param lowerBound - The lower bound of the length range (non-inclusive).
* @param upperBound - The upper bound of the length range (non-inclusive).
* @returns `true` if the length is within the specified range, `false` otherwise.
*/
export function rangeValid(input: string | string[] | number, lowerBound: number, upperBound: number): boolean {
    if (typeof input === "number") {
        if (input > lowerBound && input < upperBound){
            return true;
        } else{
            return false;
        }
    }
    else{
        if (input.length > lowerBound && input.length < upperBound) {
            return true;
        }
        else {
            return false;
        }
    }
}

/**
* Calculates the length of a string or array and checks if it is below the max
* @param input - The string or array for which you want to check the length
* @param maxLength - The upper bound of the length range (inclusive).
* @returns `true` if the length is below the max, `false` otherwise.
*/
export function lengthValid(input: string | string[], maxLength: number): boolean {
    if (input.length <= maxLength) {
        return true;
    }
    else {
        return false;
    }
}

/**
* Determines if a given string is a valid date.
* @param input - The string for which you want to check the format.
* @returns `true` if the given string is a valid date.
*/
export function dateValid(input: string): boolean {
    const date = new Date(input);
    return !isNaN(date.getTime());
  }

/**
* Determines if the input is or can be converted to the expected data type.
* @param input - The string, int, array, etc... for which you want to check the data type
* @param expectedType - the string representation of the expected data type.
* @returns `true` if the data type is as expected, `false` otherwise.
*/
export function dataTypeValid(input: any, expectedType: string): boolean {
    if (typeof input === expectedType) {
        return true;
    } else {
        if(typeof input === "string"){
            if (expectedType === "number"){
                if (!isNaN(parseInt(input)) && Math.floor(parseFloat(input)) === parseFloat(input)){
                    return true;
                } else {
                    return false;
                }
            } else if (expectedType === "float"){
                if (!isNaN(parseFloat(input))){
                    return true;
                } else{
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

/**
* Determines if there are any blacklisted items within a string
* @param input - The string or array for which you want to check for blacklisted items
* @param blacklist - an string array of items that are blacklisted
* @returns `true` if there are no blacklisted items
*/
export function noBlacklistedItems(input: string, blacklist: string[]): boolean {
    const blacklistPattern = new RegExp(`[${blacklist.join('')}]`);
    if (!blacklistPattern.test(input)){
        return true;
    } else{
        return false;
    }
}

/**
* determines if a given string contains any ints.
* @param input - The string for wich you want to check for integers
* @returns `true` if the string contains integers, `false` otherwise.
*/
export function StringHasInt(input: string){
    if(intRegex.test(input)){
        return true;
    } else{
        return false;
    }
}

