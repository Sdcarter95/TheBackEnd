"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.textColor = void 0;
const readline = __importStar(require("readline"));
const asciArt_1 = require("./asciArt");
let name = "Recruiter";
// text speed is measured in ms intervals
var textSpeed;
(function (textSpeed) {
    textSpeed[textSpeed["slow"] = 200] = "slow";
    textSpeed[textSpeed["medium"] = 90] = "medium";
    textSpeed[textSpeed["fast"] = 50] = "fast";
    textSpeed[textSpeed["very_fast"] = 35] = "very_fast";
    textSpeed[textSpeed["uber_speed"] = 15] = "uber_speed";
})(textSpeed || (textSpeed = {}));
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
})(textColor || (exports.textColor = textColor = {}));
let inputAllowed = false; // Flag to control input
function newReadLine() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return rl;
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
function clearScreen() {
    process.stdout.write('\x1b[2J\x1b[0f');
}
function getUserInput(rl) {
    return new Promise((resolve) => {
        rl.question('> ', (input) => {
            resolve(input);
        });
    });
}
//The idea behind question one is to extrapalate as much information about the name given as possible.
async function question_1() {
    let q1_Input = newReadLine();
    const userInput = await getUserInput(q1_Input);
    q1_Input.close();
    const nameArray = userInput.split(' ');
    name = nameArray[0];
    return nameArray;
}
async function main() {
    clearScreen();
    await typeText("Welcome to the back end", textSpeed.medium, true, textColor.green);
    (0, asciArt_1.printTitle)();
    await typeText("\n\nThe purpose of this program is to demonstrate how I (Seth Carter) would handle a variety of tasks in the back end; An interactive mind map to showcase my knowledge and give you (the recruiter) insight into my approach to problem solving. ", textSpeed.very_fast, false, textColor.green);
    await typeText("\n\nLet’s start out simple: What is your", textSpeed.fast, false, textColor.green);
    process.stdout.write(" name");
    await typeText("?\n\n", textSpeed.uber_speed, false, textColor.green);
    let nameArray = await question_1();
    //check for blank input
    if (nameArray[0].trim() == "") {
        name = "Recruiter";
        await typeText("\nNot the very trusting sort, are you recruiter?", textSpeed.very_fast, false, textColor.green);
        await typeText("\nI suppose you can never be too careful in this day in age", textSpeed.very_fast, false, textColor.green);
        await typeText(", which is why input validation is so important! (I’m also skilled in the art of segways)\n", textSpeed.very_fast, false, textColor.green);
    }
    //otherwise print normal response
    else {
        await typeText("\nNice to meet you, " + name + "!", textSpeed.very_fast, false, textColor.green);
        await typeText("\n\nNow that we’re on a first name basis, let’s talk a little bit about input validation.", textSpeed.very_fast, false, textColor.green);
    }
    await typeText("\nThere are some things I can infer based on your provided input:\n\n", textSpeed.very_fast, false, textColor.green);
    let inferenceCount = 1;
    if (nameArray.length == 1) {
        if (nameArray[0] == "") {
            await typeText(inferenceCount + ". You did not provide a name. Don't worry, you'll have a chance to change it! Alas, if you insist on keeping your secrets I'll just call you Recruiter\n", textSpeed.very_fast, false, textColor.green);
        }
    }
    //end of app
    (0, asciArt_1.printAuthor)();
}
main();
