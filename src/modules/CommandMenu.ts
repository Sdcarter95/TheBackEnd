/**
 * File: CommandMenu.ts
 * Author: Seth Carter
 * Description: This file allows for the creation of command menues when called from an outside class.
 * Date: 10/14/2023
 */

import * as readline from 'readline';
import { typeText, textSpeed, textColor } from "./TextPrinter";

/**
 * This class works like a builder wherin a client can call for it's creation, set the content as desired, and then start the menue.
 */
export class CommandMenu {
  private rl: any;
  private options: Map<string, () => void | Promise<void>>;
  private numericOptions: Map<number, string>;
  private menuMessage: string; //The message that only prints when the menu is started 
  private menuQuestion: string; //the question asked before the menu options every time
  private menuFunction: () => void; //optional function to run when a munu is started

  constructor() {
    this.options = new Map<string, () => void | Promise<void>>();
    this.numericOptions = new Map<number, string>();
    this.menuMessage = ""; 
    this.menuQuestion = "";
    this.menuFunction = () => {};
  }

  /**
   * Add a menu option, along with the function that runs when that option is selected.
   * @param label The name of the menu option to be displayed.
   * @param action The function that runs when the option is selected.
   */
  addOption(label: string, action: () => void | Promise<void>) {
    const numericChoice = this.options.size + 1;
    this.options.set(label, action);
    this.numericOptions.set(numericChoice, label);
  }

  /**
   * Sets the message that prints only when the option is first selected.
   * @param message The message that will be printed when the option is selected. 
   */
  setMenuMessage(message: string) {
    this.menuMessage = message;
  }

  /**
   * Sets the question that will be asked to the user before they select an option from the menu.
   * @param question The question to ask the user before option selection.
   */
  setMenuQuestion(question: string){
    this.menuQuestion = question;
  }

  /**
   * Sets a function that runs when the menu first start. NOTE: Most implimentations will not use this.
   * @param func the function to run then the menu starts.
   */
  setMenuFunction(func: () => void){
    this.menuFunction = func;
  }

  /**
   * Starts the menu based on the given options.
   */
  async start() {
    this.rl = newReadLine();

    this.menuFunction();
    await typeText("\n\n" + this.menuMessage, textSpeed.very_fast, true, textColor.green);
    while (true) {
      await typeText("\n\n" + this.menuQuestion, textSpeed.very_fast, true, textColor.green);
      await this.displayMenu();
      const choice = await this.prompt('');

      if (choice === '0') {
        this.rl.close();
        break;
      }

      const numericChoice = parseInt(choice, 10);

      if (numericChoice >= 1 && numericChoice <= this.options.size) {
        const selectedLabel = this.numericOptions.get(numericChoice);
        const selectedAction = this.options.get(selectedLabel!);

        if (selectedAction) {
          this.rl.close();
          await selectedAction();
          this.rl = newReadLine();
        }
      } else {
        await typeText('Invalid option. Please try again.', textSpeed.uber_speed, true, textColor.green);
      }
    }
  }

  /**
   * Helper function that displays the options of the menu.
   */
  private async displayMenu() {
    let index = 1;
    for (const [label, _] of this.options) {
      await typeText(`\n${index}. ${label}`, textSpeed.uber_speed, true, textColor.green);
      index++;
    }
    await typeText('\n0. Return\n', textSpeed.uber_speed, true, textColor.green);
  }

  /**
   * Helper function that asks the user the set question and awaits their input.
   * @param question The question that will be asked to the user.
   * @returns the user input response.
   */
  private prompt(question: string): Promise<string> {   
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  }
}

/**
 * Helper function that creates a new readline interface.
 * @returns the new readline interfrace.
 */
function newReadLine(): readline.Interface {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return rl;
}
