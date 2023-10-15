"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleepSync = void 0;
/**
 * Helper function to busy-wait a certain amount of time based on input in ms.
 * @param ms The number of ms to busy-wait.
 */
function sleepSync(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Busy-wait until the desired time has passed
    }
}
exports.sleepSync = sleepSync;
