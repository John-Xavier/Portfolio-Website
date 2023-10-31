var nameField = document.getElementById("fname");
var emailField = document.getElementById("email");
var subjectField = document.getElementById("subject");
var contentTextArea = document.getElementById("textarea");
var submitButton = document.getElementById("button1");
var charCountLabel = document.getElementById("char-count");

submitButton.addEventListener("click", submitButtonClicked);
contentTextArea.addEventListener("input", event => {
    const target = event.currentTarget;
    const maxLength = target.getAttribute("maxlength");
    const currentLength = target.value.length;

    if (currentLength >= maxLength) {
        return console.log("You have reached the maximum number of characters.");
    }
    charCountLabel.innerHTML = maxLength - currentLength;
    console.log(`${maxLength - currentLength} chars left`);
});



function submitButtonClicked() {
    validateForm();

}

function validateForm() {
    // Validate all fields show alert if neccessary
    if (nameField.value == "") {
        alert("Please enter your name");
        return;
    } else if (emailField.value == "") {
        alert("Please enter your email"); return;
    } else if (subjectField.value == "") {
        alert("Please enter a subject"); return;
    } else if (contentTextArea.value == "") {
        alert("Please enter your message"); return;
    } else {
        if (validateEmail(emailField) == false) {
            alert("Please enter a valid email address");
            return;
        }
    }

}
function validateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.value.match(validRegex)) {
        //document.form1.text1.focus();

        return true;

    } else {
        //document.form1.text1.focus();

        return false;

    }

}