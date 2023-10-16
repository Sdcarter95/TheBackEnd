"use strict";
/**
 * File: App.ts
 * Author: Seth Carter
 * Description: This contains the main logic for the BackEnd app. Aside from the main function, it also sets up the main menu before launch.
 * Date: 10/14/2023
 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataPath = void 0;
const asciArt_1 = require("./constants/asciArt");
const scripts = __importStar(require("./Scripts"));
const CommandMenu_1 = require("./CommandMenu");
const clearScreen_1 = require("./helperFunctions/clearScreen");
const fs_1 = __importDefault(require("fs"));
exports.dataPath = 'flatData.json';
const mainMenu = new CommandMenu_1.CommandMenu();
mainMenu.setMenuQuestion("Please select a topic:");
mainMenu.addOption('Sorting Algorithms', async () => {
    await scripts.menu_sorts();
});
mainMenu.addOption('Input', async () => {
    await scripts.menu_input();
});
mainMenu.addOption("Design patterns", async () => {
    await scripts.menu_designPatterns();
});
// mainMenu.addOption('Testing', async () => {
//     //TODO
//     await typeText("Implement", textSpeed.very_fast, false, textColor.green);
// });
// mainMenu.addOption('Data Storage', async () => {
//     //TODO
//     await typeText("Implement", textSpeed.very_fast, false, textColor.green);
// });
/**
 * The main function that runs the intro script, checks for user data, and then launches the main menu defined above.
 */
async function main() {
    (0, clearScreen_1.clearScreen)();
    if (!fs_1.default.existsSync(exports.dataPath)) {
        await scripts.message_intro();
    }
    await scripts.checkData();
    await mainMenu.start();
    (0, asciArt_1.printAuthor)();
}
main();
