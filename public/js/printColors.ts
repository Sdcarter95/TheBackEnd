import { textColor } from "./app";

const resetCode = '\x1b[0m'; // Reset code is to set text color to default after colored text is printed
export function printGreen(input: string){
    const text = `\x1b[38;5;${textColor.green}m${input}${resetCode}`;
    process.stdout.write(text);
}

export function printRed(input: string){
    const text = `\x1b[38;5;${textColor.red}m${input}${resetCode}`;
    process.stdout.write(text);
}

export function printBlue(input: string){
    const text = `\x1b[38;5;${textColor.blue}m${input}${resetCode}`;
    process.stdout.write(text);

}

export function printWhite(input: string){
    const text = `\x1b[38;5;${textColor.white}m${input}${resetCode}`;
    process.stdout.write(text);
}

export function printDarkGreen(input: string){
    const text = `\x1b[38;5;${textColor.darkGreen}m${input}${resetCode}`;
    process.stdout.write(text);
}

export function printCyan(input: string){
    const text = `\x1b[38;5;${textColor.cyan}m${input}${resetCode}`;
    process.stdout.write(text);
}