/* Constants */
const MIN_CHARS = 8;
const MAX_CHARS = 128;
const CHARS_LOWER = "abcdefghijklmnopqrstuvwxyz";
const CHARS_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHARS_NUMBER = "0123456789";
const CHARS_SPECIAL = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // TODO

/* Get Button Elements from the Page */
let btnGenerate = document.getElementById("generate");
let btnCopy = document.getElementById("copy");

/*
 * Handle the button click Generate event
 */
btnGenerate.addEventListener("click", function() {
    askUser();
});

/*
 * Handle the button click Copy event
 */
btnCopy.addEventListener("click", function() {    
    var pw = document.getElementById("password");
    pw.select();
    pw.setSelectionRange(0, 99999);
    document.execCommand("copy");
});

/*
 * Prompt the User for Password options, Generate a password, and update Page
 */
function askUser() {
    let lengthInput = prompt("How long should the password be? (8-128 characters)");
    let length = validateLength(lengthInput);
    if (length < 0) {
        alert("Length must be a valid integer between 8-128!");
        return;
    }

    let base = "";

    if (confirm("Use Special Characters?")) { base += CHARS_SPECIAL; }
    if (confirm("Use Numbers?")) { base += CHARS_NUMBER; }
    if (confirm("Use Lowercase Characters?")) { base += CHARS_LOWER; }
    if (confirm("Use Uppercase Characters?")) { base += CHARS_UPPER; }

    if (base === "") {
        alert("You must select some type of characters to use");
        return;
    }

    let password = generatePassword(base, length);
    updatePage(password);
}

/*
 *  Validate the Input length.
 *  Returns length if valid or -1 if input was not valid
 */
function validateLength(lengthInput) {
    let length = parseFloat(lengthInput);

    if (!Number.isInteger(length)) {
        return -1;
    } else if (length < MIN_CHARS) {
        return -1;
    } else if (length > MAX_CHARS) {
        return -1;
    }
    return length;
}

/*
 *  Generate a password of a specified length from the useable characters string
 */
function generatePassword(useableChars, length) {
    let result = "";
    for (let index=0; index<length; index++) {
        result += getRandomChar(useableChars);
    }
    return result;
}

/*
 *  Update Page HTML with newly Generated Password and Enable Copy button
 */
function updatePage(password) {
    document.getElementById("password").textContent = password;
    document.getElementById("copy").disabled = false;
}

/*
 *  Return a random character from a string
 */
function getRandomChar(str) {
    let index = Math.floor(Math.random() * str.length);
    return str[index];
}
