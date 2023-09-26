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
exports.heapSort = exports.mergeSort = exports.stableSort = exports.quickSort = void 0;
const colorPrint = __importStar(require("./printColors"));
function quickSort(input) {
    const charArray = input.split(''); // Split the string into an array of characters
    let sortMemory = []; //holds the memory of sorted char (This is only for the printed examples)
    ;
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
        printText("\n");
        //sleepSync(1000);
        if (fDir == "l" /* forkDirection.left */) {
            printText("\nNow sorting |");
            colorPrint.printBlue(arr.join(""));
            printText("|, we choose a random pivot: ");
        }
        else if (fDir == "r" /* forkDirection.right */) {
            printText("Now sorting |");
            colorPrint.printGreen(arr.join(""));
            printText("|, we choose a random pivot: ");
        }
        else {
            printText("|");
            printText(arr.join(""));
            printText("| picks a random pivot: ");
        }
        colorPrint.printRed(pivot);
        //sleepSync(1000);
        printText("\nwe find ");
        if (left.length > 0) {
            if (left.length > 1) {
                printText("letters  |");
                colorPrint.printBlue(left.join(", "));
                printText("| come before ");
                colorPrint.printRed(pivot);
            }
            else {
                printText("one letter |");
                colorPrint.printBlue(left.join(", "));
                printText("| that comes before ");
                colorPrint.printRed(pivot);
            }
        }
        else {
            printText("no letters that come before ");
            colorPrint.printRed(pivot);
        }
        //sleepSync(1000);
        printText("\nand ");
        if (right.length > 0) {
            if (right.length > 1) {
                printText("letters  |");
                colorPrint.printGreen(right.join(", "));
                printText("| come after ");
                colorPrint.printRed(pivot + "\n");
            }
            else {
                printText("one letter |");
                colorPrint.printGreen(right.join(", "));
                printText("| that comes after ");
                colorPrint.printRed(pivot + "\n");
            }
        }
        else {
            printText("no letters that come after ");
            colorPrint.printRed(pivot + "\n");
        }
        sleepSync(1000);
        printText("So far, we can order these groups: ");
        if (fDir != "n" /* forkDirection.none */) {
            const chunkIndex = findIndexWithArrayComparison(sortMemory, arr);
            sortMemory[chunkIndex] = left;
            sortMemory.splice(chunkIndex + 1, 0, equal);
            sortMemory.splice(chunkIndex + 2, 0, right);
            sortMemory.forEach(e => (e.length > 0 ? colorPrint.printCyan("[" + e + "], ") : null));
            printText("\n");
        }
        else {
            colorPrint.printCyan("[" + left.join(", ") + "], [" + equal.join(", ") + "], [" + right.join(", ") + "]\n");
            sortMemory[0] = [...left];
            sortMemory[1] = [...equal];
            sortMemory[2] = [...right];
        }
        sleepSync(1000);
        return [...quickSortChars(left, "l" /* forkDirection.left */, equal.concat(right)), ...equal, ...quickSortChars(right, "r" /* forkDirection.right */)];
    }
    const sortedCharArray = quickSortChars(charArray); // Sort the characters
    return sortedCharArray.join(''); // Join the characters back into a single string
}
exports.quickSort = quickSort;
function stableSort(people) {
    return people.sort((a, b) => {
        const licenseComparison = a.licenseType.localeCompare(b.licenseType);
        if (licenseComparison !== 0) {
            return licenseComparison;
        }
        else {
            return a.fName.localeCompare(b.fName);
        }
    });
}
exports.stableSort = stableSort;
function mergeSort(str) {
    colorPrint.printGreen("\nWe start off with your name: ");
    colorPrint.printCyan(str);
    const arr = str.split(''); // Convert the string to an array of characters
    colorPrint.printGreen("\n\nWe divide the array, in this case your name, into its individual components: ");
    colorPrint.printCyan(arr.join(", "));
    colorPrint.printGreen("\n\nNow it’s time to recursively merge the components back together, making sure to put them in order as we go:\n");
    const sortedArray = mergeSortRecursive(arr);
    const sortedStr = sortedArray.join(''); // Convert the sorted array back to a string
    return sortedStr;
}
exports.mergeSort = mergeSort;
function mergeSortRecursive(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const leftArray = arr.slice(0, mid);
    const rightArray = arr.slice(mid);
    const sortedLeft = mergeSortRecursive(leftArray);
    const sortedRight = mergeSortRecursive(rightArray);
    const merged = merge(sortedLeft, sortedRight);
    colorPrint.printGreen("We combine ");
    if (sortedLeft.length == 1) {
        colorPrint.printWhite("[" + sortedLeft.join(", ") + "]");
        colorPrint.printGreen(" and ");
        if (sortedRight.length == sortedLeft.length) {
            colorPrint.printWhite("[" + sortedRight.join(", ") + "] ");
        }
        else {
            colorPrint.printRed("[" + sortedRight.join(", ") + "] ");
        }
        colorPrint.printGreen("to get ");
        colorPrint.printRed("[" + [...merged].toString() + "] \n");
    }
    else if (sortedLeft.length < 4) {
        colorPrint.printRed("[" + sortedLeft.join(", ") + "]");
        colorPrint.printGreen(" and ");
        colorPrint.printRed("[" + sortedRight.join(", ") + "] ");
        colorPrint.printGreen("to get ");
        colorPrint.printBlue("[" + [...merged].toString() + "] \n");
    }
    else {
        colorPrint.printBlue("[" + sortedLeft.join(", ") + "]");
        colorPrint.printGreen(" and ");
        colorPrint.printBlue("[" + sortedRight.join(", ") + "] ");
        colorPrint.printGreen("to get ");
        colorPrint.printCyan("[" + [...merged].toString() + "] \n");
    }
    return merged;
}
function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        }
        else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}
function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
function findIndexWithArrayComparison(arr, targetArray) {
    return arr.findIndex((item) => arraysAreEqual(item, targetArray));
}
function sleepSync(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Busy-wait until the desired time has passed
    }
}
async function printText(text) {
    for (const char of text) {
        process.stdout.write(char);
        sleepSync(35);
    }
}
function heapSort(people, sortBy) {
    // Build a max heap
    function buildMaxHeap(arr) {
        const n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
    }
    // Heapify a subtree rooted with the node at the given index
    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < n && compare(arr[left], arr[largest]) > 0) {
            largest = left;
        }
        if (right < n && compare(arr[right], arr[largest]) > 0) {
            largest = right;
        }
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap elements
            heapify(arr, n, largest);
        }
    }
    const n = people.length;
    // Define a comparison function based on the sortBy argument
    function compare(a, b) {
        if (sortBy === 'fName') {
            return a.fName.localeCompare(b.fName);
        }
        else {
            return a.licenseType.localeCompare(b.licenseType);
        }
    }
    // Build the max heap
    buildMaxHeap(people);
    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move the current root to the end
        [people[0], people[i]] = [people[i], people[0]];
        // Call heapify on the reduced heap
        heapify(people, i, 0);
    }
    return people;
}
exports.heapSort = heapSort;
