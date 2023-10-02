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
const TextPrinter_1 = require("./TextPrinter");
class CommandMenu {
    constructor() {
        this.options = new Map();
        this.numericOptions = new Map();
        this.menuMessage = "";
        this.menuQuestion = "";
        this.menuFunction = () => { };
    }
    addOption(label, action) {
        const numericChoice = this.options.size + 1;
        this.options.set(label, action);
        this.numericOptions.set(numericChoice, label);
    }
    setMenuMessage(message) {
        this.menuMessage = message;
    }
    setMenuQuestion(question) {
        this.menuQuestion = question;
    }
    setMenuFunction(func) {
        this.menuFunction = func;
    }
    async start() {
        this.rl = newReadLine();
        this.menuFunction();
        await (0, TextPrinter_1.typeText)("\n\n" + this.menuMessage, TextPrinter_1.textSpeed.very_fast, true, TextPrinter_1.textColor.green);
        while (true) {
            await (0, TextPrinter_1.typeText)("\n\n" + this.menuQuestion, TextPrinter_1.textSpeed.very_fast, true, TextPrinter_1.textColor.green);
            await this.displayMenu();
            const choice = await this.prompt('');
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
                await (0, TextPrinter_1.typeText)('Invalid option. Please try again.', TextPrinter_1.textSpeed.uber_speed, true, TextPrinter_1.textColor.green);
            }
        }
    }
    async displayMenu() {
        let index = 1;
        for (const [label, _] of this.options) {
            await (0, TextPrinter_1.typeText)(`\n${index}. ${label}`, TextPrinter_1.textSpeed.uber_speed, true, TextPrinter_1.textColor.green);
            index++;
        }
        await (0, TextPrinter_1.typeText)('\n0. Return\n', TextPrinter_1.textSpeed.uber_speed, true, TextPrinter_1.textColor.green);
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
