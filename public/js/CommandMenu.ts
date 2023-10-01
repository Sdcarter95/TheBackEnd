import * as readline from 'readline';
import { typeText, textSpeed, textColor } from "./TextPrinter";

export class CommandMenu {
  private rl: any;
  private options: Map<string, () => void | Promise<void>>;
  private numericOptions: Map<number, string>;
  private menuMessage: string;

  constructor() {
    this.options = new Map<string, () => void | Promise<void>>();
    this.numericOptions = new Map<number, string>();
    this.menuMessage = ""; 
  }

  addOption(label: string, action: () => void | Promise<void>) {
    const numericChoice = this.options.size + 1;
    this.options.set(label, action);
    this.numericOptions.set(numericChoice, label);
  }

  setMenuMessage(message: string) {
    this.menuMessage = message;
  }

  async start() {
    this.rl = newReadLine();
    while (true) {
      await typeText(this.menuMessage, textSpeed.very_fast, true, textColor.green);
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

  private async displayMenu() {
    let index = 1;
    for (const [label, _] of this.options) {
      await typeText(`\n${index}. ${label}`, textSpeed.uber_speed, true, textColor.green);
      index++;
    }
    await typeText('\n0. Return\n', textSpeed.uber_speed, true, textColor.green);
  }

  private prompt(question: string): Promise<string> {   
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  }
}

function newReadLine(): readline.Interface {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return rl;
}
