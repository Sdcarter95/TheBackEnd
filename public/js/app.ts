import { printAuthor, printTitle } from './asciArt';
import * as scripts from "./scripts"
import { CommandMenu } from './CommandMenu';
import { textColor, textSpeed, typeText } from './TextPrinter';


let debugMode = false;


export type PersonInfo = {
    fName: string;
    licenseType: string;
};




/////////////////////////////////////
const mainMenu = new CommandMenu();

mainMenu.setMenuQuestion("Please select a topic:");
mainMenu.addOption('Sorting Algorithms', async () => {
    await scripts.menu_sorts();
});

mainMenu.addOption('Input', async () => {
    await scripts.menu_input();
});



/**
 * mainMenu.addOption("Design patterns", async () => {
    await scripts.menu_designPatterns();
});
 * 
 * mainMenu.addOption('Testing', async () => {
    //TODO
    await typeText("Implement", textSpeed.very_fast, false, textColor.green);
});

mainMenu.addOption('Data Storage', async () => {
    //TODO
    await typeText("Implement", textSpeed.very_fast, false, textColor.green);
});
 * 
 */


//////////////////////////////////////////

function clearScreen() {
    process.stdout.write('\x1b[2J\x1b[0f');
}

async function main() {
    clearScreen();
    await scripts.message_intro();
    await scripts.checkData();
    await mainMenu.start();
    printAuthor();
}


main();



