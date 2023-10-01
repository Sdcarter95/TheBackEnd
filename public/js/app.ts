import { printAuthor } from './asciArt';
import * as scripts from "./scripts"
import { CommandMenu } from './CommandMenu';


let debugMode = false;


export type PersonInfo = {
    fName: string;
    licenseType: string;
};




/////////////////////////////////////
const mainMenu = new CommandMenu();

mainMenu.setMenuMessage("This is the backend catalog. Select what topic you would like to discuss and we can get started.");
mainMenu.addOption('Sorting Algorithms ', async () => {
    await scripts.sortLoop();
});

mainMenu.addOption('Input', async () => {
    await scripts.message_inputValidation();
});

mainMenu.addOption('Submenu', async () => {
    const submenu = new CommandMenu();
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
    printAuthor();
}


main();



