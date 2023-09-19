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
exports.quickSort = void 0;
const colorPrint = __importStar(require("./printColors"));
;
function quickSort(input) {
    const charArray = input.split(''); // Split the string into an array of characters
    let arrayProgress;
    printText("");
    function quickSortChars(arr, fDir = "n" /* forkDirection.none */, parentInfo = []) {
        if (arr.length <= 1) {
            return arr; // Base case: an array with 0 or 1 elements is already sorted
        }
        const pivotIndex = Math.floor(Math.random() * arr.length);
        const pivot = arr[pivotIndex]; // Choose a random pivot element
        const left = [];
        const right = [];
        const equal = [];
        for (const char of arr) {
            const comparison = char.localeCompare(pivot);
            if (comparison < 0) {
                left.push(char);
            }
            else if (comparison === 0) {
                equal.push(char);
            }
            else {
                right.push(char);
            }
        }
        printText("\n|" + arr.join("") + "| chooses a random pivot: ");
        colorPrint.printRed(pivot);
        printText(", and finds ");
        if (left.length > 0) {
            if (left.length > 1) {
                printText("letters  |");
                colorPrint.printBlue(left.join(", "));
                printText("| come before " + pivot);
            }
            else {
                printText("one letter |");
                colorPrint.printBlue(left.join(", "));
                printText("| that comes before " + pivot);
            }
        }
        else {
            printText("no letters that come before " + pivot);
        }
        printText(" and ");
        if (right.length > 0) {
            if (right.length > 1) {
                printText("letters  |");
                colorPrint.printGreen(right.join(", "));
                printText("| come after " + pivot + "\n");
            }
            else {
                printText("one letter |");
                colorPrint.printGreen(right.join(", "));
                printText("| that comes after " + pivot + "\n");
            }
        }
        else {
            printText("no letters that come after " + pivot + "\n");
        }
        printText("So far, we can order these groups: ");
        if (fDir == "l" /* forkDirection.left */) {
            colorPrint.printCyan(left.join("") + ", " + equal.join("") + ", " + right.join("") + ", " + parentInfo.join("") + "\n\n");
            arrayProgress = left.concat(equal).concat(right);
        }
        else if (fDir == "r" /* forkDirection.right */) {
            colorPrint.printCyan(arrayProgress.join(", ") + ", " + left.join("") + ", " + equal.join("") + ", " + right.join("") + "\n\n");
            arrayProgress = arrayProgress.concat(left.join("")).concat(equal.join(""));
        }
        else {
        }
        return [...quickSortChars(left, "l" /* forkDirection.left */, equal.concat(right)), ...equal, ...quickSortChars(right, "r" /* forkDirection.right */)];
    }
    const sortedCharArray = quickSortChars(charArray); // Sort the characters
    return sortedCharArray.join(''); // Join the characters back into a single string
}
exports.quickSort = quickSort;
function printText(output) {
    process.stdout.write(output);
}
