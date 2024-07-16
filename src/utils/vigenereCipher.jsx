export const generateTAN = (key, message) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key = key.toUpperCase();
    message = message.toUpperCase();
    
    let tan = '';
    for (let i = 0; i < message.length; i++) {
        const messageChar = message[i];
        const keyChar = key[i % key.length];
        const encryptedChar = alphabet[(alphabet.indexOf(messageChar) + alphabet.indexOf(keyChar)) % alphabet.length];
        tan += encryptedChar;
    }
    
    return tan;
};
