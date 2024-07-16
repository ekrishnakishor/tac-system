// src/cipher.js

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const vigenereEncrypt = (text, key) => {
  let encryptedText = "";
  for (let i = 0; i < text.length; i++) {
    const textChar = text.charAt(i).toUpperCase();
    const keyChar = key.charAt(i % key.length).toUpperCase();
    const newIndex = (alphabet.indexOf(textChar) + alphabet.indexOf(keyChar)) % alphabet.length;
    encryptedText += alphabet.charAt(newIndex);
  }
  return encryptedText;
};
