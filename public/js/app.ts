import { printAuthor} from './asciArt';
import * as scripts from "./scripts"


let debugMode = false;


export type PersonInfo = {
    fName: string;
    licenseType: string;
};




async function main() {
    clearScreen();

    await scripts.message_intro();
    await scripts.message_inputValidation();
    await scripts.sortLoop();

    //end of app
    printAuthor();
}




function clearScreen() {
    process.stdout.write('\x1b[2J\x1b[0f');
}



main();