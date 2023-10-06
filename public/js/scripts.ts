import * as readline from 'readline';
import { printTitle } from './asciArt';
import { quickSort, heapSort, stableSort, mergeSort } from "./sortingAlgs";
import { typeText, textSpeed, textColor } from "./TextPrinter";
import { PersonInfo } from './app';
import { CommandMenu } from './CommandMenu';
import * as inpVal from './inputValidation';


let name = "Recruiter";
let fullName = "Recruiter";
let nameData = ['R', 'e', 'c', 'r', 'u,', 'i', 't', 'e', 'r'];
const fs = require('fs');
const dataPath = 'flatData.json';

export async function checkData() {

    const emptyData = {
        "nameData": "",
    }
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify(emptyData), 'utf8');
        await askForName();
    } else {
        let dataBank = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        name = dataBank.nameData[0];
        fullName = dataBank.nameData.join(" ");
        nameData = dataBank.nameData;

        await typeText("\nWelcome back, " + name + "!", textSpeed.very_fast, false, textColor.green);
    }
}

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

    let nameLimit = 10; //char limit for first names
    const charBlackList = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}'];

    let dataBank = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    dataBank.nameData = nameData;

    fs.writeFileSync(dataPath, JSON.stringify(dataBank));

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
    inputMenu.setMenuMessage("Handling input is one of the most important aspects of a user interface. Invalid input, whether entered purposely or by mistake accounts for most of the code in place for decision fields.")
    inputMenu.setMenuQuestion("Would you like to know more about input validation?")
    inputMenu.addOption("Run an example", async () => {
        await message_inputValidation();
    })
    inputMenu.addOption("Types of input validation", async () => {
        //TODO
        await typeText("Implemenet", textSpeed.very_fast, false, textColor.green);
    })
    await inputMenu.start();
}

export async function message_inputValidation() {


    let nameLimit = 11; //char limit for names
    const charBlackList = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}'];

    const inputForm = new CommandMenu();

    inputForm.setMenuMessage("\nLet’s present some questions you might find on an average form, and we’ll discuss the input validation needed to process your input:\n");
    inputForm.setMenuQuestion("Select a field to fill out:");
    inputForm.addOption('Age', async () => {
        let ageValid = false;
        while (!ageValid) {
            await typeText("\n\nPlease enter your age: \n", textSpeed.fast, true, textColor.cyan);

            let ageReader = newReadLine();
            const ageChoice = await getUserInput(ageReader);
            ageReader.close();

            //Data Type
            if (inpVal.dataTypeValid(ageChoice, "number")) {
                await typeText("1. Using Data Type Validation, we can determine that your input is indeed an integer\n", textSpeed.very_fast, false, textColor.green);
                const age = parseInt(ageChoice);

                //Range
                if (inpVal.rangeValid(age,5,105)) {
                    await typeText("2. Using Range Validation, we can determine that the age given is within the bounds of reasonability: (5 > age < 105)", textSpeed.very_fast, false, textColor.green);
                    await typeText("\nBased on these results, we can be reasonably sure the given age is valid!\n", textSpeed.very_fast, false, textColor.white);
                    ageValid = true;
                } else {
                    await typeText("2. Using ", textSpeed.very_fast, false, textColor.red);
                    await typeText("Range Validation", textSpeed.very_fast, false, textColor.blue);
                    await typeText(", we determine that the given age is outside the range of reasonability. Care to try again?", textSpeed.very_fast, false, textColor.red);
                }
            } else {
                await typeText("1. Using ", textSpeed.very_fast, false, textColor.red);
                await typeText("Data Type Validation", textSpeed.very_fast, false, textColor.blue);
                await typeText(", we can determine that your input is not an integer, and thus is not valid. Care to try again?\n", textSpeed.very_fast, false, textColor.red);
            }
        }
    });

    inputForm.addOption('Name', async () => {
        let nameValid = false;
        while (!nameValid) {
            await typeText("\n\nPlease enter your full name: \n", textSpeed.fast, true, textColor.cyan);

            let nameReader = newReadLine();
            const nameChoice = await getUserInput(nameReader);
            nameReader.close();
            let fullNameArray = nameChoice.split(" ");

            //Validation//
            //range of array
            if (inpVal.rangeValid(fullNameArray, 1, 5)) {
                await typeText("1. Using Range Validation, we can determine that your input contains between 2 and 4 names\n", textSpeed.very_fast, false, textColor.green);

                //length of names 
                let lengthValid = true;
                for (let i = 0; i < fullNameArray.length; i++) {
                    const name = fullNameArray[i];
                    if (!inpVal.lengthValid(name, nameLimit)) {
                        lengthValid = false;
                        break;
                    }
                }
                if (lengthValid) {
                    await typeText("2. Using Length Validation, we can determine your names are a reasonable length\n", textSpeed.very_fast, false, textColor.green);

                    //datatype
                    if (!inpVal.StringHasInt(nameChoice)) {
                        await typeText("3. Using Data Type Validation, we can determine that your input does not contain integers\n", textSpeed.very_fast, false, textColor.green);
                        
                        //blacklist
                        if (inpVal.noBlacklistedItems(nameChoice,charBlackList)) {
                            await typeText("4. Using Blacklist Validation, we can determine that your input does not contain any blacklisted chars\n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nBased on these results, we can be reasonably sure the given name is valid!\n", textSpeed.very_fast, false, textColor.white);
                            nameValid = true;
                        } else {
                            await typeText("4. Using Blacklist Validation, we can determine that your names contain blacklisted chars. Try again?\n", textSpeed.very_fast, false, textColor.red);

                        }

                    } else {
                        await typeText("3. Using Data Type Validation, we determine that the given name contains an integer. Care to try again?\n", textSpeed.very_fast, false, textColor.red);
                    }
                } else {
                    await typeText("2. Using Length Validation again, we can determine that one of your names is not an acceptable length\n", textSpeed.very_fast, false, textColor.red);
                }
            } else {
                await typeText("1. Using Length Validation, we can determine that your input does not contain between 2 and 4 names. Try entering your FULL name\n", textSpeed.very_fast, false, textColor.red);
            }
        }
    });
    await inputForm.start();
}

export async function sortLoop() {
    let sortLoop = true;
    while (sortLoop) {
        await typeText(`\n\nWhich sorting algorithm do you want to learn about?\n`, textSpeed.very_fast, false, textColor.green);
        await typeText(`\n\n1. Merge Sort\n2. Quick Sort\n0. Back to menu\n`, textSpeed.uber_speed, false, textColor.green);
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
                    await typeText(`\n\n1. Show me in action\n2. When to use quicksort?\n0. Back to other sorts\n`, textSpeed.uber_speed, false, textColor.green);
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
                            await typeText("Quicksort sorts items “in place”, meaning it does need to create copies of the data it’s sorting, but rather partitions and sorts data within the original array. \n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nWhile mergesort might be more efficient when sorting large datasets, quicksort can still be preferable for large datasets when memory is a consideration.\n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nSuppose you're working on a server application that needs to sort a large dataset of customer orders for a retail website.\n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\nEach order is represented as an object with various details, including order number, date, customer information, and order value. You need to sort these orders by order number, and the dataset is too large to fit entirely in memory.\n", textSpeed.very_fast, false, textColor.green);
                            await typeText("\n\nIn this instance, quicksort would be the ideal choice.\n", textSpeed.very_fast, false, textColor.green);
                            break;
                        case "0":
                            quickSortLoop = false;
                            break;

                        default:
                            break;
                    }
                }
                break;
            case "0":
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


