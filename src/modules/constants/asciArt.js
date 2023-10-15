"use strict";
/**
 * File: asciArt.ts
 * Author: Seth Carter
 * Description: This file contains constants for the asci art to be printed in CMD.
 * Date: 10/14/2023
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.printAuthor = exports.printTitle = exports.title = exports.author = void 0;
const TextPrinter_1 = require("../TextPrinter");
const resetCode = '\x1b[0m'; // Reset code is to set text color to default after colored text is printed
exports.author = `\n\n
╭╮╱╱╱╱╱╱╭━━━╮╱╱╭╮╭╮╱╱╭━━━╮╱╱╱╱╭╮
┃┃╱╱╱╱╱╱┃╭━╮┃╱╭╯╰┫┃╱╱┃╭━╮┃╱╱╱╭╯╰╮
┃╰━┳╮╱╭╮┃╰━━┳━┻╮╭┫╰━╮┃┃╱╰╋━━┳┻╮╭╋━━┳━╮
┃╭╮┃┃╱┃┃╰━━╮┃┃━┫┃┃╭╮┃┃┃╱╭┫╭╮┃╭┫┃┃┃━┫╭╯
┃╰╯┃╰━╯┃┃╰━╯┃┃━┫╰┫┃┃┃┃╰━╯┃╭╮┃┃┃╰┫┃━┫┃
╰━━┻━╮╭╯╰━━━┻━━┻━┻╯╰╯╰━━━┻╯╰┻╯╰━┻━━┻╯
╱╱╱╭━╯┃
╱╱╱╰━━╯`;
exports.title = `\n
████████╗██╗░░██╗███████╗  ██████╗░░█████╗░░█████╗░██╗░░██╗  ███████╗███╗░░██╗██████╗░
╚══██╔══╝██║░░██║██╔════╝  ██╔══██╗██╔══██╗██╔══██╗██║░██╔╝  ██╔════╝████╗░██║██╔══██╗
░░░██║░░░███████║█████╗░░  ██████╦╝███████║██║░░╚═╝█████═╝░  █████╗░░██╔██╗██║██║░░██║
░░░██║░░░██╔══██║██╔══╝░░  ██╔══██╗██╔══██║██║░░██╗██╔═██╗░  ██╔══╝░░██║╚████║██║░░██║
░░░██║░░░██║░░██║███████╗  ██████╦╝██║░░██║╚█████╔╝██║░╚██╗  ███████╗██║░╚███║██████╔╝
░░░╚═╝░░░╚═╝░░╚═╝╚══════╝  ╚═════╝░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝  ╚══════╝╚═╝░░╚══╝╚═════╝░`;
/**
 * Prints the "Back End" asci title.
 */
function printTitle() {
    for (let index = 0; index < exports.title.length; index++) {
        const character = exports.title[index];
        if (character == "█") {
            printWhite(exports.title[index]);
        }
        else {
            printGreen(exports.title[index]);
        }
    }
}
exports.printTitle = printTitle;
/**
 * Prints the author asci art.
 */
function printAuthor() {
    for (let index = 0; index < exports.author.length; index++) {
        const character = exports.author[index];
        if (character == "╱") {
            printDarkGreen(exports.author[index]);
        }
        else {
            printGreen(exports.author[index]);
        }
    }
}
exports.printAuthor = printAuthor;
/**
 * helper function to print given characters in the green color.
 * @param input the chars to print green
 */
function printGreen(input) {
    const text = `\x1b[38;5;${TextPrinter_1.textColor.green}m${input}${resetCode}`;
    process.stdout.write(text);
}
/**
 * helper function to print given characters in the white color.
 * @param input the chars to print white
 */
function printWhite(input) {
    const text = `\x1b[38;5;${TextPrinter_1.textColor.white}m${input}${resetCode}`;
    process.stdout.write(text);
}
/**
 * helper function to print given characters in the dark green color.
 * @param input the chars to print dark green
 */
function printDarkGreen(input) {
    const text = `\x1b[38;5;${TextPrinter_1.textColor.darkGreen}m${input}${resetCode}`;
    process.stdout.write(text);
}
