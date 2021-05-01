function editNav() {
    let x = document.getElementById("myTopnav");
    if (x.className === "header-nav") {
        x.className += " responsive";
    } else {
        x.className = "header-nav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalClose = document.getElementById("closeModal");
const checkCondition = document.getElementById("checkbox1");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalLabels = document.querySelectorAll("label");
const formData = document.querySelectorAll(".formData");
const textLabel = document.querySelector(".text-label");
const btnPostData = document.getElementById("btnPostData");
const formTag = document.querySelector("form");
const birthdate = document.getElementById("birthdate");

const btnPostClose = document.createElement("input");
btnPostClose.classList.add("btn-submit", "button");
btnPostClose.type = "submit";
btnPostClose.value = "Close";

const textValidation = document.createElement("h3");
textValidation.style.textAlign = "center";
textValidation.innerHTML = "Merci,<br> Votre réservation a bien été enregistrée"

let resultFinal = [];

let resultCitys;
let resultCitysTrue;

let resultEmails;
let resultEmailsTrue;

let resultFirsts;
let resultFirstsTrue;

let resultLasts;
let resultLastsTrue;

let resultBirthdates;
let resultBirthdatesTrue;

let resultGames;
let resultGamesTrue;

let resultConditions;


// Pattern des différents types
let textFormat = /^[a-zA-Z\-\^\']{2,30}$/;
let emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
// let dateFormat = /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
let dateFormat = /((?:19|20)[0-9][0-9])-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
// let dateFormat = /^((19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
let numberFormat = /^[0-9]{1,3}$/;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
    if (checkCondition.hasAttribute("checked")) {
        return resultConditions = true;
    }
}

// //close modal form
const closeModal = (closed) => {
    // if (closed === modalClose || btnPostData.value === "Close") {
    if (closed === modalClose) {
        closed.addEventListener("click", function closeModal() {
            console.log("modal fermé");
            modalbg.style.display = "none";
        })
    }
}
closeModal(modalClose);

// récupérer les données des input modal event
formData.forEach((input) => input.addEventListener('change', formsData));

// get data form
function formsData(event) {

    // Validation des patterns
    const validatePattern = (type, pattern) => {
        if (event.target.type === type && event.target.value.match(pattern)) {
            event.target.style.border = "4px solid green";
        } else if (event.target.type === type && !event.target.value.match(pattern)) {
            event.target.style.border = "4px solid red";
        }
    }
    validatePattern("date", dateFormat);
    validatePattern("email", emailFormat);
    validatePattern("number", numberFormat);
    validatePattern("text", textFormat);

    for (let modalLabel of modalLabels) {
        if (event.target.value === modalLabel.innerText) {
            resultCitys = textLabel.innerText + " : " + event.target.value;
            console.log(resultCitys);
            return resultCitysTrue = true;

        } else if (event.target.id === modalLabel.getAttribute("for")) {
            if (event.target.id === "birthdate" && event.target.value.match(dateFormat)) {
                resultBirthdates = modalLabel.innerText + " : " + event.target.value;
                console.log(resultBirthdates);
                return resultBirthdatesTrue = true;
            }
            if (event.target.id === "email" && event.target.value.match(emailFormat)) {
                resultEmails = modalLabel.innerText + " : " + event.target.value;
                console.log(resultEmails);
                return resultEmailsTrue = true;

            }
            if (event.target.id === "quantity") {
                if (event.target.value.match(numberFormat)) {
                    resultGames = modalLabel.innerText + " : " + event.target.value;
                    console.log(resultGames);
                    return resultGamesTrue = true;
                } else {
                    return resultGamesTrue = false;
                }
            }

            if (event.target.id === "first" && event.target.value.match(textFormat)) {
                resultFirsts = modalLabel.innerText + " : " + event.target.value;
                console.log(resultFirsts);
                return resultFirstsTrue = true;
            }
            if (event.target.id === "last" && event.target.value.match(textFormat)) {
                resultLasts = modalLabel.innerText + " : " + event.target.value;
                console.log(resultLasts);
                return resultLastsTrue = true;

            }
            if (event.target.id === "checkbox1") {
                if (event.target.checked) {
                    event.target.value = "ok";
                    console.log(event.target.value);
                    return resultConditions = true;
                } else {
                    event.target.value = "off";
                    console.log(event.target.value);
                    return resultConditions = false;
                }
            }
        }

    }


}

btnPostData.addEventListener("click", function validateData(event) {
    event.preventDefault();

    if (resultFirstsTrue === true && resultLastsTrue === true && resultEmailsTrue === true && resultBirthdatesTrue === true
        && resultCitysTrue === true && resultGamesTrue === true && resultConditions === true) {
        resultFinal.push(resultFirsts, resultLasts, resultEmails, resultBirthdates, resultCitys, resultGames);
        console.log(resultFinal);
        if (textLabel.innerHTML === "Quelles villes ?") {
            textLabel.classList.add("formOpacity");
        }
        for (let addOpacity in formData) {
            if (formData.hasOwnProperty(addOpacity)) {
                formData[addOpacity].classList.add("formOpacity");
            }
        }
        btnPostData.style.display = "none";
        formTag.appendChild(btnPostClose);
        formData[3].after(textValidation)
    }
});

btnPostClose.addEventListener("click", function closeAfterValidation(event) {
    console.log("modal fermé via btn");
    if (textLabel.innerHTML === "Quelles villes ?") {
        textLabel.classList.remove("formOpacity");
    }
    for (let removeOpacity in formData) {
        if (formData.hasOwnProperty(removeOpacity)) {
            formData[removeOpacity].classList.remove("formOpacity");
        }
    }
    modalbg.style.display = "none";
    btnPostData.style.display = "block";
    formTag.removeChild(btnPostClose);
    textValidation.textContent = "";
    resultFinal = [];
    console.log(resultFinal);
    return location.reload();

})



