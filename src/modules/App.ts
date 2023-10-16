/**
 * File: App.ts
 * Author: Seth Carter
 * Description: This contains the main logic for the BackEnd app. Aside from the main function, it also sets up the main menu before launch.
 * Date: 10/14/2023
 */

import { printAuthor} from './constants/asciArt';
import * as scripts from "./Scripts"
import { CommandMenu } from './CommandMenu';
import { clearScreen } from './helperFunctions/clearScreen';
import fs from 'fs';


export type PersonInfo = {
    fName: string;
    licenseType: string;
};


export const dataPath = 'flatData.json';
const mainMenu = new CommandMenu();

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
    clearScreen();
    if(!fs.existsSync(dataPath)){
        await scripts.message_intro();
    }
    await scripts.checkData();
    await mainMenu.start();
    printAuthor();
}


main();



