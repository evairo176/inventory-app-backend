"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptAES128CBC = exports.decrypt = exports.encrypt = void 0;
const CryptoJS = require("crypto-js");
/**
 * Function to encrypt text
 * @param {string} text - The plain text to encrypt
 * @param {string} secretKey - The secret key for encryption
 * @returns {string} - The encrypted text
 */
function encrypt(text, secretKey) {
    if (!text || !secretKey) {
        throw new Error("Text and secret key are required for encryption.");
    }
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}
exports.encrypt = encrypt;
/**
 * Function to decrypt text
 * @param {string} encryptedText - The encrypted text to decrypt
 * @param {string} secretKey - The secret key used for decryption
 * @returns {string} - The decrypted plain text
 */
function decrypt(encryptedText, secretKey) {
    if (!encryptedText || !secretKey) {
        throw new Error("Encrypted text and secret key are required for decryption.");
    }
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
exports.decrypt = decrypt;
/**
 * Decrypts AES-128-CBC encrypted text.
 *
 * @param {string} encryptedText - The Base64 encoded encrypted text.
 * @param {string} secretKey - The secret key used for encryption (must be 16 bytes for AES-128).
 * @param {string} ivHex - The initialization vector used during encryption (in hexadecimal format).
 * @returns {string} - The decrypted plaintext.
 */
function decryptAES128CBC(encryptedText, secretKey, ivHex = null) {
    // Decrypt and return the plaintext as a string
    let bytes = CryptoJS.AES.decrypt(encryptedText, secretKey, {
        iv: null,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedStr = CryptoJS.enc.Utf8.stringify(bytes);
    return decryptedStr.toString();
}
exports.decryptAES128CBC = decryptAES128CBC;
