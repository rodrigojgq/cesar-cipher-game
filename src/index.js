import cipher from './cipher.js';
const messageContainer = document.getElementById("message");
const offsetContainer = document.getElementById("offset");
const resultMessageContainer = document.getElementById("result-message");
const swapButton = document.getElementById("swap");
const firstTitle = document.getElementById("first-box-title");
const secondTitle = document.getElementById("second-box-title");
const buttonPlay = document.getElementById("button-play");
const buttonCipher = document.getElementById("button-cipher-decipher");
const offsetLabel = document.getElementById("offset-container");
let offset = 0;

localStorage.setItem("category", "decipher");
localStorage.setItem("game", "0");

messageContainer.addEventListener("keyup",changeMessage);
offsetContainer.addEventListener("keyup",changeMessage);
swapButton.addEventListener("click", changeCipherDecipher);
buttonCipher.addEventListener("click", changeCipher);
buttonPlay.addEventListener("click", game);

function changeMessage(){
    let message = messageContainer.value;
    offset = Number(offsetContainer.value);
    message = message.toUpperCase();
    let resultMessage = '';
    let game = localStorage.getItem("game")
    let category = localStorage.getItem("category")
    if (game == 0){
        if( category==='cipher') {
            resultMessage = cipher.encode(offset,message);
        } else if (category==='decipher') {
            resultMessage = cipher.decode(offset,message);
        }
        resultMessageContainer.innerHTML = resultMessage;
    } else {
        resultMessageContainer.innerHTML = "Game";
    }
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

function game() {
    localStorage.setItem("game", "1");
    buttonPlay.className = "button--active";
    buttonCipher.className = "button--unactive";
    offsetLabel.style.display = "none";
}

function changeCipher() {
    let game = localStorage.getItem("game")
    if(game == 1) {
        localStorage.setItem("game", 0);
        buttonPlay.className = "button--unactive";
        buttonCipher.className = "button--active";
        offsetLabel.style.display = "block";
    }
}
