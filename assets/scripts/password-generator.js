/* Constants */
const MIN_CHARS = 8;
const MAX_CHARS = 128;
const CHAR_OPTIONS = [
    {
        description: "SPECIAL characters",
        charSet: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
        use: false,
    },
    {
        description: "NUMBERS",
        charSet: "0123456789",
        use: false,
    },
    {
        description: "UPPERCASE characters",
        charSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        use: false,
    },
    {
        description: "LOWERCASE characters",
        charSet: "abcdefghijklmnopqrstuvwxyz",
        use: false,
    },
];

/* Globals */
let pwLength = -1;
let pwChars = "";

/* Get Elements from the Page */
let btnGenerateEl = document.getElementById("generate");
let btnCopyEl = document.getElementById("copy");
let txtPasswordEl = document.getElementById("password");

//*********************************
// EVENT HANDLERS
//*********************************

/*
 * Handle the button click Generate event
 *   1. Prompt user for password options if not already selected
 *   2. Generate the Password
 *   3. Update the HTML with result
 */
btnGenerateEl.addEventListener("click", function() {
    if (pwChars !== "" || getOptions()) {
        let password = createPassword(pwChars, pwLength);
        updatePage(password);
    }
});

/*
 * Handle the button click Copy event
 * Copies the generated password to clipboard
 */
btnCopyEl.addEventListener("click", function() {    
    txtPasswordEl.select();
    txtPasswordEl.setSelectionRange(0, 99999);
    document.execCommand("copy");   
});


//*********************************
// SUPPORT FUNCTIONS
//*********************************

/*
 *  Prompt the user for a password length
 *  Validate the input.
 *  Returns true on success, false otherwise 
 * 
 */
function getOptions() {
    pwLength = getLength();
    if (pwLength < 0) {
        alert("INVALID INPUT - Length must be an integer between " + MIN_CHARS + " and " + MAX_CHARS + "!");
        return false;
    }

    pwChars = getChars();
    if (pwChars === "") {
        alert("INVALID INPUT - You must select at least 1 character set to use");
        return false;
    }
    return true;
}

/*
 * Prompt the user for a Password Length and validate the input
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

    for (let index=0; index<CHAR_OPTIONS.length; index++) {
        let option = CHAR_OPTIONS[index];
        if (confirm("Use " + option.description + "?")){
            chars += option.charSet;
            CHAR_OPTIONS[index].use = true;
        }
    }
    return chars;
}

/*
 *  Create a random password string of a specified length from the available characters string
 *  Returns randomly generated string
 */
function createPassword(availableChars, length) {
    let result;
    let badPw;
    do {
        result = "";
        badPw = false;
        for (let index=0; index<length; index++) {
            result += getRandomChar(availableChars);
        }
        for (let index=0; index<CHAR_OPTIONS.length; index++) {
            if (CHAR_OPTIONS[index].use && !isUsingChars(CHAR_OPTIONS[index].charSet, result)) {
                badPw = true;
                break;
            }
        }
    } while(badPw);
    return result;
}

function isUsingChars(charSet, password) {
    for(let index=0; index<charSet.length; index++) {
        if (password.includes(charSet[index])) {
            return true;
        }
    }
    return false;
}

/*
 *  Update Page HTML with newly Generated Password and Enable Copy button
 */
function updatePage(password) {
    document.getElementById("password").textContent = password;
    btnCopyEl.disabled = false;
}

/*
 *  Return a single random character from a string of available characters
 */
function getRandomChar(availableChars) {
    let index = Math.floor(Math.random() * availableChars.length);
    return availableChars[index];
}
