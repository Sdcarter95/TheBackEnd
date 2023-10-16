/**
 * File: Scripts.ts
 * Author: Seth Carter
 * Description: This file contains a number of menues and functions that act as scripts for the main menu in App.ts
 * Date: 10/14/2023
 */

import * as readline from 'readline';
import fs from 'fs';
import { printTitle } from './constants/asciArt';
import { quickSort, heapSort, stableSort, mergeSort } from "./SortingAlgs";
import { typeText, textSpeed, textColor } from "./TextPrinter";
import { PersonInfo, dataPath } from './App';
import { CommandMenu } from './CommandMenu';
import * as inpVal from './InputValidation';
import { ShapeFactory, shapes } from './designPatterns/factoryMethod';
import { MovieCharacterBuilder } from './designPatterns/builder';
import { adapterExample, adapterFunctions } from './designPatterns/adapter';


let name = "Recruiter";
let fullName = "Recruiter";
let nameData = ['R', 'e', 'c', 'r', 'u,', 'i', 't', 'e', 'r'];
const validStates: string[] = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];


/**
 * This menu lists the different kind of sorts, and gives examples and exlinations regarding when to use them.
 */
export async function menu_sorts() {
    const sortMenu = new CommandMenu();
    sortMenu.setMenuMessage("While in practice many programmers opt to use array.sort() or some comparable function, it’s important to know the different sorting algorithms at your disposal, and the use case for those algorithms.");
    sortMenu.setMenuQuestion("Which sorting algorithm do you want to learn about?");
    sortMenu.addOption("Merge Sort", async () => {
        const mergeSortMenu = new CommandMenu();
        mergeSortMenu.setMenuMessage("Merge sort has a great best-case time complexity of nlogn, and allows for more deterministic/reliable time predictions when compared to quicksort (which uses random pivots). \n\nIt retains relative positions of identical values, and so is useful when stability is paramount.");
        mergeSortMenu.setMenuQuestion("Would you like to know more?");
        mergeSortMenu.addOption("Show me in action", async () => {
            await typeText(`\nAnd we're left with your sorted name: ${mergeSort(name.toLocaleLowerCase())}`, textSpeed.very_fast, false, textColor.green);
        });
        mergeSortMenu.addOption("When to use mergesort?", async () => {
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
        });
        await mergeSortMenu.start();
    });
    sortMenu.addOption("Quick Sort", async () => {
        const quickSortMenu = new CommandMenu();
        quickSortMenu.setMenuMessage("Quicksort is similar to merge sort in terms of its divide and conquer approach, but instead of always dividing a dataset in half, it chooses a pivot and recursively sorts the sides of the dataset that are larger or smaller.\n\nIt retains the best case scenario time complexity of merge sort: (nlogn), but does better with memory: (logn)");
        quickSortMenu.setMenuQuestion("Would you like to know more?");
        quickSortMenu.addOption("Show me in action", async () => {
            await typeText("\nIf we were to sort you name alphabetically using quicksort, it would go like this:\n", textSpeed.very_fast, false, textColor.green);
            const sortedName: string = quickSort(fullName.toLowerCase().replace(/ /g, ''));
            await typeText("\nAnd now we're left with your new, better sorted name! ", textSpeed.very_fast, false, textColor.green);
            await typeText(" I think " + sortedName + " fits you better anyway.", textSpeed.very_fast, false, textColor.green);
        });
        quickSortMenu.addOption("When to use quicksort?", async () => {
            await typeText("\nQuicksort sorts items “in place”, meaning it does not need to create copies of the data it’s sorting, but rather partitions and sorts data within the original array. \n", textSpeed.very_fast, false, textColor.green);
            await typeText("\nWhile mergesort might be more efficient when sorting large datasets, quicksort can still be preferable for large datasets when memory is a consideration.\n", textSpeed.very_fast, false, textColor.green);
            await typeText("\nSuppose you're working on a server application that needs to sort a large dataset of customer orders for a retail website.\n", textSpeed.very_fast, false, textColor.green);
            await typeText("\nEach order is represented as an object with various details, including order number, date, customer information, and order value. You need to sort these orders by order number, and the dataset is too large to fit entirely in memory.\n", textSpeed.very_fast, false, textColor.green);
            await typeText("\n\nIn this instance, quicksort would be the ideal choice.\n", textSpeed.very_fast, false, textColor.green);
        });
        await quickSortMenu.start();
    });

    await sortMenu.start();
}

/**
 * This menue details the types of design patterns.
 */
export async function menu_designPatterns() {
    const dpMenu = new CommandMenu();
    dpMenu.setMenuMessage("There are three broad categories for design patterns: Creational Patterns, Structural Patterns, and Behavioral Patterns.");
    dpMenu.setMenuQuestion("Which type of design pattern would you like to know more about?");
    dpMenu.addOption("Creational", async () => {
        const creationalPatternMenu = new CommandMenu();
        creationalPatternMenu.setMenuMessage("Creational Patterns focus on the process of object creation, helping developers manage and control the instantiation of objects in their applications.");
        creationalPatternMenu.setMenuQuestion("Would you like to know about a specific creational pattern?");
        creationalPatternMenu.addOption("Factory Method", async () => {
            const factoryPatternMenu = new CommandMenu();
            factoryPatternMenu.setMenuMessage("The Factory Method is also known as Virtual Constructor: the idea being to let subclasses of an interface or abstract class decide which class to instantiate based on the data fed into it.");
            factoryPatternMenu.setMenuQuestion("Want to know more?");
            factoryPatternMenu.addOption("Run an example", async () => {
                await typeText("\n\nHere's a practical example:\n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nSuppose you’re running a furniture shop. You open a furniture catalog and spot a nice oak chair that would look great in the window.\n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nYou call the factory where it’s made and ask for the oak chair. As the client, you don’t know nor are you concerned with the manufacturing details of the chair; You don’t know where they source their oak, how the chair is constructed, or the tools needed for said construction.\n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nNow the factory rep who gets your call doesn’t know everything either. They have a blueprint for the model chair you want: it has four legs, arm rests and a swivel. They outsource the construction to experts.\n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nSo the factory rep sends the blueprint to the workshop with a note that they need it done in oak. The workshop knows all the tools of the woodworking trade. They use their spokeshaves, saws, and sandpaper to construct the chair. \n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nA sudo code interpretation of these events might go like this: \n", textSpeed.very_fast, false, textColor.green);
                await typeText("\n1. The client uses the chair factory: ", textSpeed.very_fast, false, textColor.green);
                await typeText("let myOakChair = chairFactory.createChair(woodType.oak);\n", textSpeed.very_fast, false, textColor.cyan);
                await typeText("\n2. The factory sends the order to the correct builder: ", textSpeed.very_fast, false, textColor.green);
                await typeText("if (woodType is oak){return getOakChair()};\n", textSpeed.very_fast, false, textColor.cyan);
                await typeText("\n3. The workshop builds the chair: ", textSpeed.very_fast, false, textColor.green);
                await typeText("getOakChair() implements Chair{woodtype = oak;}\n", textSpeed.very_fast, false, textColor.cyan);
                await typeText("\n\n", textSpeed.very_fast, false, textColor.green);
            });
            factoryPatternMenu.addOption("When to use a factory pattern?", async () => {
                await typeText("\nOne common instance where you should use the Factory Pattern is when you want to create objects of different types or classes, but you want to abstract the creation process and decouple the client code from the specific classes being instantiated.\n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nSay you wanted a factory that created shapes. The client could make this call: \n", textSpeed.very_fast, false, textColor.green);
                await typeText(`\nlet factory = new ShapeFactory;\nlet circle = factory.createShape(shapes.circle);\n`, textSpeed.very_fast, false, textColor.cyan);
                await typeText("\nWithout any knowledge of the construction process, the client could expect something like this:\n", textSpeed.very_fast, false, textColor.green);
                let factory = new ShapeFactory;
                let circle = factory.createShape(shapes.circle);
                console.log(circle.shapeToPrint());
            });
            await factoryPatternMenu.start();

        });
        creationalPatternMenu.addOption("Builder", async () => {
            const builderPattern = new CommandMenu();
            builderPattern.setMenuMessage("The builder design pattern separates the construction of a complex object from its representation, allowing the caller to customise its representation.");
            builderPattern.setMenuQuestion("Want to know more?");
            builderPattern.addOption("Run an example", async () => {
                await typeText("\nSuppose you had a database of movie characters and were trying to add a new entry. There are many elements that define these characters, and frontloading a function call with arguments would be messy. Instead, you decide to use a builder pattern!\n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nFirst, you boil down the archetypal elements of a movie character into a movieCharacter() Class:\n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nEvery character has\n1. A Name\n2. A genre of film\n3. A famous quote\n4. A piece of clothing they wear.\n", textSpeed.very_fast, false, textColor.cyan);
                let characterBuilder = new MovieCharacterBuilder();
                characterBuilder.setName("Indiana Jones");
                characterBuilder.setGenra("Adventure");
                characterBuilder.setQuote("It belongs in a museum!");
                characterBuilder.setClothing("Fedora");

                let indy = characterBuilder.build();
                await typeText("\nExample: ", textSpeed.very_fast, false, textColor.green);
                await typeText(indy.description() + "\n", textSpeed.very_fast, false, textColor.cyan);
                await typeText("\nNow you try!\n", textSpeed.very_fast, false, textColor.green);

                await typeText("\nGive the name of a famouse movie character:\n", textSpeed.very_fast, false, textColor.green);
                const charName = await getUserInput();
                await typeText("\nWhat Genra movie are they in?\n", textSpeed.very_fast, false, textColor.green);
                const charGenra = await getUserInput();
                await typeText("\nWhat's a famouse quote?\n", textSpeed.very_fast, false, textColor.green);
                const charQuote = await getUserInput();
                await typeText("\nWhat is a clothing item they wear?\n", textSpeed.very_fast, false, textColor.green);
                const charClothes = await getUserInput();

                await typeText("\nGreat! now lets build them:\n", textSpeed.very_fast, false, textColor.green);
                await typeText(`\ncharacterBuilder.setName(${charName});\ncharacterBuilder.setGenra(${charGenra});\ncharacterBuilder.setQuote(${charQuote});\ncharacterBuilder.setClothing(${charClothes});\n`, textSpeed.very_fast, false, textColor.cyan);

                characterBuilder.setName(charName);
                characterBuilder.setGenra(charGenra);
                characterBuilder.setQuote(charQuote);
                characterBuilder.setClothing(charClothes);

                let character = characterBuilder.build();
                await typeText("\nAnd we're left with: " , textSpeed.very_fast, false, textColor.green);
                await typeText(character.description(), textSpeed.very_fast, false, textColor.cyan);
            });
            builderPattern.addOption("When to use a Builder pattern?", async () => {
                await typeText("\nThe builder design pattern is best used in situations where you need to create complex objects that have many optional components or configurations. It's particularly useful when you want to enhance the readability of your code when dealing with object creation.\n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nImagine the number of variables you might have to deal with inside the constructer of a 'sandwich' object. \n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nThe builder pattern allows us to handle its construction simply: \n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nmyBLT = new Sanwich();\nmyBLT.add(Bacon);\nmyBLT.add(Lettuce);\nmyBLT.add(Tomato);\nmtBLT.build();\n", textSpeed.very_fast, false, textColor.cyan);
                await typeText("\nAnd just like that you have a delicious BLT sandwich!\n", textSpeed.very_fast, false, textColor.green);
            });
            await builderPattern.start();


        })
        await creationalPatternMenu.start();
    });

    
    dpMenu.addOption("Structural", async () => {
        const structuralPatternMenu = new CommandMenu();
        structuralPatternMenu.setMenuMessage("Structural patterns focus on how classes and objects can be composed to form larger structures. They are concerned with the composition of classes and objects to create more efficient, flexible, and maintainable software systems.");
        structuralPatternMenu.setMenuQuestion("Which Structural Patterns would you like to know about?");
        structuralPatternMenu.addOption("Adapter", async () => {
            const adapterPatternMenu = new CommandMenu();
            adapterPatternMenu.setMenuMessage("Simply put, adapters allow incompatible objects to collaborate. It's often used to make existing classes work with others without modifying their source code.");
            adapterPatternMenu.setMenuQuestion("Want to know more about adapters?");
            adapterPatternMenu.addOption("Run an example", async () => {
                await typeText("\nLet's assume you have the following 3rd party interface and class implementation that returns a temperature in celsius:\n\n", textSpeed.very_fast, false, textColor.green);
                await typeText(adapterExample(adapterFunctions.CelsiusTemperature) + "\n\n", textSpeed.uber_speed, false, textColor.cyan);
                await typeText(adapterExample(adapterFunctions.CelsiusSensor), textSpeed.uber_speed, false, textColor.cyan);
                await typeText("\nNow we'll create a new interface for Fahrenheit:\n\n", textSpeed.very_fast, false, textColor.green);
                await typeText(adapterExample(adapterFunctions.FahrenheitTemperature), textSpeed.uber_speed, false, textColor.blue);
                await typeText("\nAnd now we can create the adapter that will let a user check the temperature in Fahrenheit\n\n", textSpeed.very_fast, false, textColor.green);
                await typeText(adapterExample(adapterFunctions.CelsiusToFahrenheitAdapter), textSpeed.uber_speed, false, textColor.blue);
                await typeText("\nFinally, we can use our new adapter by creating a sensor set at 20 degrees celsius:\n\n", textSpeed.very_fast, false, textColor.green);
                await typeText(`const celsiusSensor = new CelsiusSensor(20);\nconst adapter = new CelsiusToFahrenheitAdapter(celsiusSensor);`, textSpeed.very_fast, false, textColor.cyan);
                await typeText("\n\nRunning adapter.getFahrenheit() we get: " + adapterExample(adapterFunctions.result), textSpeed.very_fast, false, textColor.green);

            });
            await adapterPatternMenu.start();
        })
        await structuralPatternMenu.start();
    });

    //TODO: add Behavioral options
    // dpMenu.addOption("Behavioral", async () => {
    //     const behavioralPatternMenu = new CommandMenu();
    //     behavioralPatternMenu.setMenuMessage("");
    //     behavioralPatternMenu.setMenuQuestion("");
    //     behavioralPatternMenu.addOption("", async () => {

    //     })
    //     behavioralPatternMenu.start();
    // });
    await dpMenu.start();
}

/**
 * This menue details the types of input validation.
 */
export async function menu_input() {
    const inputMenu = new CommandMenu();
    inputMenu.setMenuMessage("Handling input is one of the most important aspects of a user interface. Invalid input, whether entered purposely or by mistake accounts for most of the code in place for decision fields.")
    inputMenu.setMenuQuestion("What would you liek to know?")
    inputMenu.addOption("Run an example", async () => {
        await example_inputValidation();
    })
    inputMenu.addOption("Types of input validation", async () => {
        const validationTypesMenu = new CommandMenu();
        validationTypesMenu.setMenuMessage("Whitelisting and Blacklisting are two broad categories of input validation, but there are many more specific types depending on your needs.")
        validationTypesMenu.setMenuQuestion("Which type of validation would you like to learn about?")

        validationTypesMenu.addOption("Blacklisting", async () => {
            await typeText("\nIn terms of input validation, blacklisting is a technique used to block or reject specific inputs that match predefined patterns or criteria.", textSpeed.very_fast, true, textColor.green);
            await typeText("It involves maintaining a list (the 'blacklist') of input values, characters, patterns, or keywords that are considered invalid or potentially dangerous, and any input that matches these criteria is rejected or flagged.\n", textSpeed.very_fast, true, textColor.green);
        })
        validationTypesMenu.addOption("Whitelisting", async () => {
            await typeText("\nIn the context of input validation, whitelisting is a security approach where you explicitly define and allow only specific, predefined inputs or input patterns as valid, while rejecting or blocking any input that does not match these approved criteria.\n", textSpeed.very_fast, true, textColor.green);
            await typeText("\n\nWhitelisting is used in this code whenever you are asked to select a number!\n", textSpeed.very_fast, true, textColor.green);
        })
        validationTypesMenu.addOption("Length Check Validation", async () => {
            await typeText("\nLength Checks Validation checks whether the length of the data is within acceptable limits. For example, validating that a password is at least 8 characters long.\n", textSpeed.very_fast, true, textColor.green);
        })
        validationTypesMenu.addOption("Range Check Validation", async () => {
            await typeText("\nRange checks involve verifying that a value falls within an acceptable range. For instance, ensuring that an age field contains a value between 0 and 150.\n", textSpeed.very_fast, true, textColor.green);
        })
        validationTypesMenu.addOption("Type Check Validation:", async () => {
            await typeText("\nType checks involve verifying that the data entered is of the correct data type. For example, ensuring that a field meant for numerical values only contains numbers, and a field meant for email addresses contains a valid email format.\n", textSpeed.very_fast, true, textColor.green);
        })
        validationTypesMenu.addOption("Pattern Matching Validation:", async () => {
            await typeText("\nPattern matching checks use regular expressions or patterns to validate data. For example, validating that a date is in the format YYYY-MM-DD.\n", textSpeed.very_fast, true, textColor.green);
        })
        validationTypesMenu.addOption("List Check Validation:", async () => {
            await typeText("\nList checks involve validating that the entered data matches an item from a predefined list. For instance, validating that a state code corresponds to a valid U.S. state\n", textSpeed.very_fast, true, textColor.green);
        })
        await validationTypesMenu.start();
    })
    await inputMenu.start();
}

/**
 * This example lets the user pick form feilds to enter, and then explains the input validation needed to process the input.
 */
async function example_inputValidation() {

    let nameLimit = 11; //char limit for names
    const charBlackList = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '{', '}'];

    const inputForm = new CommandMenu();

    inputForm.setMenuMessage("\nLet’s present some questions you might find on an average form, and we’ll discuss the input validation needed to process your input:\n");
    inputForm.setMenuQuestion("Select a field to fill out:");
    inputForm.addOption('Age', async () => {
        let ageValid = false;
        while (!ageValid) {
            await typeText("\n\nPlease enter your age: \n", textSpeed.fast, true, textColor.cyan);
            const ageChoice = await getUserInput();


            //Data Type
            if (inpVal.dataTypeValid(ageChoice, "number")) {
                await typeText("1. Using Data Type Validation, we can determine that your input is indeed an integer.\n", textSpeed.very_fast, false, textColor.green);
                const age = parseInt(ageChoice);

                //Range
                if (inpVal.rangeValid(age, 5, 105)) {
                    await typeText("2. Using Range Validation, we can determine that the age given is within the bounds of reasonability: (5 > age < 105).", textSpeed.very_fast, false, textColor.green);
                    await typeText("\nBased on these results, we can be reasonably sure the given age is valid!\n", textSpeed.very_fast, false, textColor.white);
                    ageValid = true;
                } else {
                    await typeText("2. Using Range Validation , we determine that the given age is outside the range of reasonability. Care to try again?\n", textSpeed.very_fast, false, textColor.red);
                }
            } else {
                await typeText("1. Using Data Type Validation, we can determine that your input is not an integer, and thus is not valid. Care to try again?\n", textSpeed.very_fast, false, textColor.red);
            }
        }
    });

    inputForm.addOption('Name', async () => {
        let nameValid = false;
        while (!nameValid) {
            await typeText("\n\nPlease enter your full name: \n", textSpeed.fast, true, textColor.cyan);
            const nameChoice = await getUserInput();

            let fullNameArray = nameChoice.split(" ");

            //Validation//
            //range of array
            if (inpVal.rangeValid(fullNameArray, 1, 5)) {
                await typeText("1. Using Range Validation, we can determine that your input contains between 2 and 4 names.\n", textSpeed.very_fast, false, textColor.green);

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
                    await typeText("2. Using Length Validation, we can determine your names are a reasonable length.\n", textSpeed.very_fast, false, textColor.green);

                    //datatype
                    if (!inpVal.StringHasInt(nameChoice)) {
                        await typeText("3. Using Data Type Validation, we can determine that your input does not contain integers,\n", textSpeed.very_fast, false, textColor.green);

                        //blacklist
                        if (inpVal.noBlacklistedItems(nameChoice, charBlackList)) {
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
                    await typeText("2. Using Length Validation, we can determine that one of your names is not an acceptable length,\n", textSpeed.very_fast, false, textColor.red);
                }
            } else {
                await typeText("1. Using Range Validation, we can determine that your input does not contain between 2 and 4 names. Try entering your FULL name.\n", textSpeed.very_fast, false, textColor.red);
            }
        }
    });

    inputForm.addOption('Birthday', async () => {
        let dateValid = false;
        while (!dateValid) {
            await typeText("\n\nPlease enter your birthdate in the form MM/DD/YYYY: \n", textSpeed.fast, true, textColor.cyan);
            const dateChoice = await getUserInput();


            if (inpVal.dateValid(dateChoice)) {
                await typeText("1. Using Format Check Validation, we can determine that your date is valid.\n", textSpeed.very_fast, false, textColor.green);
                const birthDate = new Date(dateChoice);
                const currentDate = new Date();

                const currentYear = currentDate.getFullYear();
                const birthYear = birthDate.getFullYear();

                if (inpVal.rangeValid(birthYear, currentYear - 100, currentYear - 10)) {
                    await typeText("2. Using Range Validation, we can determine that your date is in a reasonable range.\n", textSpeed.very_fast, false, textColor.green);
                    await typeText("\nBased on these results, we can be reasonably sure your birthdate is valid!\n", textSpeed.very_fast, false, textColor.white);
                    dateValid = true;
                } else {
                    await typeText("2. Using Range Validation, we can determine that your input is invalid. Unless you are ", textSpeed.very_fast, false, textColor.red);
                    await typeText((currentYear - birthYear).toString() + " years old.", textSpeed.very_fast, false, textColor.red);
                }
            } else {
                await typeText("1. Using Format Check Validation, we can determine that your date you entered is not in a valid form. Try again:\n", textSpeed.very_fast, false, textColor.red);
            }

        }
    });

    inputForm.addOption('State', async () => {
        let stateValid = false;
        while (!stateValid) {
            await typeText("Please enter your state in two-letter format (example: TX)\n", textSpeed.very_fast, false, textColor.green);
            const stateChoice = await getUserInput();

            if (validStates.includes(stateChoice.toUpperCase())) {
                await typeText("1. Using List Check Validation, we can determine that your input is a valid state.\n", textSpeed.very_fast, false, textColor.green);
                await typeText("Note: Because List Check Validation is a form of whitelisting, other validation methods like length and type validation are not needed!\n", textSpeed.very_fast, false, textColor.green);
                await typeText("\nBased on these results, we can be reasonably sure your state input is valid.\n", textSpeed.very_fast, false, textColor.white);
                stateValid = true;
            } else {
                await typeText("1. Using List Check Validation, we can determine that your input is not a valid state.\n", textSpeed.very_fast, false, textColor.red);
            }
        }
    })

    await inputForm.start();
}

/**
 * Simply prints out the welcome message.
 */
export async function message_intro() {
    await typeText("Welcome to the back end", textSpeed.medium, true, textColor.green);
    printTitle();
    await typeText("\n\nThe purpose of this program is to demonstrate how I (Seth Carter) handle a variety of programming tasks; An interactive mind map to showcase my knowledge and give you insight into my approach to problem solving.\n", textSpeed.very_fast, false, textColor.green);

}

/**
 * checkData() is used to check if there is info saved in memory and creates a blank data file if none is found.
 */
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

        printTitle();
        await typeText("\n\nWelcome back, " + name + "!", textSpeed.very_fast, false, textColor.green);
    }
}

/**
 * askForName() asks the user for their name, saves the result, and responds based on the nature of the user input.
 */
export async function askForName() {

    await typeText("\n\nLet’s start out simple: What is your", textSpeed.fast, false, textColor.green);
    process.stdout.write(" name");
    await typeText("?\n\n", textSpeed.uber_speed, false, textColor.green);

    const userInput = await getUserInput();
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
        if (nameArray[0].length > nameLimit || !inpVal.noBlacklistedItems(fullName, charBlackList) || nameArray.length > 3) {
            await typeText("\n(Although I doubt that's your real name...)", textSpeed.very_fast, false, textColor.green);
            await typeText("\n\nWhatever your name may be, let’s get down to buisness", textSpeed.very_fast, false, textColor.green);
        }
        else {
            await typeText("\n\nNow that we’re on a first name basis, I'll save your name into my memory", textSpeed.very_fast, false, textColor.green);
        }
    }
}


/**
 * Creates a new readline interface object
 * @returns a new readline interface object
 */
function newReadLine(): readline.Interface {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return rl;
}


/**
 * creates a new readline interface, and await user input.
 * @returns result of the user input
 */
function getUserInput(): Promise<string> {
    const rl: readline.Interface = newReadLine();
    return new Promise((resolve) => {
        rl.question('> ', (input) => {
            rl.close(); // Close the interface after resolving the Promise
            resolve(input);
        });
    });
}


