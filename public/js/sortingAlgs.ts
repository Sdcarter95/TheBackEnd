import * as colorPrint from "./printColors";

const enum forkDirection {
    left = "l",
    right = "r",
    none = "n"
};

export function quickSort(input: string): string {
    const charArray = input.split(''); // Split the string into an array of characters
    let arrayProgress: string[];

    printText("");
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


      printText("\n|" + arr.join("") + "| chooses a random pivot: ");
      colorPrint.printRed(pivot);
      printText(", and finds ");
      if(left.length > 0){
        if(left.length > 1){
            printText("letters  |");
            colorPrint.printBlue(left.join(", "));
            printText("| come before "+ pivot)
        } else{
            printText("one letter |");
            colorPrint.printBlue(left.join(", "));
            printText("| that comes before "+ pivot)
        }
      } else{
        printText("no letters that come before "+ pivot)
      }
      printText(" and ")
      if(right.length > 0){
        if(right.length > 1){
            printText("letters  |");
            colorPrint.printGreen(right.join(", "));
            printText("| come after "+ pivot +"\n")
        } else{
            printText("one letter |");
            colorPrint.printGreen(right.join(", "));
            printText("| that comes after " + pivot +"\n")
        }
      } else{
        printText("no letters that come after " + pivot + "\n")
      }

      printText("So far, we can order these groups: ");
      if(fDir == forkDirection.left){
        colorPrint.printCyan( left.join("") + ", " + equal.join("") + ", " + right.join("") + ", " + parentInfo.join("") + "\n\n");
        arrayProgress = left.concat(equal).concat(right);
      } else if (fDir == forkDirection.right) {
        colorPrint.printCyan( arrayProgress.join(", ") + ", " +  left.join("") + ", " + equal.join("") + ", " + right.join("") + "\n\n");
        arrayProgress = arrayProgress.concat(left.join("")).concat(equal.join(""));
      } else{
        
      }
  
      return [...quickSortChars(left, forkDirection.left, equal.concat(right)), ...equal, ...quickSortChars(right, forkDirection.right)];
    }
  
    const sortedCharArray = quickSortChars(charArray); // Sort the characters
    return sortedCharArray.join(''); // Join the characters back into a single string
  }
  
  function printText(output: any) {
    process.stdout.write(output);
  }

 
  
  


