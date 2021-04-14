import cipher from './cipher.js';
import gameWords from './gameWords.js';
const messageContainer = document.getElementById("message");
const offsetContainer = document.getElementById("offset");
const resultMessageContainer = document.getElementById("result-message");
const swapButton = document.getElementById("swap");
const firstTitle = document.getElementById("first-box-title");
const secondTitle = document.getElementById("second-box-title");
const buttonPlay = document.getElementById("button-play");
const buttonCipher = document.getElementById("button-cipher-decipher");
const description = document.getElementById("description");
let checkLogo = document.getElementById("check-answer");
let offset = 0;
let words;
let correctWord;
let gameOffset;
let wordNumber = 0;
let changingWord = true;
let timer = 3;
var counter;

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
    }else{
        checkAnswer();
    }
}

function changeCipherDecipher(){
    let game = localStorage.getItem("game");
    if(localStorage.getItem("category")==='cipher') {
        localStorage.setItem("category", "decipher");
        firstTitle.innerHTML = `Cifrado<span class="wrong-logo" id="check-answer"></span>`;
        secondTitle.innerHTML = "Descifrado";
        buttonCipher.innerHTML = "Descifrar";
        messageContainer.placeholder = "Escribe el mensaje cifrado aqui";
    } else if (localStorage.getItem("category")==='decipher') {
        localStorage.setItem("category", "cipher");
        firstTitle.innerHTML = `Descifrado<span class="wrong-logo" id="check-answer"></span>`;
        secondTitle.innerHTML = "Cifrado";
        buttonCipher.innerHTML = "Cifrar";
        messageContainer.placeholder = "Escribe el mensaje para descifrar aqui";
    }
    checkLogo = document.getElementById("check-answer");
    if(game == 1){
        messageContainer.value = "";
        checkLogo.style.display = "inline-block";
        wordNumber = 0;
        showWords();
    }else{
        changeMessage();

    }
}

function changeCipher() {
    let game = localStorage.getItem("game");
    if(game == 1) {
        localStorage.setItem("game", 0);
        buttonPlay.className = "button--unactive";
        buttonCipher.className = "button--active";
        description.innerHTML = "Ingresa el desplazamiento que tiene el mensaje cifrado.";
        resultMessageContainer.innerHTML = "";
        checkLogo.style.display = "none";
        offsetContainer.value = "";
        messageContainer.value = "";
        wordNumber = 0;
    }else{
        changeCipherDecipher();
    }
}

function showWords() {
    let word = words[wordNumber];
    let category = localStorage.getItem("category");
    gameOffset = Math.floor(Math.random() * 26)+1;
    checkLogo.className = "wrong-logo";
    if(category === 'cipher'){
        correctWord = cipher.encode(gameOffset, word);
        resultMessageContainer.innerHTML = correctWord;
    }else {
        correctWord = word;
        resultMessageContainer.innerHTML = word;
    }
    offsetContainer.value = gameOffset;
    changingWord = true;
    clearInterval(counter);
    timer = 3;
}

function game() {
    localStorage.setItem("game", "1");
    buttonPlay.className = "button--active";
    buttonCipher.className = "button--unactive";
    description.innerHTML = "¡Ahora es tu turno! Descifra o cifra el mensaje.<br/><br/>Recuerda que tu respuesta debe respetar las mayúsculas y minúsculas.";
    checkLogo.style.display = "inline-block";
    messageContainer.value = "";
    words = gameWords.shuffleWords();
    showWords();
}

function checkAnswer() {
    let message = messageContainer.value;
    let category = localStorage.getItem("category");
    let answer;
    if(category === 'cipher'){
        answer = cipher.decode(gameOffset, correctWord);
    }else {
        answer = cipher.encode(gameOffset, correctWord);
    }
    if(answer === message && changingWord){
        checkLogo.className = "correct-logo";
        changingWord = false;
        wordNumber++;
        if(wordNumber > 4){
            wordNumber = 0;
            resultMessageContainer.innerHTML = "¡FELICIDADES, GANASTE!<br/><br/>Para jugar de nuevo puedes hacer click en el boton JUGAR";
        }else{
            setTimeout(showWords,4000);
            counter = setInterval(countdown,1000);
            setTimeout((()=>{messageContainer.value = "";}),4000);
        }
    }
}
function countdown(){
    let word = resultMessageContainer.innerHTML;
    resultMessageContainer.innerHTML = `${word}<br/><br/>          La siguiente palabra aparecera en ${timer}...`;
    timer--;
    if(timer < 0){
        timer = 3;
    }
}
