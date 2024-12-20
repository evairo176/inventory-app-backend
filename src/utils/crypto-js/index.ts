const CryptoJS = require("crypto-js");

/**
 * Function to encrypt text
 * @param {string} text - The plain text to encrypt
 * @param {string} secretKey - The secret key for encryption
 * @returns {string} - The encrypted text
 */
export function encrypt(text: string, secretKey: string) {
  if (!text || !secretKey) {
    throw new Error("Text and secret key are required for encryption.");
  }
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

/**
 * Function to decrypt text
 * @param {string} encryptedText - The encrypted text to decrypt
 * @param {string} secretKey - The secret key used for decryption
 * @returns {string} - The decrypted plain text
 */
export function decrypt(encryptedText: string, secretKey: string) {
  if (!encryptedText || !secretKey) {
    throw new Error(
      "Encrypted text and secret key are required for decryption."
    );
  }

  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

/**
 * Decrypts AES-128-CBC encrypted text.
 *
 * @param {string} encryptedText - The Base64 encoded encrypted text.
 * @param {string} secretKey - The secret key used for encryption (must be 16 bytes for AES-128).
 * @param {string} ivHex - The initialization vector used during encryption (in hexadecimal format).
 * @returns {string} - The decrypted plaintext.
 */
export function decryptAES128CBC(
  encryptedText: string,
  secretKey: string,
  ivHex = null
) {
  // Decrypt and return the plaintext as a string
  let bytes = CryptoJS.AES.decrypt(encryptedText, secretKey, {
    iv: null,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = CryptoJS.enc.Utf8.stringify(bytes);
  return decryptedStr.toString();
}
