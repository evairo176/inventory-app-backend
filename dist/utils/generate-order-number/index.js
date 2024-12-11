"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderNumber = void 0;
function generateOrderNumber() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Capital letters and numbers
    let orderNumber = "";
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length); // Random index from the character set
        orderNumber += characters[randomIndex];
    }
    return orderNumber;
}
exports.generateOrderNumber = generateOrderNumber;
