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
const modalBtn = document.querySelectorAll(".modal-btn");
const modalLabels = document.querySelectorAll("label");
const formData = document.querySelectorAll(".formData");
const inputRequireds = document.querySelectorAll("input[required]");
const textLabel = document.querySelector(".text-label");
const btnPostData = document.getElementById("btnPostData");
const birthdate = document.getElementById("birthdate");
// btnPostData.disabled = true;
let resultBirthday = [];
let resultCitys;
let resultEmails;
let resultFirsts;
let resultLasts;
let resultBirthdates;
let resultGames;
let resultData = [];
let infoRed = document.createElement('p');
let infoEmpty = document.createElement('p');



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
}

// //close modal form
const closeModal = (closed) => {
    closed.addEventListener("click", function closeModal() {
        console.log("modal fermé");
        modalbg.style.display = "none";
    })
}
closeModal(modalClose);

// récupérer les données des input modal event
formData.forEach((input) => input.addEventListener('change', formsData));

// get data form
function formsData(event) {

    // Validation des patterns
    const validatePattern = (type, pattern) => {
        if (event.target.type === type && event.target.value.match(pattern)) {
            // console.log("c'est vert");
            // btnPostData.disabled = false;
            return event.target.style.border = "4px solid green";
        } else if (event.target.type === type && !event.target.value.match(pattern)) {
            return event.target.style.border = "4px solid red";
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

        } else if (event.target.id === modalLabel.getAttribute("for")) {
            if (event.target.id === "birthdate" && event.target.value.match(dateFormat)) {
                resultBirthdates = modalLabel.innerText + " : " + event.target.value;
                console.log(resultBirthdates);
            }
            if (event.target.id === "email" && event.target.value.match(emailFormat)) {
                resultEmails = modalLabel.innerText + " : " + event.target.value;
                console.log(resultEmails);

            }
            if (event.target.id === "quantity" && event.target.value.match(numberFormat)) {
                resultGames = modalLabel.innerText + " : " + event.target.value;
                console.log(resultGames);

            }
            if (event.target.id === "first" && event.target.value.match(textFormat)) {
                resultFirsts = modalLabel.innerText + " : " + event.target.value;
                console.log(resultFirsts);

            }
            if (event.target.id === "last" && event.target.value.match(textFormat)) {
                resultLasts = modalLabel.innerText + " : " + event.target.value;
                console.log(resultLasts);

            }
        }

    }


}

// Envoyer les données et acccusé de réception

// function validate(event) {
btnPostData.addEventListener("click", function validateData(event) {
        event.preventDefault();
for (let inputRequired of inputRequireds){

    if (inputRequired.style.border === "4px solid red"){
        console.log("il y a du rouge");
        infoRed.textContent ="Erreur dans la saisie";
        inputRequired.after(infoRed);
        // alert("");
    } else if (inputRequired.style.border === "4px solid green" && inputRequired.style.border === "4px solid red"){
        console.log("il y a un problème");
        alert("Une ou plusieurs saisies ne sont pas bonne");
    } else if (inputRequired.style.border === ""){
        console.log("il y a un second problème");
        infoEmpty.textContent ="Le champs est vide";
        inputRequired.after(infoEmpty);
    } else if (inputRequired.style.border === "4px solid green"){
        console.log("c'est validé");
    }
    // console.log(inputRequired.style.border);
}
})
