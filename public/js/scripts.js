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
exports.askForName = exports.checkData = exports.message_intro = exports.menu_input = exports.menu_designPatterns = exports.menu_sorts = void 0;
const readline = __importStar(require("readline"));
const asciArt_1 = require("./asciArt");
const sortingAlgs_1 = require("./sortingAlgs");
const TextPrinter_1 = require("./TextPrinter");
const CommandMenu_1 = require("./CommandMenu");
const inpVal = __importStar(require("./inputValidation"));
let name = "Recruiter";
let fullName = "Recruiter";
let nameData = ['R', 'e', 'c', 'r', 'u,', 'i', 't', 'e', 'r'];
const fs = require('fs');
const dataPath = 'flatData.json';
const validStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];
async function menu_sorts() {
    const sortMenu = new CommandMenu_1.CommandMenu();
    sortMenu.setMenuMessage("While in practice many programmers opt to use array.sort() or some comparable function, it’s important to know the different sorting algorithms at your disposal, and the use case for those algorithms.");
    sortMenu.setMenuQuestion("Which sorting algorithm do you want to learn about?");
    sortMenu.addOption("Merge Sort", async () => {
        const mergeSortMenu = new CommandMenu_1.CommandMenu();
        mergeSortMenu.setMenuMessage("Merge sort has a great best-case time complexity of nlogn, and allows for more deterministic/reliable time predictions when compared to quicksort (which uses random pivots). \n\nIt retains relative positions of identical values, and so is useful when stability is paramount.");
        mergeSortMenu.setMenuQuestion("Would you like to know more?");
        mergeSortMenu.addOption("Show me in action", async () => {
            await (0, TextPrinter_1.typeText)(`\nAnd we're left with your sorted name: ${(0, sortingAlgs_1.mergeSort)(name.toLocaleLowerCase())}`, TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
        });
        mergeSortMenu.addOption("When to use mergesort?", async () => {
            await (0, TextPrinter_1.typeText)("\n\nSay you, me, and some other grumpy people are waiting at the dmv. First we take everyone’s names and ask what they need:\n\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
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
            await (0, TextPrinter_1.typeText)("\nNow, everyone is claiming they were there first. What a headache! We decide the only fair way to see people is in alphabetical order.", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            await (0, TextPrinter_1.typeText)(" We want to get started right away, so we use heapsort. This leaves us with:\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            const dmv_Alph = (0, sortingAlgs_1.heapSort)(dmv, "fName");
            const maxNameLength = Math.max(...dmv.map((person) => person.fName.length));
            dmv_Alph.forEach((patron) => {
                const padding = ' '.repeat(maxNameLength - patron.fName.length);
                console.log(`${patron.fName}${padding}: ${patron.licenseType}`);
            });
            await (0, TextPrinter_1.typeText)("\nIt was almost easy, but it turns out it takes longer to process class C licenses than to process class B licenses. ", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            await (0, TextPrinter_1.typeText)("\nWe decide to use heap sort on our new array, this time sorting by license type:\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            const wrongSort = (0, sortingAlgs_1.heapSort)([...dmv_Alph], "licenseType");
            wrongSort.forEach((patron) => {
                const padding = ' '.repeat(maxNameLength - patron.fName.length);
                console.log(`${patron.fName}${padding}: ${patron.licenseType}`);
            });
            await (0, TextPrinter_1.typeText)("\nOh no! Now the licenses are in order but our work sorting names alphabetically has been destroyed! \n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            await (0, TextPrinter_1.typeText)("\nYou see, If we had used a stable sorting algorithm like Merge Sort, we could have kept relative positions of names intact: \n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            (0, sortingAlgs_1.stableSort)(dmv_Alph).forEach((patron) => {
                const padding = ' '.repeat(maxNameLength - patron.fName.length);
                console.log(`${patron.fName}${padding}: ${patron.licenseType}`);
            });
        });
        await mergeSortMenu.start();
    });
    sortMenu.addOption("Quick Sort", async () => {
        const quickSortMenu = new CommandMenu_1.CommandMenu();
        quickSortMenu.setMenuMessage("Quicksort is similar to merge sort in terms of its divide and conquer approach, but instead of always dividing a dataset in half, it chooses a pivot and recursively sorts the sides of the dataset that are larger or smaller.\n\nIt retains the best case scenario time complexity of merge sort: (nlogn), but does better with memory: (logn)");
        quickSortMenu.setMenuQuestion("Would you like to know more?");
        quickSortMenu.addOption("Show me in action", async () => {
            await (0, TextPrinter_1.typeText)("If we were to sort you name alphabetically using quicksort, it would go like this:\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            const sortedName = (0, sortingAlgs_1.quickSort)(fullName.toLowerCase().replace(/ /g, ''));
            await (0, TextPrinter_1.typeText)("\nAnd now we're left with your new, better sorted name! ", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            await (0, TextPrinter_1.typeText)(" I think " + sortedName + " fits you better anyway.", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
        });
        quickSortMenu.addOption("When to use quicksort?", async () => {
            await (0, TextPrinter_1.typeText)("Quicksort sorts items “in place”, meaning it does not need to create copies of the data it’s sorting, but rather partitions and sorts data within the original array. \n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            await (0, TextPrinter_1.typeText)("\nWhile mergesort might be more efficient when sorting large datasets, quicksort can still be preferable for large datasets when memory is a consideration.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            await (0, TextPrinter_1.typeText)("\nSuppose you're working on a server application that needs to sort a large dataset of customer orders for a retail website.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            await (0, TextPrinter_1.typeText)("\nEach order is represented as an object with various details, including order number, date, customer information, and order value. You need to sort these orders by order number, and the dataset is too large to fit entirely in memory.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            await (0, TextPrinter_1.typeText)("\n\nIn this instance, quicksort would be the ideal choice.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
        });
        await quickSortMenu.start();
    });
    await sortMenu.start();
}
exports.menu_sorts = menu_sorts;
async function menu_designPatterns() {
    const dpMenu = new CommandMenu_1.CommandMenu();
    dpMenu.setMenuMessage("There are two broad categories for design patterns: Creational Patterns, and Behavioral Patterns.");
    dpMenu.setMenuQuestion("Which type of design pattern would you like to know more about?");
    dpMenu.addOption("Creational Patterns", async () => {
    });
    dpMenu.addOption("Behavioral Patterns", async () => {
    });
    await dpMenu.start();
}
exports.menu_designPatterns = menu_designPatterns;
async function menu_input() {
    const inputMenu = new CommandMenu_1.CommandMenu();
    inputMenu.setMenuMessage("Handling input is one of the most important aspects of a user interface. Invalid input, whether entered purposely or by mistake accounts for most of the code in place for decision fields.");
    inputMenu.setMenuQuestion("What would you liek to know?");
    inputMenu.addOption("Run an example", async () => {
        await example_inputValidation();
    });
    inputMenu.addOption("Types of input validation", async () => {
        const validationTypesMenu = new CommandMenu_1.CommandMenu();
        validationTypesMenu.setMenuMessage("Whitelisting and Blacklisting are two broad categories of input validation, but there are many more specific types depending on your needs.");
        validationTypesMenu.setMenuQuestion("Which type of validation would you like to learn about?");
        validationTypesMenu.addOption("Blacklisting", async () => {
            await (0, TextPrinter_1.typeText)("\nIn terms of input validation, blacklisting is a technique used to block or reject specific inputs that match predefined patterns or criteria.", TextPrinter_1.textSpeed.very_fast, true, TextPrinter_1.textColor.green);
            await (0, TextPrinter_1.typeText)("It involves maintaining a list (the 'blacklist') of input values, characters, patterns, or keywords that are considered invalid or potentially dangerous, and any input that matches these criteria is rejected or flagged.\n", TextPrinter_1.textSpeed.very_fast, true, TextPrinter_1.textColor.green);
        });
        validationTypesMenu.addOption("Whitelisting", async () => {
            await (0, TextPrinter_1.typeText)("\nIn the context of input validation, whitelisting is a security approach where you explicitly define and allow only specific, predefined inputs or input patterns as valid, while rejecting or blocking any input that does not match these approved criteria.\n", TextPrinter_1.textSpeed.very_fast, true, TextPrinter_1.textColor.green);
            await (0, TextPrinter_1.typeText)("\n\nWhitelisting is used in this code whenever you are asked to select a number!\n", TextPrinter_1.textSpeed.very_fast, true, TextPrinter_1.textColor.green);
        });
        validationTypesMenu.addOption("Length Check Validation", async () => {
            await (0, TextPrinter_1.typeText)("\nLength Checks Validation checks whether the length of the data is within acceptable limits. For example, validating that a password is at least 8 characters long.\n", TextPrinter_1.textSpeed.very_fast, true, TextPrinter_1.textColor.green);
        });
        validationTypesMenu.addOption("Range Check Validation", async () => {
            await (0, TextPrinter_1.typeText)("\nRange checks involve verifying that a value falls within an acceptable range. For instance, ensuring that an age field contains a value between 0 and 150.\n", TextPrinter_1.textSpeed.very_fast, true, TextPrinter_1.textColor.green);
        });
        validationTypesMenu.addOption("Type Check Validation:", async () => {
            await (0, TextPrinter_1.typeText)("\nType checks involve verifying that the data entered is of the correct data type. For example, ensuring that a field meant for numerical values only contains numbers, and a field meant for email addresses contains a valid email format.\n", TextPrinter_1.textSpeed.very_fast, true, TextPrinter_1.textColor.green);
        });
        validationTypesMenu.addOption("Pattern Matching Validation:", async () => {
            await (0, TextPrinter_1.typeText)("\nPattern matching checks use regular expressions or patterns to validate data. For example, validating that a date is in the format YYYY-MM-DD.\n", TextPrinter_1.textSpeed.very_fast, true, TextPrinter_1.textColor.green);
        });
        validationTypesMenu.addOption("List Check Validation:", async () => {
            await (0, TextPrinter_1.typeText)("\nList checks involve validating that the entered data matches an item from a predefined list. For instance, validating that a state code corresponds to a valid U.S. state\n", TextPrinter_1.textSpeed.very_fast, true, TextPrinter_1.textColor.green);
        });
        await validationTypesMenu.start();
    });
    await inputMenu.start();
}
exports.menu_input = menu_input;
async function message_intro() {
    await (0, TextPrinter_1.typeText)("Welcome to the back end", TextPrinter_1.textSpeed.medium, true, TextPrinter_1.textColor.green);
    (0, asciArt_1.printTitle)();
    await (0, TextPrinter_1.typeText)("\n\nThe purpose of this program is to demonstrate how I (Seth Carter) handle a variety of programming tasks; An interactive mind map to showcase my knowledge and give you insight into my approach to problem solving.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
}
exports.message_intro = message_intro;
async function example_inputValidation() {
    let nameLimit = 11; //char limit for names
    const charBlackList = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}'];
    const inputForm = new CommandMenu_1.CommandMenu();
    inputForm.setMenuMessage("\nLet’s present some questions you might find on an average form, and we’ll discuss the input validation needed to process your input:\n");
    inputForm.setMenuQuestion("Select a field to fill out:");
    inputForm.addOption('Age', async () => {
        let ageValid = false;
        while (!ageValid) {
            await (0, TextPrinter_1.typeText)("\n\nPlease enter your age: \n", TextPrinter_1.textSpeed.fast, true, TextPrinter_1.textColor.cyan);
            let ageReader = newReadLine();
            const ageChoice = await getUserInput(ageReader);
            ageReader.close();
            //Data Type
            if (inpVal.dataTypeValid(ageChoice, "number")) {
                await (0, TextPrinter_1.typeText)("1. Using Data Type Validation, we can determine that your input is indeed an integer.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
                const age = parseInt(ageChoice);
                //Range
                if (inpVal.rangeValid(age, 5, 105)) {
                    await (0, TextPrinter_1.typeText)("2. Using Range Validation, we can determine that the age given is within the bounds of reasonability: (5 > age < 105).", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
                    await (0, TextPrinter_1.typeText)("\nBased on these results, we can be reasonably sure the given age is valid!\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.white);
                    ageValid = true;
                }
                else {
                    await (0, TextPrinter_1.typeText)("2. Using Range Validation , we determine that the given age is outside the range of reasonability. Care to try again?\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.red);
                }
            }
            else {
                await (0, TextPrinter_1.typeText)("1. Using Data Type Validation, we can determine that your input is not an integer, and thus is not valid. Care to try again?\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.red);
            }
        }
    });
    inputForm.addOption('Name', async () => {
        let nameValid = false;
        while (!nameValid) {
            await (0, TextPrinter_1.typeText)("\n\nPlease enter your full name: \n", TextPrinter_1.textSpeed.fast, true, TextPrinter_1.textColor.cyan);
            let nameReader = newReadLine();
            const nameChoice = await getUserInput(nameReader);
            nameReader.close();
            let fullNameArray = nameChoice.split(" ");
            //Validation//
            //range of array
            if (inpVal.rangeValid(fullNameArray, 1, 5)) {
                await (0, TextPrinter_1.typeText)("1. Using Range Validation, we can determine that your input contains between 2 and 4 names.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
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
                    await (0, TextPrinter_1.typeText)("2. Using Length Validation, we can determine your names are a reasonable length.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
                    //datatype
                    if (!inpVal.StringHasInt(nameChoice)) {
                        await (0, TextPrinter_1.typeText)("3. Using Data Type Validation, we can determine that your input does not contain integers,\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
                        //blacklist
                        if (inpVal.noBlacklistedItems(nameChoice, charBlackList)) {
                            await (0, TextPrinter_1.typeText)("4. Using Blacklist Validation, we can determine that your input does not contain any blacklisted chars\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
                            await (0, TextPrinter_1.typeText)("\nBased on these results, we can be reasonably sure the given name is valid!\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.white);
                            nameValid = true;
                        }
                        else {
                            await (0, TextPrinter_1.typeText)("4. Using Blacklist Validation, we can determine that your names contain blacklisted chars. Try again?\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.red);
                        }
                    }
                    else {
                        await (0, TextPrinter_1.typeText)("3. Using Data Type Validation, we determine that the given name contains an integer. Care to try again?\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.red);
                    }
                }
                else {
                    await (0, TextPrinter_1.typeText)("2. Using Length Validation, we can determine that one of your names is not an acceptable length,\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.red);
                }
            }
            else {
                await (0, TextPrinter_1.typeText)("1. Using Range Validation, we can determine that your input does not contain between 2 and 4 names. Try entering your FULL name.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.red);
            }
        }
    });
    inputForm.addOption('Birthday', async () => {
        let dateValid = false;
        while (!dateValid) {
            await (0, TextPrinter_1.typeText)("\n\nPlease enter your birthdate in the form MM/DD/YYYY: \n", TextPrinter_1.textSpeed.fast, true, TextPrinter_1.textColor.cyan);
            let dateReader = newReadLine();
            const dateChoice = await getUserInput(dateReader);
            dateReader.close();
            if (inpVal.dateValid(dateChoice)) {
                await (0, TextPrinter_1.typeText)("1. Using Format Check Validation, we can determine that your date is valid.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
                const birthDate = new Date(dateChoice);
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const birthYear = birthDate.getFullYear();
                if (inpVal.rangeValid(birthYear, currentYear - 100, currentYear - 10)) {
                    await (0, TextPrinter_1.typeText)("2. Using Range Validation, we can determine that your date is in a reasonable range.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
                    await (0, TextPrinter_1.typeText)("\nBased on these results, we can be reasonably sure your birthdate is valid!\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.white);
                    dateValid = true;
                }
                else {
                    await (0, TextPrinter_1.typeText)("2. Using Range Validation, we can determine that your input is invalid. Unless you are ", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.red);
                    await (0, TextPrinter_1.typeText)((currentYear - birthYear).toString() + " years old.", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.red);
                }
            }
            else {
                await (0, TextPrinter_1.typeText)("1. Using Format Check Validation, we can determine that your date you entered is not in a valid form. Try again:\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.red);
            }
        }
    });
    inputForm.addOption('State', async () => {
        let stateValid = false;
        while (!stateValid) {
            await (0, TextPrinter_1.typeText)("Please enter your state in two-letter format (example: TX)\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            let stateReader = newReadLine();
            const stateChoice = await getUserInput(stateReader);
            stateReader.close();
            if (validStates.includes(stateChoice.toUpperCase())) {
                await (0, TextPrinter_1.typeText)("1. Using List Check Validation, we can determine that your input is a valid state.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
                await (0, TextPrinter_1.typeText)("Note: Because List Check Validation is a form of whitelisting, other validation methods like length and type validation are not needed!\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
                await (0, TextPrinter_1.typeText)("\nBased on these results, we can be reasonably sure your state input is valid.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.white);
                stateValid = true;
            }
            else {
                await (0, TextPrinter_1.typeText)("1. Using List Check Validation, we can determine that your input is not a valid state.\n", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.red);
            }
        }
    });
    await inputForm.start();
}
async function checkData() {
    const emptyData = {
        "nameData": "",
    };
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify(emptyData), 'utf8');
        await askForName();
    }
    else {
        let dataBank = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        name = dataBank.nameData[0];
        fullName = dataBank.nameData.join(" ");
        nameData = dataBank.nameData;
        await (0, TextPrinter_1.typeText)("\nWelcome back, " + name + "!", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
    }
}
exports.checkData = checkData;
async function askForName() {
    await (0, TextPrinter_1.typeText)("\n\nLet’s start out simple: What is your", TextPrinter_1.textSpeed.fast, false, TextPrinter_1.textColor.green);
    process.stdout.write(" name");
    await (0, TextPrinter_1.typeText)("?\n\n", TextPrinter_1.textSpeed.uber_speed, false, TextPrinter_1.textColor.green);
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
        name = "Recruiter";
        await (0, TextPrinter_1.typeText)("\nNot the very trusting sort, are you?", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
        await (0, TextPrinter_1.typeText)("\nI suppose you can never be too careful in this day in age", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
        await (0, TextPrinter_1.typeText)("\nI'll just call you Recruiter", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
    }
    //otherwise print normal response
    else {
        await (0, TextPrinter_1.typeText)("\nNice to meet you, " + name + "!", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
        if (nameArray[0].length > nameLimit || !inpVal.noBlacklistedItems(fullName, charBlackList) || nameArray.length > 3) {
            await (0, TextPrinter_1.typeText)("\n(Although I doubt that's your real name...)", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
            await (0, TextPrinter_1.typeText)("\n\nWhatever your name may be, let’s get down to buisness", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
        }
        else {
            await (0, TextPrinter_1.typeText)("\n\nNow that we’re on a first name basis, I'll save your name into my memory", TextPrinter_1.textSpeed.very_fast, false, TextPrinter_1.textColor.green);
        }
    }
}
exports.askForName = askForName;
function newReadLine() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return rl;
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
