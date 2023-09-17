import { resolve } from "path";
import { stdout } from "process";
import * as readline from 'readline';

// text speed is measured in ms intervals
enum textSpeed {
    slow = 200,
    medium = 90, 
    fast = 50,
    very_fast = 35,
    uber_speed = 15
}

// textcodes corespond to the format: '\x1b[38;5;<color_number>m'
enum textColor {
    green = 40,
    blue = 27,
    red = 196,
    white = 15,
    cyan = 45,
    yellow = 226
}

const myName = `
╭╮╱╱╱╱╱╱╭━━━╮╱╱╭╮╭╮╱╱╭━━━╮╱╱╱╱╭╮
┃┃╱╱╱╱╱╱┃╭━╮┃╱╭╯╰┫┃╱╱┃╭━╮┃╱╱╱╭╯╰╮
┃╰━┳╮╱╭╮┃╰━━┳━┻╮╭┫╰━╮┃┃╱╰╋━━┳┻╮╭╋━━┳━╮
┃╭╮┃┃╱┃┃╰━━╮┃┃━┫┃┃╭╮┃┃┃╱╭┫╭╮┃╭┫┃┃┃━┫╭╯
┃╰╯┃╰━╯┃┃╰━╯┃┃━┫╰┫┃┃┃┃╰━╯┃╭╮┃┃┃╰┫┃━┫┃
╰━━┻━╮╭╯╰━━━┻━━┻━┻╯╰╯╰━━━┻╯╰┻╯╰━┻━━┻╯
╱╱╱╭━╯┃
╱╱╱╰━━╯`;

const title = `
████████╗██╗░░██╗███████╗  ██████╗░░█████╗░░█████╗░██╗░░██╗  ███████╗███╗░░██╗██████╗░
╚══██╔══╝██║░░██║██╔════╝  ██╔══██╗██╔══██╗██╔══██╗██║░██╔╝  ██╔════╝████╗░██║██╔══██╗
░░░██║░░░███████║█████╗░░  ██████╦╝███████║██║░░╚═╝█████═╝░  █████╗░░██╔██╗██║██║░░██║
░░░██║░░░██╔══██║██╔══╝░░  ██╔══██╗██╔══██║██║░░██╗██╔═██╗░  ██╔══╝░░██║╚████║██║░░██║
░░░██║░░░██║░░██║███████╗  ██████╦╝██║░░██║╚█████╔╝██║░╚██╗  ███████╗██║░╚███║██████╔╝
░░░╚═╝░░░╚═╝░░╚═╝╚══════╝  ╚═════╝░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝  ╚══════╝╚═╝░░╚══╝╚═════╝░`;

let inputAllowed = false; // Flag to control input
function newReadLine(): readline.Interface{
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
    if (isCentered){
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
async function question_1(): Promise<string>{
    let name: string = "recruiter";

    let q1_Input = newReadLine();
    const userInput = await getUserInput(q1_Input);
    q1_Input.close();

    try{
        const nameArray = userInput.split(' ');
        name = nameArray[0];
    }
    catch {
        console.log("Error!");
    }
    
    return name;
}


async function main(){
    clearScreen();
    await typeText("Welcome to the backend", textSpeed.medium, true, textColor.green);
    
    process.stdout.write("\n" + title);
    process.stdout.write("\n" + myName);
    await typeText("\n\nThe purpose of this program is to demonstrate how I (Seth Carter) would handle a variety of tasks in the back end; An interactive mind map to showcase my knowledge and give you (the recruiter) insight into my approach to problem solving. ", textSpeed.very_fast, false, textColor.green);
    await typeText("\n\nLet’s start out simple:", textSpeed.fast, false, textColor.green);
    await typeText(" What is your name?\n\n", textSpeed.medium, false, textColor.green);

    let name = await question_1();

    await typeText("Nice to meet you, " + name + "!", textSpeed.very_fast, false, textColor.green);
}   

  
main();