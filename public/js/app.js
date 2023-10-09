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
const asciArt_1 = require("./asciArt");
const scripts = __importStar(require("./scripts"));
const CommandMenu_1 = require("./CommandMenu");
const TextPrinter_1 = require("./TextPrinter");
let debugMode = false;
/////////////////////////////////////
const mainMenu = new CommandMenu_1.CommandMenu();
mainMenu.setMenuQuestion("Please select a topic");
mainMenu.addOption('Sorting Algorithms ', async () => {
    await scripts.menu_Sorts();
});
mainMenu.addOption('Input', async () => {
    await scripts.menu_input();
    //await scripts.message_inputValidation();
});
mainMenu.addOption('Testing', async () => {
    //TODO
    await (0, TextPrinter_1.typeText)("Implement", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
});
mainMenu.addOption('Data Storage', async () => {
    //TODO
    await (0, TextPrinter_1.typeText)("Implement", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
});
//////////////////////////////////////////
function clearScreen() {
    process.stdout.write('\x1b[2J\x1b[0f');
}
async function main() {
    clearScreen();
    await scripts.message_intro();
    await scripts.checkData();
    await mainMenu.start();
    (0, asciArt_1.printAuthor)();
}
main();
