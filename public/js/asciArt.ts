import { textColor } from "./TextPrinter";
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

function printGreen(input: string){
    const text = `\x1b[38;5;${textColor.green}m${input}${resetCode}`;
    process.stdout.write(text);

}

function printWhite(input: string){
    const text = `\x1b[38;5;${textColor.white}m${input}${resetCode}`;
    process.stdout.write(text);

}

function printDarkGreen(input: string){
    const text = `\x1b[38;5;${textColor.darkGreen}m${input}${resetCode}`;
    process.stdout.write(text);

}



