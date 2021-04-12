import cipher from './cipher.js';
const messageContainer = document.getElementById("message");
const offsetContainer = document.getElementById("offset");
const resultMessageContainer = document.getElementById("result-message");
const swapButton = document.getElementById("swap");
const firstTitle = document.getElementById("first-box-title");
const secondTitle = document.getElementById("second-box-title");
const buttonPlay = document.getElementById("button-play");
const buttonCipher = document.getElementById("button-cipher-decipher");
let offset = 0;

localStorage.setItem("category", "decipher");

messageContainer.addEventListener("keyup",changeMessage);
offsetContainer.addEventListener("keyup",changeMessage);
swapButton.addEventListener("click", changeCipherDecipher);

function changeMessage(){
    let message = messageContainer.value;
    offset = Number(offsetContainer.value);
    message = message.toUpperCase();
    let resultMessage = '';
    if(localStorage.getItem("category")==='cipher') {
        resultMessage = cipher.encode(offset,message);
    } else if (localStorage.getItem("category")==='decipher') {
        resultMessage = cipher.decode(offset,message);
    }
    resultMessageContainer.innerHTML = resultMessage;
}
function changeCipherDecipher(){
    if(localStorage.getItem("category")==='cipher') {
        localStorage.setItem("category", "decipher");
        firstTitle.innerHTML = "Cifrado";
        secondTitle.innerHTML = "Descifrado";
        buttonCipher.innerHTML = "Descifrar"
    } else if (localStorage.getItem("category")==='decipher') {
        localStorage.setItem("category", "cipher");
        secondTitle.innerHTML = "Cifrado";
        firstTitle.innerHTML = "Descifrado";
        buttonCipher.innerHTML = "Cifrar"
    }
    changeMessage();
}
