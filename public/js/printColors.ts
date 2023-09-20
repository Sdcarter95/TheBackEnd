import { textColor } from "./app";

const resetCode = '\x1b[0m'; // Reset code is to set text color to default after colored text is printed
export function printGreen(input: string) {
    const text = `\x1b[38;5;${textColor.green}m${input}${resetCode}`;
    printText(text);
}

export function printRed(input: string) {
    const text = `\x1b[38;5;${textColor.red}m${input}${resetCode}`;
    printText(text);
}

export function printBlue(input: string) {
    const text = `\x1b[38;5;${textColor.blue}m${input}${resetCode}`;
    printText(text);

}

export function printWhite(input: string) {
    const text = `\x1b[38;5;${textColor.white}m${input}${resetCode}`;
    printText(text);
}

export function printDarkGreen(input: string) {
    const text = `\x1b[38;5;${textColor.darkGreen}m${input}${resetCode}`;
    printText(text);
}

export function printCyan(input: string) {
    const text = `\x1b[38;5;${textColor.cyan}m${input}${resetCode}`;
    printText(text);
}

function sleepSync(ms: number): void {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Busy-wait until the desired time has passed
    }
}

async function printText(text: string): Promise<void> {
    for (const char of text) {
        process.stdout.write(char);
        sleepSync(35);
    }
}