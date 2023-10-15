/**
 * Helper function to busy-wait a certain amount of time based on input in ms.
 * @param ms The number of ms to busy-wait.
 */
export function sleepSync(ms: number): void {
    const start = Date.now();
    while (Date.now() - start < ms) {
        // Busy-wait until the desired time has passed
    }
}