"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearScreen = void 0;
/**
 *
 */
function clearScreen() {
    process.stdout.write('\x1b[2J\x1b[0f');
}
exports.clearScreen = clearScreen;
