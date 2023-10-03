import * as readline from 'readline';
import { printTitle } from './asciArt';
import { quickSort, heapSort, stableSort, mergeSort } from "./sortingAlgs";
import { typeText, textSpeed, textColor } from "./TextPrinter";
import { PersonInfo } from './app';
import { CommandMenu } from './CommandMenu';


let name = "Recruiter";
let fullName = "Recruiter";
let nameData = ['R', 'e', 'c', 'r', 'u,', 'i', 't', 'e', 'r'];
const fs = require('fs');
const namesFilePath = 'names.json';

export async function askForName() {

    await typeText("\n\nLet’s start out simple: What is your", textSpeed.fast, false, textColor.green);
    process.stdout.write(" name");
    await typeText("?\n\n", textSpeed.uber_speed, false, textColor.green);

    let q1_Input = newReadLine();
    const userInput = await getUserInput(q1_Input);
    q1_Input.close();

    const nameArray = userInput.split(' ');
    name = nameArray[0];
    fullName = userInput;
    nameData = nameArray;

    //const savedName = JSON.parse(fs.readFileSync(namesFilePath, 'utf8'));
    //savedName.push(name);
    fs.writeFileSync(namesFilePath, JSON.stringify(savedName));
    let nameLimit = 10; //char limit for first names
    const charBlackList = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}'];

    //check for blank input
    if (nameArray[0].trim() == "") {
        name = "Recruiter"
        await typeText("\nNot the very trusting sort, are you?", textSpeed.very_fast, false, textColor.green);
        await typeText("\nI suppose you can never be too careful in this day in age", textSpeed.very_fast, false, textColor.green);
        await typeText("\nI'll just call you Recruiter", textSpeed.very_fast, false, textColor.green);
    }

    //otherwise print normal response
    else {
        await typeText("\nNice to meet you, " + name + "!", textSpeed.very_fast, false, textColor.green);
        if (nameArray[0].length > nameLimit || containsBlacklistedCharacters(fullName, charBlackList) || nameArray.length > 3) {
            await typeText("\n(Although I doubt that's your real name...)", textSpeed.very_fast, false, textColor.green);
            await typeText("\n\nWhatever your name may be, let’s get down to buisnes", textSpeed.very_fast, false, textColor.green);
        }
        else {
            await typeText("\n\nNow that we’re on a first name basis, I'll save your name into my memory", textSpeed.very_fast, false, textColor.green);
        }
    }
}

export async function message_intro() {
    await typeText("Welcome to the back end", textSpeed.medium, true, textColor.green);
    printTitle();
    await typeText("\n\nThe purpose of this program is to demonstrate how I (Seth Carter) would handle a variety of programming tasks; An interactive mind map to showcase my knowledge and give you (the recruiter) insight into my approach to problem solving.\n", textSpeed.very_fast, false, textColor.green);

}

export async function menu_input() {
    const inputMenu = new CommandMenu();
    inputMenu.setMenuMessage("Handling input is one of the most important aspects of a user interface. A programmer must think of every sort of input a user can pass. Invalid input, whether it be purposely malicious or simply a mistake, accounts for most of the code in place for decision fields.")
    inputMenu.setMenuQuestion("What would you like to know about input validation?")
    inputMenu.addOption("Types of input validation", async () => {
        //TODO
        await typeText("Implemenet", textSpeed.very_fast, false, textColor.green);
    })
    inputMenu.addOption("Example of input validation", async () => {
        await message_inputValidation();
    })
    await inputMenu.start();
}

export async function message_inputValidation() {
    let inputValidationLoop = true;
    while (inputValidationLoop) {

        let nameArray = nameData;
        let nameLimit = 10; //char limit for first names
        const charBlackList = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}'];



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
                await askForName();
                break;
            case "2":
                inputValidationLoop = false;
                break;
            case "3":
                inputValidationLoop = false;
                break;
            default:
                clearScreen();
                await typeText("\nOh, very funny!", textSpeed.very_fast, false, textColor.green);
                await typeText("\nYou’re testing input validation on a question asking if you want to continue testing input validation. ", textSpeed.very_fast, false, textColor.green);
                await typeText("But you’ve fallen right into my trap!", textSpeed.very_fast, false, textColor.green);
                inputValidationLoop = false;
                break;
        }
    }
    await typeText("\n\nThe method I just used is called whitelisting, wherein I only allow a specific number of inputs (i.e. 1, 2, or 3)\n", textSpeed.very_fast, false, textColor.green);
    await typeText("\n\nA non CMD Prompt example of whitelisting is a dropdown box on the front end with predefined values to select.", textSpeed.very_fast, false, textColor.green);
    await typeText(` But enough about the front end! we’re in\n`, textSpeed.very_fast, false, textColor.green);
    printTitle();
    await typeText(`\n\nSo let's not get distracted.\n`, textSpeed.very_fast, false, textColor.green);
}

export async function sortLoop() {
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
                            await typeText(`\nAnd we're left with your sorted name: ${mergeSort(name.toLocaleLowerCase())}`, textSpeed.very_fast, false, textColor.green);
                            break;

                        case "2":
                            await typeText("\n\nSay you, me, and some other grumpy people are waiting at the dmv. First we take everyone’s names and ask what they need:\n\n", textSpeed.very_fast, false, textColor.green);

                            let dmv: PersonInfo[] = [];
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
                            })

                            await typeText("\nNow, everyone is claiming they were there first. What a headache! We decide the only fair way to see people is in alphabetical order.", textSpeed.very_fast, false, textColor.green);
                            await typeText(" We want to get started right away, so we use heapsort. This leaves us with:\n", textSpeed.very_fast, false, textColor.green);

                            const dmv_Alph = heapSort(dmv, "fName");
                            const maxNameLength = Math.max(...dmv.map((person) => person.fName.length));

                            dmv_Alph.forEach((patron) => {
                                const padding = ' '.repeat(maxNameLength - patron.fName.length);
                                console.log(`${patron.fName}${padding}: ${patron.licenseType}`);
                            });

                            await typeText("\nIt was almost easy, but it turns out it takes longer to process class C licenses than to process class B licenses. ", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nWe decide to use heap sort on our new array, this time sorting by license type:\n", textSpeed.very_fast, false, textColor.green);

                            const wrongSort = heapSort([...dmv_Alph], "licenseType");
                            wrongSort.forEach((patron) => {
                                const padding = ' '.repeat(maxNameLength - patron.fName.length);
                                console.log(`${patron.fName}${padding}: ${patron.licenseType}`);
                            });

                            await typeText("\nOh no! Now the licenses are in order but our work sorting names alphabetically has been destroyed! \n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nYou see, If we had used a stable sorting algorithm like Merge Sort, we could have kept relative positions of names intact: \n", textSpeed.very_fast, false, textColor.green);

                            stableSort(dmv_Alph).forEach((patron) => {
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
                await typeText("It retains the best case scenario time complexity of merge sort: (nlogn), but does better with memory: (logn)\n", textSpeed.very_fast, false, textColor.green);
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
                            const sortedName: string = quickSort(fullName.toLowerCase().replace(/ /g, ''));
                            await typeText("\nAnd now we're left with your new, better sorted name! ", textSpeed.very_fast, false, textColor.green);
                            await typeText(" I think " + sortedName + " fits you better anyway.", textSpeed.very_fast, false, textColor.green);
                            break;
                        case "2":
                            //TODO
                            await typeText("I Need to write this section\n", textSpeed.very_fast, false, textColor.green);
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
}


function newReadLine(): readline.Interface {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return rl;
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
