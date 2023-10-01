"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asciArt_1 = require("./asciArt");
const CommandMenu_1 = require("./CommandMenu");
let debugMode = false;
/////////////////////////////////////
const mainMenu = new CommandMenu_1.CommandMenu();
mainMenu.setMenuMessage("This is the test menu message");
// Add menu options and their associated actions
mainMenu.addOption('Option 1', () => {
    console.log('You selected Option 1.');
});
mainMenu.addOption('Option 2', () => {
    console.log('You selected Option 2.');
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
    //await scripts.message_intro();
    //await scripts.message_inputValidation();
    //await scripts.sortLoop();
    await mainMenu.start();
    (0, asciArt_1.printAuthor)();
}
main();
