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
let debugMode = false;
/////////////////////////////////////
const mainMenu = new CommandMenu_1.CommandMenu();
mainMenu.setMenuMessage("This is the backend catalog. Select what topic you would like to discuss and we can get started.");
mainMenu.addOption('Sorting Algorithms ', async () => {
    await scripts.sortLoop();
});
mainMenu.addOption('Input', async () => {
    await scripts.message_inputValidation();
});
mainMenu.addOption('Submenu', async () => {
    const submenu = new CommandMenu_1.CommandMenu();
    submenu.addOption('Suboption 1', () => {
        console.log('You selected Suboption 1.');
    });
    submenu.addOption('Suboption 2', () => {
        console.log('You selected Suboption 2.');
    });
    await submenu.start();
});
//////////////////////////////////////////
function clearScreen() {
    process.stdout.write('\x1b[2J\x1b[0f');
}
async function main() {
    clearScreen();
    await scripts.message_intro();
    await scripts.askForName();
    await mainMenu.start();
    (0, asciArt_1.printAuthor)();
}
main();
