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
exports.textColor = void 0;
const readline = __importStar(require("readline"));
const asciArt_1 = require("./asciArt");
const sortingAlgs_1 = require("./sortingAlgs");
let name = "Recruiter";
let fullName = "Recruiter";
let debugMode = true;
// text speed is measured in ms intervals
var textSpeed;
(function (textSpeed) {
    textSpeed[textSpeed["slow"] = 200] = "slow";
    textSpeed[textSpeed["medium"] = 90] = "medium";
    textSpeed[textSpeed["fast"] = 50] = "fast";
    textSpeed[textSpeed["very_fast"] = 35] = "very_fast";
    textSpeed[textSpeed["uber_speed"] = 15] = "uber_speed";
})(textSpeed || (textSpeed = {}));
// textcodes corespond to the format: '\x1b[38;5;<color_number>m'
var textColor;
(function (textColor) {
    textColor[textColor["green"] = 40] = "green";
    textColor[textColor["darkGreen"] = 22] = "darkGreen";
    textColor[textColor["blue"] = 27] = "blue";
    textColor[textColor["red"] = 196] = "red";
    textColor[textColor["white"] = 15] = "white";
    textColor[textColor["cyan"] = 45] = "cyan";
    textColor[textColor["yellow"] = 226] = "yellow";
})(textColor = exports.textColor || (exports.textColor = {}));
function newReadLine() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return rl;
}
async function typeText(text, speed, isCentered, colorCode = 0) {
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
function getUserInput(rl) {
    return new Promise((resolve) => {
        rl.question('> ', (input) => {
            resolve(input);
        });
    });
}
//The idea behind question one is to extrapalate as much information about the name given as possible.
async function question_1() {
    let q1_Input = newReadLine();
    const userInput = await getUserInput(q1_Input);
    q1_Input.close();
    const nameArray = userInput.split(' ');
    name = nameArray[0];
    fullName = userInput;
    return nameArray;
}
function containsBlacklistedCharacters(inputString, charBlackList) {
    for (const char of charBlackList) {
        if (inputString.includes(char)) {
            return true; // The input string contains a blacklisted character
        }
    }
    return false; // None of the blacklisted characters were found in the input string
}
function stringToAsciiArray(input) {
    const asciiArray = [];
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
        (0, asciArt_1.printTitle)();
        await typeText("\n\nThe purpose of this program is to demonstrate how I (Seth Carter) would handle a variety of programming tasks; An interactive mind map to showcase my knowledge and give you (the recruiter) insight into my approach to problem solving. ", textSpeed.very_fast, false, textColor.green);
    }
    let questonOneDone = false;
    if (debugMode)
        questonOneDone = true;
    while (!questonOneDone) {
        await typeText("\n\nLet’s start out simple: What is your", textSpeed.fast, false, textColor.green);
        process.stdout.write(" name");
        await typeText("?\n\n", textSpeed.uber_speed, false, textColor.green);
        let nameArray = await question_1();
        let nameLimit = 10; //char limit for first names
        const charBlackList = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}'];
        //check for blank input
        if (nameArray[0].trim() == "") {
            name = "Recruiter";
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
                //clearScreen();
                questonOneDone = true;
                break;
            case "3":
                //clearScreen();
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
        await typeText("\n\nA non CMD Prompt example of whitelisting is a dropdown box on the front end with predefined values to select.", textSpeed.very_fast, false, textColor.green);
        await typeText(` But enough about the front end! we’re in\n`, textSpeed.very_fast, false, textColor.green);
        (0, asciArt_1.printTitle)();
        await typeText(`\n\nSo let's not get distracted.\n`, textSpeed.very_fast, false, textColor.green);
    }
    let sortLoop = true;
    while (sortLoop) {
        await typeText(`\n\nWhich sorting algorithm do you want to learn about?\n`, textSpeed.very_fast, false, textColor.green);
        await typeText(`\n\n1. Merge Sort\n2. Quick Sort\n3. nothing\n`, textSpeed.uber_speed, false, textColor.green);
        let sortReader = newReadLine();
        let sortChoice = await getUserInput(sortReader);
        sortReader.close();
        switch (sortChoice) {
            case "1":
                await typeText("\n\nMerge sort has a great best-case time complexity of nlogn, and allows for more deterministic/reliable time predictions when compared to quicksort (which uses random pivots).", textSpeed.very_fast, false, textColor.green);
                await typeText("\n\nIt retains relative positions of identical values, and so is useful when stability is paramount.", textSpeed.very_fast, false, textColor.green);
                let mergeSortLoop = true;
                while (mergeSortLoop) {
                    await typeText(`\n\nWould you like to know more?`, textSpeed.very_fast, false, textColor.green);
                    await typeText(`\n\n1. Show me in action\n2. When to use mergesort?\n3. Back to other sorts\n`, textSpeed.uber_speed, false, textColor.green);
                    let mergeSortReader = newReadLine();
                    let mergeSortChoice = await getUserInput(mergeSortReader);
                    mergeSortReader.close();
                    switch (mergeSortChoice) {
                        case "1":
                            await typeText(`\nAnd we're left with your sorted name: ${(0, sortingAlgs_1.mergeSort)(name.toLocaleLowerCase())}`, textSpeed.very_fast, false, textColor.green);
                            break;
                        case "2":
                            await typeText("\n\nSay you, me, and some other grumpy people are waiting at the dmv. First we take everyone’s names and ask what they need:\n\n", textSpeed.very_fast, false, textColor.green);
                            let dmv = [];
                            dmv.push({ fName: "Seth", licenseType: "A" });
                            dmv.push({ fName: "Jeff", licenseType: "B" });
                            dmv.push({ fName: name, licenseType: "C" });
                            dmv.push({ fName: "Jack", licenseType: "C" });
                            dmv.push({ fName: "Zack", licenseType: "A" });
                            dmv.push({ fName: "Jenny", licenseType: "B" });
                            dmv.push({ fName: "Becka", licenseType: "B" });
                            dmv.push({ fName: "Daisy", licenseType: "A" });
                            dmv.push({ fName: "Lenny", licenseType: "C" });
                            dmv.forEach((patron) => {
                                console.log(patron.fName + " needs a class " + patron.licenseType + " license");
                            });
                            await typeText("\nNow, everyone is claiming they were there first. What a headache! We decide the only fair way to see people is in alphabetical order.", textSpeed.very_fast, false, textColor.green);
                            await typeText(" We want to get started right away, so we use heapsort. This leaves us with:\n", textSpeed.very_fast, false, textColor.green);
                            const dmv_Alph = (0, sortingAlgs_1.heapSort)(dmv, "fName");
                            const maxNameLength = Math.max(...dmv.map((person) => person.fName.length));
                            dmv_Alph.forEach((patron) => {
                                const padding = ' '.repeat(maxNameLength - patron.fName.length);
                                console.log(`${patron.fName}${padding}: ${patron.licenseType}`);
                            });
                            await typeText("\nIt was almost easy, but it turns out it takes longer to process class C licenses than to process class B licenses. ", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nWe decide to use heap sort on our new array, this time sorting by license type:\n", textSpeed.very_fast, false, textColor.green);
                            const wrongSort = (0, sortingAlgs_1.heapSort)([...dmv_Alph], "licenseType");
                            wrongSort.forEach((patron) => {
                                const padding = ' '.repeat(maxNameLength - patron.fName.length);
                                console.log(`${patron.fName}${padding}: ${patron.licenseType}`);
                            });
                            await typeText("\nOh no! Now the licenses are in order but our work sorting names alphabetically has been destroyed! \n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nYou see, If we had used a stable sorting algorithm like Merge Sort, we could have kept relative positions of names intact: \n", textSpeed.very_fast, false, textColor.green);
                            (0, sortingAlgs_1.stableSort)(dmv_Alph).forEach((patron) => {
                                const padding = ' '.repeat(maxNameLength - patron.fName.length);
                                console.log(`${patron.fName}${padding}: ${patron.licenseType}`);
                            });
                            break;
                        default:
                            mergeSortLoop = false;
                            break;
                    }
                }
                break;
            case "2":
                await typeText("Quicksort is similar to merge sort in terms of its divide and conquer approach, but instead of always dividing a dataset in half, it chooses a pivot and recursively sorts the sides of the dataset that are larger or smaller.\n\n", textSpeed.very_fast, false, textColor.green);
                await typeText(" It retains the best case scenario time complexity of merge sort: (nlogn), but does better with memory: (logn)\n", textSpeed.very_fast, false, textColor.green);
                let quickSortLoop = true;
                while (quickSortLoop) {
                    await typeText(`\n\nWould you like to know more?`, textSpeed.very_fast, false, textColor.green);
                    await typeText(`\n\n1. Show me in action\n2. When to use quicksort?\n3. Back to other sorts\n`, textSpeed.uber_speed, false, textColor.green);
                    let quickSortReader = newReadLine();
                    let quickSortChoice = await getUserInput(quickSortReader);
                    quickSortReader.close();
                    switch (quickSortChoice) {
                        case "1":
                            await typeText("If we were to sort you name alphabetically using quicksort, it would go like this:\n", textSpeed.very_fast, false, textColor.green);
                            const sortedName = (0, sortingAlgs_1.quickSort)(fullName.toLowerCase().replace(/ /g, ''));
                            await typeText("\nAnd now we're left with your new, better sorted name!", textSpeed.very_fast, false, textColor.green);
                            await typeText("I think " + sortedName + " fits you better anyway.", textSpeed.very_fast, false, textColor.green);
                            break;
                        case "2":
                            break;
                        case "3":
                            quickSortLoop = false;
                            break;
                        default:
                            break;
                    }
                }
                break;
            case "3":
                sortLoop = false;
                break;
            default:
                break;
        }
    }
    //end of app
    (0, asciArt_1.printAuthor)();
}
main();
