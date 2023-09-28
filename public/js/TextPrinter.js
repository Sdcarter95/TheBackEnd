"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeText = exports.printCyan = exports.printDarkGreen = exports.printWhite = exports.printBlue = exports.printRed = exports.printGreen = exports.textColor = exports.textSpeed = void 0;
// text speed is measured in ms intervals
var textSpeed;
(function (textSpeed) {
    textSpeed[textSpeed["slow"] = 200] = "slow";
    textSpeed[textSpeed["medium"] = 90] = "medium";
    textSpeed[textSpeed["fast"] = 50] = "fast";
    textSpeed[textSpeed["very_fast"] = 35] = "very_fast";
    textSpeed[textSpeed["uber_speed"] = 15] = "uber_speed";
})(textSpeed = exports.textSpeed || (exports.textSpeed = {}));
// textcodes corespond to the format: '\x1b[38;5;<color_number>m'
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
function printGreen(input) {
    const text = `\x1b[38;5;${textColor.green}m${input}${resetCode}`;
    printText(text);
}
exports.printGreen = printGreen;
function printRed(input) {
    const text = `\x1b[38;5;${textColor.red}m${input}${resetCode}`;
    printText(text);
}
exports.printRed = printRed;
function printBlue(input) {
    const text = `\x1b[38;5;${textColor.blue}m${input}${resetCode}`;
    printText(text);
}
exports.printBlue = printBlue;
function printWhite(input) {
    const text = `\x1b[38;5;${textColor.white}m${input}${resetCode}`;
    printText(text);
}
exports.printWhite = printWhite;
function printDarkGreen(input) {
    const text = `\x1b[38;5;${textColor.darkGreen}m${input}${resetCode}`;
    printText(text);
}
exports.printDarkGreen = printDarkGreen;
function printCyan(input) {
    const text = `\x1b[38;5;${textColor.cyan}m${input}${resetCode}`;
    printText(text);
}
exports.printCyan = printCyan;
function sleepSync(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Busy-wait until the desired time has passed
    }
}
async function printText(text) {
    for (const char of text) {
        process.stdout.write(char);
        sleepSync(35);
    }
}
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
