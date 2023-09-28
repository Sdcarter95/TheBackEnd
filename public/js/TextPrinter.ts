    
// text speed is measured in ms intervals
export enum textSpeed {
    slow = 200,
    medium = 90,
    fast = 50,
    very_fast = 35,
    uber_speed = 15
}

// textcodes corespond to the format: '\x1b[38;5;<color_number>m'
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