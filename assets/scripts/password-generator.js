function askUser() {
    var length = parseInt(prompt("How long should the password be? (8-128 characters)"));
    if (!validLength()) {
        alert("Length must be a valid integer between 8-128!");
        return;
    }
}

function validLength(length) {
    const min_chars = 8;
    const max_chars = 128;
    if (!Number.IsInteger(length)) {
        return false;
    } else if (length < min_chars) {
        return false;
    } else if (length > max_chars) {
        return false;
    }
    return true;
}



askUser();