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

//*********************************
// EVENT HANDLERS
//*********************************
/*
 * Handle the button click Generate event
 *   1. Prompt user for password options
 *   2. Generate the Password
 *   3. Update the HTML with result
 */
btnGenerate.addEventListener("click", function() {
    let length = getLength();
    if (length < 0) {
        alert("INVALID INPUT - Length must be an integer between " + MIN_CHARS + " and " + MAX_CHARS + "!");
        return;
    }

    let availableChars = getChars();
    if (availableChars === "") {
        alert("INVALID INPUT - You must select at least 1 character set to use");
        return;
    }

    let password = createPassword(availableChars, length);
    updatePage(password);
});

/*
 * Handle the button click Copy event
 * Copies the generated password to clipboard
 */
btnCopy.addEventListener("click", function() {    
    let pw = document.getElementById("password");
    pw.select();
    pw.setSelectionRange(0, 99999);
    document.execCommand("copy");
});

//*********************************
// SUPPORT FUNCTIONS
//*********************************
/*
 *  Prompt the user for a password length
 *  Validate the input.
 *  Returns length if valid or -1 if input was not valid
 */
function getLength() {
    let lengthInput = prompt("How long should the password be? (" + MIN_CHARS + " - " + MAX_CHARS + " characters)");
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
 * Give the user a series of prompt to determine which characters to use
 * Returns a string of characters that can be used in the password
 */
function getChars() {
    let chars = "";

    if (confirm("Use Special Characters?")) { chars += CHARS_SPECIAL; }
    if (confirm("Use Numbers?")) { chars += CHARS_NUMBER; }
    if (confirm("Use Lowercase Characters?")) { chars += CHARS_LOWER; }
    if (confirm("Use Uppercase Characters?")) { chars += CHARS_UPPER; }
    
    return chars;
}

/*
 *  Create a random password string of a specified length from the available characters string
 *  Returns randomly generated string
 */
function createPassword(availableChars, length) {
    let result = "";
    for (let index=0; index<length; index++) {
        result += getRandomChar(availableChars);
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
 *  Return a single random character from a string of available characters
 */
function getRandomChar(availableChars) {
    let index = Math.floor(Math.random() * availableChars.length);
    return availableChars[index];
}
