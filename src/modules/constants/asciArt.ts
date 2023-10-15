/**
 * File: asciArt.ts
 * Author: Seth Carter
 * Description: This file contains constants for the asci art to be printed in CMD.
 * Date: 10/14/2023
 */

import { textColor } from "../TextPrinter";
const resetCode = '\x1b[0m'; // Reset code is to set text color to default after colored text is printed

export const author = `\n\n
╭╮╱╱╱╱╱╱╭━━━╮╱╱╭╮╭╮╱╱╭━━━╮╱╱╱╱╭╮
┃┃╱╱╱╱╱╱┃╭━╮┃╱╭╯╰┫┃╱╱┃╭━╮┃╱╱╱╭╯╰╮
┃╰━┳╮╱╭╮┃╰━━┳━┻╮╭┫╰━╮┃┃╱╰╋━━┳┻╮╭╋━━┳━╮
┃╭╮┃┃╱┃┃╰━━╮┃┃━┫┃┃╭╮┃┃┃╱╭┫╭╮┃╭┫┃┃┃━┫╭╯
┃╰╯┃╰━╯┃┃╰━╯┃┃━┫╰┫┃┃┃┃╰━╯┃╭╮┃┃┃╰┫┃━┫┃
╰━━┻━╮╭╯╰━━━┻━━┻━┻╯╰╯╰━━━┻╯╰┻╯╰━┻━━┻╯
╱╱╱╭━╯┃
╱╱╱╰━━╯`;

export const title = `\n
████████╗██╗░░██╗███████╗  ██████╗░░█████╗░░█████╗░██╗░░██╗  ███████╗███╗░░██╗██████╗░
╚══██╔══╝██║░░██║██╔════╝  ██╔══██╗██╔══██╗██╔══██╗██║░██╔╝  ██╔════╝████╗░██║██╔══██╗
░░░██║░░░███████║█████╗░░  ██████╦╝███████║██║░░╚═╝█████═╝░  █████╗░░██╔██╗██║██║░░██║
░░░██║░░░██╔══██║██╔══╝░░  ██╔══██╗██╔══██║██║░░██╗██╔═██╗░  ██╔══╝░░██║╚████║██║░░██║
░░░██║░░░██║░░██║███████╗  ██████╦╝██║░░██║╚█████╔╝██║░╚██╗  ███████╗██║░╚███║██████╔╝
░░░╚═╝░░░╚═╝░░╚═╝╚══════╝  ╚═════╝░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝  ╚══════╝╚═╝░░╚══╝╚═════╝░`;

/**
 * Prints the "Back End" asci title.
 */
export function printTitle(){
    
    for (let index = 0; index < title.length; index++) {
        const character = title[index];
        if (character == "█") {
            printWhite(title[index]);
        }
        else{
            printGreen(title[index]);
        }
    }
}

/**
 * Prints the author asci art.
 */
export function printAuthor(){
    
    for (let index = 0; index < author.length; index++) {
        const character = author[index];
        if (character == "╱") {
            printDarkGreen(author[index]);
        }
        else{
            printGreen(author[index]);
        }
    }
}

/**
 * helper function to print given characters in the green color.
 * @param input the chars to print green
 */
function printGreen(input: string){
    const text = `\x1b[38;5;${textColor.green}m${input}${resetCode}`;
    process.stdout.write(text);

}

/**
 * helper function to print given characters in the white color.
 * @param input the chars to print white
 */
function printWhite(input: string){
    const text = `\x1b[38;5;${textColor.white}m${input}${resetCode}`;
    process.stdout.write(text);

}

/**
 * helper function to print given characters in the dark green color.
 * @param input the chars to print dark green
 */
function printDarkGreen(input: string){
    const text = `\x1b[38;5;${textColor.darkGreen}m${input}${resetCode}`;
    process.stdout.write(text);

}



