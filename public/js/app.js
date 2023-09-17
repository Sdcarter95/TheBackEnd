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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
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
    textColor[textColor["blue"] = 27] = "blue";
    textColor[textColor["red"] = 196] = "red";
    textColor[textColor["white"] = 15] = "white";
    textColor[textColor["cyan"] = 45] = "cyan";
    textColor[textColor["yellow"] = 226] = "yellow";
})(textColor || (textColor = {}));
const myName = `
╭╮╱╱╱╱╱╱╭━━━╮╱╱╭╮╭╮╱╱╭━━━╮╱╱╱╱╭╮
┃┃╱╱╱╱╱╱┃╭━╮┃╱╭╯╰┫┃╱╱┃╭━╮┃╱╱╱╭╯╰╮
┃╰━┳╮╱╭╮┃╰━━┳━┻╮╭┫╰━╮┃┃╱╰╋━━┳┻╮╭╋━━┳━╮
┃╭╮┃┃╱┃┃╰━━╮┃┃━┫┃┃╭╮┃┃┃╱╭┫╭╮┃╭┫┃┃┃━┫╭╯
┃╰╯┃╰━╯┃┃╰━╯┃┃━┫╰┫┃┃┃┃╰━╯┃╭╮┃┃┃╰┫┃━┫┃
╰━━┻━╮╭╯╰━━━┻━━┻━┻╯╰╯╰━━━┻╯╰┻╯╰━┻━━┻╯
╱╱╱╭━╯┃
╱╱╱╰━━╯`;
const title = `
████████╗██╗░░██╗███████╗  ██████╗░░█████╗░░█████╗░██╗░░██╗  ███████╗███╗░░██╗██████╗░
╚══██╔══╝██║░░██║██╔════╝  ██╔══██╗██╔══██╗██╔══██╗██║░██╔╝  ██╔════╝████╗░██║██╔══██╗
░░░██║░░░███████║█████╗░░  ██████╦╝███████║██║░░╚═╝█████═╝░  █████╗░░██╔██╗██║██║░░██║
░░░██║░░░██╔══██║██╔══╝░░  ██╔══██╗██╔══██║██║░░██╗██╔═██╗░  ██╔══╝░░██║╚████║██║░░██║
░░░██║░░░██║░░██║███████╗  ██████╦╝██║░░██║╚█████╔╝██║░╚██╗  ███████╗██║░╚███║██████╔╝
░░░╚═╝░░░╚═╝░░╚═╝╚══════╝  ╚═════╝░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝  ╚══════╝╚═╝░░╚══╝╚═════╝░`;
let inputAllowed = false; // Flag to control input
function newReadLine() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return rl;
}
function typeText(text, speed, isCentered, colorCode = 0) {
    return __awaiter(this, void 0, void 0, function* () {
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
        function printNextLetter() {
            return __awaiter(this, void 0, void 0, function* () {
                if (index < text.length) {
                    process.stdout.write(text.charAt(index));
                    index++;
                    yield new Promise(resolve => setTimeout(resolve, interval)); // Await the setTimeout
                    yield printNextLetter(); // Recursively call itself
                }
            });
        }
        yield printNextLetter();
    });
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
function question_1() {
    return __awaiter(this, void 0, void 0, function* () {
        let name = "recruiter";
        let q1_Input = newReadLine();
        const userInput = yield getUserInput(q1_Input);
        q1_Input.close();
        try {
            const nameArray = userInput.split(' ');
            name = nameArray[0];
        }
        catch (_a) {
            console.log("Error!");
        }
        return name;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        clearScreen();
        yield typeText("Welcome to the backend", textSpeed.medium, true, textColor.green);
        process.stdout.write("\n" + title);
        process.stdout.write("\n" + myName);
        yield typeText("\n\nThe purpose of this program is to demonstrate how I (Seth Carter) would handle a variety of tasks in the back end; An interactive mind map to showcase my knowledge and give you (the recruiter) insight into my approach to problem solving. ", textSpeed.very_fast, false, textColor.green);
        yield typeText("\n\nLet’s start out simple:", textSpeed.fast, false, textColor.green);
        yield typeText(" What is your name?\n\n", textSpeed.medium, false, textColor.green);
        let name = yield question_1();
        yield typeText("Nice to meet you, " + name + "!", textSpeed.very_fast, false, textColor.green);
    });
}
main();
