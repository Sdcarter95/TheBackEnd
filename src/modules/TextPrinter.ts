 /**
 * File: TextPrinter.ts
 * Author: Seth Carter
 * Description: This file gives access to a range of helper functions for typing, and printing text output in a veriety of colors. 
 * Date: 10/14/2023
 */
   
 import { sleepSync } from "./helperFunctions/sleepSync";

/**
 * Enum representing textSpeed in ms intervals/
 */
export enum textSpeed {
    slow = 200,
    medium = 90,
    fast = 50,
    very_fast = 35,
    uber_speed = 15
}

/**
 * Enum that represents different colors coresponding to the textcodes in this format: '\x1b[38;5;<color_number>m'
 */
export enum textColor {
    green = 40,
    darkGreen = 22,
    blue = 27,
    red = 196,
    white = 15,
    cyan = 45,
    yellow = 226
}

const resetCode = '\x1b[0m'; // Reset code is to set text color to default after colored text is printed


/**
 * Types text letter by letter with the given speed and text color on the CMD.
 * @param text The text to print on the CMD.
 * @param speed The speed of the text to print on the CMD. Uses the textSpeed enum.
 * @param isCentered True or false value on if you want the text to be centered when printing.
 * @param colorCode The color you want the text to be. Uses the textColor enum.
 */
export async function typeText(text: string, speed: textSpeed, isCentered: boolean, colorCode: number = 0) {
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

/**
 * prints out the given text with green color on the console.
 * @param input The text to be printed green.
 */
export function printGreen(input: string) {
    const text = `\x1b[38;5;${textColor.green}m${input}${resetCode}`;
    printText(text);
}

/**
 * prints out the given text with red color on the console.
 * @param input The text to be printed red.
 */
export function printRed(input: string) {
    const text = `\x1b[38;5;${textColor.red}m${input}${resetCode}`;
    printText(text);
}

/**
 * prints out the given text with blue color on the console.
 * @param input The text to be printed blue.
 */
export function printBlue(input: string) {
    const text = `\x1b[38;5;${textColor.blue}m${input}${resetCode}`;
    printText(text);

}

/**
 * prints out the given text with white color on the console.
 * @param input The text to be printed white.
 */
export function printWhite(input: string) {
    const text = `\x1b[38;5;${textColor.white}m${input}${resetCode}`;
    printText(text);
}

/**
 * prints out the given text with dark green color on the console.
 * @param input The text to be printed dark green.
 */
export function printDarkGreen(input: string) {
    const text = `\x1b[38;5;${textColor.darkGreen}m${input}${resetCode}`;
    printText(text);
}

/**
 * prints out the given text with cyan color on the console.
 * @param input The text to be printed cyan.
 */
export function printCyan(input: string) {
    const text = `\x1b[38;5;${textColor.cyan}m${input}${resetCode}`;
    printText(text);
}

/**
 * Helper function to print out a char and then wait 35 ms
 * @param text The text to print out one char at a time.
 */
export async function printText(text: string): Promise<void> {
    for (const char of text) {
        process.stdout.write(char);
        sleepSync(35);
    }
}

