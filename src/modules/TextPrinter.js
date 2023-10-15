"use strict";
/**
* File: TextPrinter.ts
* Author: Seth Carter
* Description: This file gives access to a range of helper functions for typing, and printing text output in a veriety of colors.
* Date: 10/14/2023
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.printText = exports.printCyan = exports.printDarkGreen = exports.printWhite = exports.printBlue = exports.printRed = exports.printGreen = exports.typeText = exports.textColor = exports.textSpeed = void 0;
const sleepSync_1 = require("./helperFunctions/sleepSync");
/**
 * Enum representing textSpeed in ms intervals/
 */
var textSpeed;
(function (textSpeed) {
    textSpeed[textSpeed["slow"] = 200] = "slow";
    textSpeed[textSpeed["medium"] = 90] = "medium";
    textSpeed[textSpeed["fast"] = 50] = "fast";
    textSpeed[textSpeed["very_fast"] = 35] = "very_fast";
    textSpeed[textSpeed["uber_speed"] = 15] = "uber_speed";
})(textSpeed = exports.textSpeed || (exports.textSpeed = {}));
/**
 * Enum that represents different colors coresponding to the textcodes in this format: '\x1b[38;5;<color_number>m'
 */
var textColor;
(function (textColor) {
    textColor[textColor["green"] = 40] = "green";
    textColor[textColor["darkGreen"] = 22] = "darkGreen";
    textColor[textColor["blue"] = 27] = "blue";
    textColor[textColor["red"] = 196] = "red";
    textColor[textColor["white"] = 15] = "white";
    textColor[textColor["cyan"] = 45] = "cyan";
    textColor[textColor["yellow"] = 226] = "yellow";
})(textColor = exports.textColor || (exports.textColor = {}));
const resetCode = '\x1b[0m'; // Reset code is to set text color to default after colored text is printed
/**
 * Types text letter by letter with the given speed and text color on the CMD.
 * @param text The text to print on the CMD.
 * @param speed The speed of the text to print on the CMD. Uses the textSpeed enum.
 * @param isCentered True or false value on if you want the text to be centered when printing.
 * @param colorCode The color you want the text to be. Uses the textColor enum.
 */
async function typeText(text, speed, isCentered, colorCode = 0) {
    let index = 0;
    const interval = speed; // Adjust the interval (in milliseconds) as needed
    const resetCode = '\x1b[0m'; // Reset code is to set text color to default after colored text is printed
    text = `\x1b[38;5;${colorCode}m${text}${resetCode}`;
    //determine the center of the terminal if text needs to be centered
    if (isCentered) {
        const terminalWidth = process.stdout.columns || 80; // Default to 80 columns if unable to determine terminal width
        const spacesToAdd = Math.max(0, Math.floor((terminalWidth - text.length) / 2));
        const centeredBuffer = ' '.repeat(spacesToAdd);
        process.stdout.write(centeredBuffer);
    }
    // type out letters one at a time
    async function printNextLetter() {
        if (index < text.length) {
            process.stdout.write(text.charAt(index));
            index++;
            await new Promise(resolve => setTimeout(resolve, interval)); // Await the setTimeout
            await printNextLetter(); // Recursively call itself
        }
    }
    await printNextLetter();
}
exports.typeText = typeText;
/**
 * prints out the given text with green color on the console.
 * @param input The text to be printed green.
 */
function printGreen(input) {
    const text = `\x1b[38;5;${textColor.green}m${input}${resetCode}`;
    printText(text);
}
exports.printGreen = printGreen;
/**
 * prints out the given text with red color on the console.
 * @param input The text to be printed red.
 */
function printRed(input) {
    const text = `\x1b[38;5;${textColor.red}m${input}${resetCode}`;
    printText(text);
}
exports.printRed = printRed;
/**
 * prints out the given text with blue color on the console.
 * @param input The text to be printed blue.
 */
function printBlue(input) {
    const text = `\x1b[38;5;${textColor.blue}m${input}${resetCode}`;
    printText(text);
}
exports.printBlue = printBlue;
/**
 * prints out the given text with white color on the console.
 * @param input The text to be printed white.
 */
function printWhite(input) {
    const text = `\x1b[38;5;${textColor.white}m${input}${resetCode}`;
    printText(text);
}
exports.printWhite = printWhite;
/**
 * prints out the given text with dark green color on the console.
 * @param input The text to be printed dark green.
 */
function printDarkGreen(input) {
    const text = `\x1b[38;5;${textColor.darkGreen}m${input}${resetCode}`;
    printText(text);
}
exports.printDarkGreen = printDarkGreen;
/**
 * prints out the given text with cyan color on the console.
 * @param input The text to be printed cyan.
 */
function printCyan(input) {
    const text = `\x1b[38;5;${textColor.cyan}m${input}${resetCode}`;
    printText(text);
}
exports.printCyan = printCyan;
/**
 * Helper function to print out a char and then wait 35 ms
 * @param text The text to print out one char at a time.
 */
async function printText(text) {
    for (const char of text) {
        process.stdout.write(char);
        (0, sleepSync_1.sleepSync)(35);
    }
}
exports.printText = printText;
