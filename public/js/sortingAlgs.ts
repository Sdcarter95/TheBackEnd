import * as colorPrint from "./printColors";

const enum forkDirection {
    left = "l",
    right = "r",
    none = "n"
};

export function quickSort(input: string): string {
    const charArray = input.split(''); // Split the string into an array of characters
    let sortMemory: string[][] = []; //holds the memory of sorted char (This is only for the printed examples)

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
        if(fDir == forkDirection.left){
            printText("\nNow sorting |");
            colorPrint.printBlue(arr.join(""));
            printText("|, we choose a random pivot: ");
        } else if(fDir == forkDirection.right){
            printText("Now sorting |");
            colorPrint.printGreen(arr.join(""));
            printText("|, we choose a random pivot: ");
        } else {
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
            } else {
                printText("one letter |");
                colorPrint.printBlue(left.join(", "));
                printText("| that comes before ");
                colorPrint.printRed(pivot);
            }
        } else {
            printText("no letters that come before ");
            colorPrint.printRed(pivot);
        }
        //sleepSync(1000);
        printText("\nand ")
        if (right.length > 0) {
            if (right.length > 1) {
                printText("letters  |");
                colorPrint.printGreen(right.join(", "));
                printText("| come after ");
                colorPrint.printRed(pivot + "\n");
            } else {
                printText("one letter |");
                colorPrint.printGreen(right.join(", "));
                printText("| that comes after ");
                colorPrint.printRed(pivot + "\n");
            }
        } else {
            printText("no letters that come after ");
            colorPrint.printRed(pivot + "\n");
        }

        sleepSync(1000);
        printText("So far, we can order these groups: ");
        if (fDir !=  forkDirection.none) {
            const chunkIndex = findIndexWithArrayComparison(sortMemory, arr);
            sortMemory[chunkIndex] = left;
            sortMemory.splice(chunkIndex + 1, 0 , equal);
            sortMemory.splice(chunkIndex + 2, 0 , right);
            sortMemory.forEach( e => (e.length>0?colorPrint.printCyan("[" + e + "], "):null));
            printText("\n")

        } else{
            colorPrint.printCyan("[" + left.join(", ") + "], [" + equal.join(", ") + "], [" + right.join(", ") + "]\n");
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

  function findIndexWithArrayComparison(arr: string[][], targetArray: string[]): number {
    return arr.findIndex((item) => arraysAreEqual(item, targetArray));
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