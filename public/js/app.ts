import { printAuthor } from './asciArt';
import * as scripts from "./scripts"
import { CommandMenu } from './CommandMenu';


let debugMode = false;


export type PersonInfo = {
    fName: string;
    licenseType: string;
};




/////////////////////////////////////
const menu = new CommandMenu();


// Add menu options and their associated actions
menu.addOption('Option 1', () => {
    console.log('You selected Option 1.');
});

menu.addOption('Option 2', () => {
    console.log('You selected Option 2.');
});

menu.addOption('Submenu', async () => {
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
    await scripts.message_inputValidation();
    await scripts.sortLoop();

    //await menu.start();
    printAuthor();
}


main();



