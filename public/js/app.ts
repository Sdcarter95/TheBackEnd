import { resolve } from "path";
import { stdout } from "process";
import * as readline from 'readline';
import { printAuthor, printTitle } from './asciArt';
import { quickSort} from "./sortingAlgs";


let name = "Recruiter";
let fullName = "Recruiter";
let debugMode = true;

// text speed is measured in ms intervals
enum textSpeed {
    slow = 200,
    medium = 90,
    fast = 50,
    very_fast = 35,
    uber_speed = 15
}

// textcodes corespond to the format: '\x1b[38;5;<color_number>m'
export enum textColor {
    green = 40,
    darkGreen = 22,
    blue = 27,
    red = 196,
    white = 15,
    cyan = 45,
    yellow = 226
}



let inputAllowed = false; // Flag to control input
function newReadLine(): readline.Interface {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return rl;
}


async function typeText(text: string, speed: textSpeed, isCentered: boolean, colorCode: number = 0) {
    let index = 0;
    const interval = speed; // Adjust the interval (in milliseconds) as needed
    const resetCode = '\x1b[0m'; // Reset code is to set text color to default after colored text is printed
    text = `\x1b[38;5;${colorCode}m${text}${resetCode}`;


    //determine the center of the terminal if text needs to be centered
    if (isCentered) {
        const terminalWidth = process.stdout.columns || 80; // Default to 80 columns if unable to determine terminal width
        const spacesToAdd = Math.max(0, Math.floor((terminalWidth - text.length) / 2));
        const centeredBuffer = ' '.repeat(spacesToAdd);
        process.stdout.write(centeredBuffer);
    }

    // type out letters one at a time
    async function printNextLetter() {
        if (index < text.length) {
            process.stdout.write(text.charAt(index));
            index++;
            await new Promise(resolve => setTimeout(resolve, interval)); // Await the setTimeout
            await printNextLetter(); // Recursively call itself
        }
    }

    await printNextLetter();
}

function clearScreen() {
    process.stdout.write('\x1b[2J\x1b[0f');
}

function getUserInput(rl: readline.Interface): Promise<string> {
    return new Promise((resolve) => {
        rl.question('> ', (input) => {
            resolve(input);
        });
    });
}


//The idea behind question one is to extrapalate as much information about the name given as possible.
async function question_1(): Promise<string[]> {

    let q1_Input = newReadLine();
    const userInput = await getUserInput(q1_Input);
    q1_Input.close();

    const nameArray = userInput.split(' ');
    name = nameArray[0];
    fullName = userInput;
    return nameArray;
}

function containsBlacklistedCharacters(inputString: string, charBlackList: string[]): boolean {
    for (const char of charBlackList) {
        if (inputString.includes(char)) {
            return true; // The input string contains a blacklisted character
        }
    }
    return false; // None of the blacklisted characters were found in the input string
}

function stringToAsciiArray(input: string): number[] {
    const asciiArray: number[] = [];

    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);
        asciiArray.push(charCode);
    }

    return asciiArray;
}



async function main() {
    clearScreen();

    if (!debugMode) {
        await typeText("Welcome to the back end", textSpeed.medium, true, textColor.green);

        printTitle();
        await typeText("\n\nThe purpose of this program is to demonstrate how I (Seth Carter) would handle a variety of programming tasks; An interactive mind map to showcase my knowledge and give you (the recruiter) insight into my approach to problem solving. ", textSpeed.very_fast, false, textColor.green);
    }

    let questonOneDone = false;
    if (debugMode) questonOneDone = true;

    while (!questonOneDone) {
        await typeText("\n\nLet’s start out simple: What is your", textSpeed.fast, false, textColor.green);
        process.stdout.write(" name");
        await typeText("?\n\n", textSpeed.uber_speed, false, textColor.green);

        let nameArray = await question_1();
        let nameLimit = 10; //char limit for first names
        const charBlackList = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}'];

        //check for blank input
        if (nameArray[0].trim() == "") {
            name = "Recruiter"
            await typeText("\nNot the very trusting sort, are you recruiter?", textSpeed.very_fast, false, textColor.green);
            await typeText("\nI suppose you can never be too careful in this day in age", textSpeed.very_fast, false, textColor.green);
            await typeText(", which is why input validation is so important!", textSpeed.very_fast, false, textColor.green);
            await typeText("(I’m also skilled in the art of segways)\n", textSpeed.very_fast, false, textColor.green);
        }

        //otherwise print normal response
        else {
            await typeText("\nNice to meet you, " + name + "!", textSpeed.very_fast, false, textColor.green);
            if (nameArray[0].length > nameLimit || containsBlacklistedCharacters(fullName, charBlackList) || nameArray.length > 3) {
                await typeText("\n(Although I doubt that's your real name...)", textSpeed.very_fast, false, textColor.green);
                await typeText("\n\nWhatever your name may be, let’s talk a little bit about input validation.", textSpeed.very_fast, false, textColor.green);
            }
            else {
                await typeText("\n\nNow that we’re on a first name basis, let’s talk a little bit about input validation.", textSpeed.very_fast, false, textColor.green);
            }
        }

        await typeText("\nThere are some things I can infer based on your provided input:\n\n", textSpeed.very_fast, false, textColor.green);

        let inferenceCount = 0;

        //check number of words
        if (nameArray.length == 1) {
            if (nameArray[0] == "") {
                inferenceCount++;
                await typeText(inferenceCount + ". You did not provide a name. Maybe you got hasty, or maybe you’re testing my program? Whatever the case, you'll have a chance to change it! Alas, if you insist on keeping your secrets I can just call you Recruiter\n", textSpeed.very_fast, false, textColor.green);
            }
            else {
                inferenceCount++;
                await typeText(inferenceCount + ". " + nameArray[0] + " is your intended first name. And what a great name!\n", textSpeed.very_fast, false, textColor.green);
            }

            //check length
            if (nameArray[0].length <= nameLimit) {
                inferenceCount++;
                await typeText(inferenceCount + ". The name you entered is not longer than 10 characters (Sorry Bartholomew)\n", textSpeed.very_fast, false, textColor.green);
            }
            else {
                inferenceCount++;
                await typeText(inferenceCount + ". " + nameArray[0] + " is probably not your real name, as it is longer than 10 characters. (Or maybe you just have a fancy name).\n", textSpeed.very_fast, false, textColor.green);
            }

        }
        else if (nameArray.length == 2) {
            inferenceCount++;
            await typeText(inferenceCount + ". " + nameArray[0] + " is your first name\n", textSpeed.very_fast, false, textColor.green);
            inferenceCount++;
            await typeText(inferenceCount + ". " + nameArray[1] + " is your last name\n", textSpeed.very_fast, false, textColor.green);

            //check length
            if (nameArray[0].length <= nameLimit && nameArray[1].length <= nameLimit) {
                inferenceCount++;
                await typeText(inferenceCount + ". the names you entered are a reasonable length. (Sorry Bartholomew)\n", textSpeed.very_fast, false, textColor.green);
            }
            else {
                inferenceCount++;
                await typeText(inferenceCount + ". Your input is probably not your real name, as it contains an entry longer than 10 characters. (Or maybe you just have a fancy name).\n", textSpeed.very_fast, false, textColor.green);
            }
        }

        else if (nameArray.length == 3) {
            inferenceCount++;
            await typeText(inferenceCount + ". " + nameArray[0] + " is your first name\n", textSpeed.very_fast, false, textColor.green);
            inferenceCount++;
            await typeText(inferenceCount + ". " + nameArray[1] + " is your middle name\n", textSpeed.very_fast, false, textColor.green);
            inferenceCount++;
            await typeText(inferenceCount + ". " + nameArray[2] + " is your last name\n", textSpeed.very_fast, false, textColor.green);

            //check length
            if (nameArray[0].length <= nameLimit && nameArray[1].length <= nameLimit && nameArray[2].length <= nameLimit) {
                inferenceCount++;
                await typeText(inferenceCount + ". the names you entered are a reasonable length. (Sorry Bartholomew)\n", textSpeed.very_fast, false, textColor.green);
            }
            else {
                inferenceCount++;
                await typeText(inferenceCount + ". Your input is probably not your real name, as it contains an entry longer than 10 characters. (Or maybe you just have a fancy name).\n", textSpeed.very_fast, false, textColor.green);
            }
        }

        else {
            inferenceCount++;
            await typeText(inferenceCount + ". You did not enter a name, as there are more than three detected words.\n", textSpeed.uber_speed, false, textColor.green);
        }

        //check blacklist 
        if (containsBlacklistedCharacters(fullName, charBlackList)) {
            inferenceCount++;
            await typeText(inferenceCount + ". There are blacklisted characters in your input! I've got my eye on you!\n", textSpeed.very_fast, false, textColor.green);
        }
        else {
            inferenceCount++;
            await typeText(inferenceCount + ". There are no blacklisted characters in your input.\n", textSpeed.very_fast, false, textColor.green);
        }


        await typeText(`\nThe last point is extra important! \n\nBlacklisting is a tool used to make sure input does not contain illegal characters. This is important when protecting against SQL injections and other hacking shenanigans.\n`, textSpeed.very_fast, false, textColor.green);
        await typeText("\n Before we continue " + name + ", would you like to try a different name? (Select a number)\n\n", textSpeed.very_fast, false, textColor.green);
        await typeText("1. Yes\n2. No\n3. Just get on with it\n", textSpeed.uber_speed, false, textColor.green);


        let renameReader = newReadLine();
        const renameChoice = await getUserInput(renameReader);
        renameReader.close();

        switch (renameChoice) {
            case "1":
                clearScreen();
                await typeText("\n I'll just wipe my memory...\n", textSpeed.very_fast, false, textColor.green);
                break;
            case "2":
                clearScreen();
                questonOneDone = true;
                break;
            case "3":
                clearScreen();
                questonOneDone = true;
                break;
            default:
                clearScreen();
                await typeText("\nOh, very funny!", textSpeed.very_fast, false, textColor.green);
                await typeText("\nYou’re testing input validation on a question asking if you want to continue testing input validation. ", textSpeed.very_fast, false, textColor.green);
                await typeText("But you’ve fallen right into my trap!", textSpeed.very_fast, false, textColor.green);
                questonOneDone = true;
                break;
        }
    }

    if (!debugMode) {
        await typeText("\n\nThe method I just used is called whitelisting, wherein I only allow a specific number of inputs (i.e. 1, 2, or 3)\n", textSpeed.very_fast, false, textColor.green);
        await typeText("\nThis is different from the blacklisting methods I used earlier.\n\nA non CMD Prompt example of whitelisting is a dropdown box on the front end with predefined values to select.", textSpeed.very_fast, false, textColor.green);
        await typeText(` But enough about the front end! we’re in\n`, textSpeed.very_fast, false, textColor.green);
        printTitle();
        await typeText(`\n\nSo let's not get distracted.\n`, textSpeed.very_fast, false, textColor.green);
    }
    process.stdout.write(quickSort(fullName));

    //end of app
    printAuthor();
}


main();