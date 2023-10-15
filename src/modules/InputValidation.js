"use strict";
/**
 * File: InputValidation.ts
 * Author: Seth Carter
 * Description: This file gives access to a range of input validation functions for processing input.
 * Date: 10/14/2023
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringHasInt = exports.noBlacklistedItems = exports.dataTypeValid = exports.dateValid = exports.lengthValid = exports.rangeValid = void 0;
const intRegex = /[0-9]/;
/**
* Calculates the length of a string or array, or the value of an int, and checks if it falls within a given range.
* @param input - The string, int, or array for which you want to check the range
* @param lowerBound - The lower bound of the length range (non-inclusive).
* @param upperBound - The upper bound of the length range (non-inclusive).
* @returns `true` if the length is within the specified range, `false` otherwise.
*/
function rangeValid(input, lowerBound, upperBound) {
    if (typeof input === "number") {
        if (input > lowerBound && input < upperBound) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (input.length > lowerBound && input.length < upperBound) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.rangeValid = rangeValid;
/**
* Calculates the length of a string or array and checks if it is below the max
* @param input - The string or array for which you want to check the length
* @param maxLength - The upper bound of the length range (inclusive).
* @returns `true` if the length is below the max, `false` otherwise.
*/
function lengthValid(input, maxLength) {
    if (input.length <= maxLength) {
        return true;
    }
    else {
        return false;
    }
}
exports.lengthValid = lengthValid;
/**
* Determines if a given string is a valid date.
* @param input - The string for which you want to check the format.
* @returns `true` if the given string is a valid date.
*/
function dateValid(input) {
    const date = new Date(input);
    return !isNaN(date.getTime());
}
exports.dateValid = dateValid;
/**
* Determines if the input is or can be converted to the expected data type.
* @param input - The string, int, array, etc... for which you want to check the data type
* @param expectedType - the string representation of the expected data type.
* @returns `true` if the data type is as expected, `false` otherwise.
*/
function dataTypeValid(input, expectedType) {
    if (typeof input === expectedType) {
        return true;
    }
    else {
        if (typeof input === "string") {
            if (expectedType === "number") {
                if (!isNaN(parseInt(input)) && Math.floor(parseFloat(input)) === parseFloat(input)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (expectedType === "float") {
                if (!isNaN(parseFloat(input))) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}
exports.dataTypeValid = dataTypeValid;
/**
* Determines if there are any blacklisted items within a string
* @param input - The string or array for which you want to check for blacklisted items
* @param blacklist - an string array of items that are blacklisted
* @returns `true` if there are no blacklisted items
*/
function noBlacklistedItems(input, blacklist) {
    const blacklistPattern = new RegExp(`[${blacklist.join('')}]`);
    if (!blacklistPattern.test(input)) {
        return true;
    }
    else {
        return false;
    }
}
exports.noBlacklistedItems = noBlacklistedItems;
/**
* determines if a given string contains any ints.
* @param input - The string for wich you want to check for integers
* @returns `true` if the string contains integers, `false` otherwise.
*/
function StringHasInt(input) {
    if (intRegex.test(input)) {
        return true;
    }
    else {
        return false;
    }
}
exports.StringHasInt = StringHasInt;
