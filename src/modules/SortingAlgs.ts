 /**
 * File: SortingAlgs.ts
 * Author: Seth Carter
 * Description: This file contains a number of examples and implementations of sorting algorithms for use in the Scripts module. 
 * Date: 10/14/2023
 */

import * as textPrint from "./TextPrinter";
import { PersonInfo } from "./App";
import { sleepSync } from "./helperFunctions/sleepSync";
import { printText } from "./TextPrinter";

/**
 * Sorts a given string alphabetically while explain the stepsof the sort.
 * @param input The string to sort alphabetically.
 * @returns The alphabetically sorted string
 */
export function quickSort(input: string): string {
    const charArray = input.split(''); // Split the string into an array of characters
    let sortMemory: string[][] = []; //holds the memory of sorted char (This is only for the printed examples)

    const enum forkDirection {
        left = "l",
        right = "r",
        none = "n"
    };

    function quickSortChars(arr: string[], fDir: forkDirection = forkDirection.none, parentInfo: string[] = []): string[] {
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
            } else if (comparison === 0) {
                equal.push(char);
            } else {
                right.push(char);
            }
        }

        printText("\n");
        //sleepSync(1000);
        if (fDir == forkDirection.left) {
            printText("\nNow sorting |");
            textPrint.printBlue(arr.join(""));
            printText("|, we choose a random pivot: ");
        } else if (fDir == forkDirection.right) {
            printText("Now sorting |");
            textPrint.printGreen(arr.join(""));
            printText("|, we choose a random pivot: ");
        } else {
            printText("|");
            printText(arr.join(""));
            printText("| picks a random pivot: ");
        }
        textPrint.printRed(pivot);
        //sleepSync(1000);
        printText("\nwe find ");
        if (left.length > 0) {
            if (left.length > 1) {
                printText("letters  |");
                textPrint.printBlue(left.join(", "));
                printText("| come before ");
                textPrint.printRed(pivot);
            } else {
                printText("one letter |");
                textPrint.printBlue(left.join(", "));
                printText("| that comes before ");
                textPrint.printRed(pivot);
            }
        } else {
            printText("no letters that come before ");
            textPrint.printRed(pivot);
        }
        //sleepSync(1000);
        printText("\nand ")
        if (right.length > 0) {
            if (right.length > 1) {
                printText("letters  |");
                textPrint.printGreen(right.join(", "));
                printText("| come after ");
                textPrint.printRed(pivot + "\n");
            } else {
                printText("one letter |");
                textPrint.printGreen(right.join(", "));
                printText("| that comes after ");
                textPrint.printRed(pivot + "\n");
            }
        } else {
            printText("no letters that come after ");
            textPrint.printRed(pivot + "\n");
        }

        sleepSync(1000);
        printText("So far, we can order these groups: ");
        if (fDir != forkDirection.none) {
            const chunkIndex = findIndexWithArrayComparison(sortMemory, arr);
            sortMemory[chunkIndex] = left;
            sortMemory.splice(chunkIndex + 1, 0, equal);
            sortMemory.splice(chunkIndex + 2, 0, right);
            sortMemory.forEach(e => (e.length > 0 ? textPrint.printCyan("[" + e + "], ") : null));
            printText("\n")

        } else {
            textPrint.printCyan("[" + left.join(", ") + "], [" + equal.join(", ") + "], [" + right.join(", ") + "]\n");
            sortMemory[0] = [...left];
            sortMemory[1] = [...equal];
            sortMemory[2] = [...right];
        }
        sleepSync(1000);

        return [...quickSortChars(left, forkDirection.left, equal.concat(right)), ...equal, ...quickSortChars(right, forkDirection.right)];
    }

    const sortedCharArray = quickSortChars(charArray); // Sort the characters
    return sortedCharArray.join(''); // Join the characters back into a single string
}

/**
 * sorts an array of PersonInfo by licence type using a standard stable sort.
 * @param people array of PersonInfo[] to be sorted by licence type.
 * @returns the sorted list of PersonInfo[], sorted by licence type.
 */
export function stableSort(people: PersonInfo[]): PersonInfo[] {
    return people.sort((a, b) => {
        const licenseComparison = a.licenseType.localeCompare(b.licenseType);
        if (licenseComparison !== 0) {
            return licenseComparison;
        } else {
            return a.fName.localeCompare(b.fName);
        }
    });
}

/**
 * Uses mergeSort to sort a given name alphabetically while explaining the sort in steps on the console.
 * @param str the name to be sorted.
 * @returns the alphabetically sorted name.
 */
export function mergeSort(str: string): string {
    textPrint.printGreen("\nWe start off with your name: ");
    textPrint.printCyan(str);
    const arr = str.split(''); // Convert the string to an array of characters
    textPrint.printGreen("\n\nWe divide the array, in this case your name, into its individual components: ");
    textPrint.printCyan(arr.join(", "));
    textPrint.printGreen("\n\nNow it’s time to recursively merge the components back together, making sure to put them in order as we go:\n");
    const sortedArray = mergeSortRecursive(arr);
    const sortedStr = sortedArray.join(''); // Convert the sorted array back to a string
    return sortedStr;
}

/**
 * The helper function for merge sort that recursivly calls itself until the input is sorted.
 * @param arr The array to be sorted.
 * @returns The sorted Array
 */
function mergeSortRecursive(arr: string[]): string[] {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const leftArray = arr.slice(0, mid);
    const rightArray = arr.slice(mid);

    const sortedLeft = mergeSortRecursive(leftArray);
    const sortedRight = mergeSortRecursive(rightArray);

    const merged = merge(sortedLeft, sortedRight);
    textPrint.printGreen("We combine ");
    if (sortedLeft.length == 1) {
        textPrint.printWhite("[" + sortedLeft.join(", ") + "]");
        textPrint.printGreen(" and ")
        if (sortedRight.length == sortedLeft.length){
            textPrint.printWhite("[" + sortedRight.join(", ") + "] ")
        } else{
            textPrint.printRed("[" + sortedRight.join(", ") + "] ")
        }
        textPrint.printGreen("to get ");
        textPrint.printRed("[" + [...merged].toString() + "] \n");
    } else if (sortedLeft.length < 4) {
        textPrint.printRed("[" + sortedLeft.join(", ") + "]");
        textPrint.printGreen(" and ")
        textPrint.printRed("[" + sortedRight.join(", ") + "] ")
        textPrint.printGreen("to get ");
        textPrint.printBlue("[" + [...merged].toString() + "] \n");
    } else {
        textPrint.printBlue("[" + sortedLeft.join(", ") + "]");
        textPrint.printGreen(" and ")
        textPrint.printBlue("[" + sortedRight.join(", ") + "] ")
        textPrint.printGreen("to get ");
        textPrint.printCyan("[" + [...merged].toString() + "] \n");
    }
    return merged;
}

/**
 * A helper function for mergeSort that merges to inputs to be in order.
 * @param left  The left input to merge.
 * @param right The right input to be merged.
 * @returns The in-order merged data.
 */
function merge(left: string[], right: string[]): string[] {
    const result: string[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

/**
 * Helper function that checks if two given arrays are equal.
 * @param arr1 Array to be checked if equal to array 2.
 * @param arr2 Array to be checked if equal to array 1.
 * @returns True if arrays are equal, false otherwise.
 */
function arraysAreEqual(arr1: string[], arr2: string[]): boolean {
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

/**
 * Helper function that finds the index of a 2d array that contains a given 1d target array.
 * @param arr 2d array to search in for a 1d array.
 * @param targetArray 1d array to look for within a 2d array.
 * @returns the index of 2d array that contains the target array.
 */
function findIndexWithArrayComparison(arr: string[][], targetArray: string[]): number {
    return arr.findIndex((item) => arraysAreEqual(item, targetArray));
}

/**
 * Implementation of heap sort for sorting PersonInfo[] by either fName or licenceType.
 * @param people an array of PersonInfo[] to sort.
 * @param sortBy either 'fName' to sort by first name, or 'licenseType' to sort by licence type.
 * @returns 
 */
export function heapSort(
    people: PersonInfo[],
    sortBy: 'fName' | 'licenseType'
): PersonInfo[] {
    // Build a max heap
    function buildMaxHeap(arr: PersonInfo[]) {
        const n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
    }

    // Heapify a subtree rooted with the node at the given index
    function heapify(arr: PersonInfo[], n: number, i: number) {
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
    function compare(a: PersonInfo, b: PersonInfo): number {
        if (sortBy === 'fName') {
            return a.fName.localeCompare(b.fName);
        } else {
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