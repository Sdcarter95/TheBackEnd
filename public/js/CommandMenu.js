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
exports.CommandMenu = void 0;
const readline = __importStar(require("readline"));
class CommandMenu {
    constructor() {
        this.rl = newReadLine();
        this.options = new Map();
        this.numericOptions = new Map();
        this.menuMessage = "";
    }
    addOption(label, action) {
        const numericChoice = this.options.size + 1;
        this.options.set(label, action);
        this.numericOptions.set(numericChoice, label);
    }
    setMenuMessage(message) {
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
                const selectedAction = this.options.get(selectedLabel);
                if (selectedAction) {
                    this.rl.close();
                    await selectedAction();
                    this.rl = newReadLine();
                }
            }
            else {
                console.log('Invalid option. Please try again.');
            }
        }
    }
    displayMenu() {
        console.log('Menu:');
        let index = 1;
        for (const [label, _] of this.options) {
            console.log(`${index}. ${label}`);
            index++;
        }
        console.log('0. Return');
    }
    prompt(question) {
        return new Promise((resolve) => {
            this.rl.question(question, resolve);
        });
    }
}
exports.CommandMenu = CommandMenu;
function newReadLine() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return rl;
}
