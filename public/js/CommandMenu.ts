import * as readline from 'readline';

export class CommandMenu {
  private rl: readline.Interface;
  private options: Map<string, () => void | Promise<void>>;
  private numericOptions: Map<number, string>;
  private menuMessage: string;

  constructor() {
    this.rl = newReadLine();
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
    while (true) {
      console.log(this.menuMessage);
      this.displayMenu();
      const choice = await this.prompt('Select an option: ');

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
        console.log('Invalid option. Please try again.');
      }
    }
  }

  private displayMenu() {
    console.log('Menu:');
    let index = 1;
    for (const [label, _] of this.options) {
      console.log(`${index}. ${label}`);
      index++;
    }
    console.log('0. Return');
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
