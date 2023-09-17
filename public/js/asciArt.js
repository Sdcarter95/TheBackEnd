"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printAuthor = exports.printTitle = exports.title = exports.author = void 0;
const app_1 = require("./app");
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
function printTitle() {
    for (let index = 0; index < exports.title.length; index++) {
        const character = exports.title[index];
        if (character == "█") {
            printDarkGreen(exports.title[index]);
        }
        else {
            printGreen(exports.title[index]);
        }
    }
}
exports.printTitle = printTitle;
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
function printGreen(input) {
    const text = `\x1b[38;5;${app_1.textColor.green}m${input}${resetCode}`;
    process.stdout.write(text);
}
function printDarkGreen(input) {
    const text = `\x1b[38;5;${app_1.textColor.white}m${input}${resetCode}`;
    process.stdout.write(text);
}
