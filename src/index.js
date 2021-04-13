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
const offsetLabel = document.getElementById("offset-container");
const description = document.getElementById("description");
let offset = 0;
let words;
let correctWord;
let gameOffset;
let wordNumber = 0;

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
        firstTitle.innerHTML = "Cifrado";
        secondTitle.innerHTML = "Descifrado";
        buttonCipher.innerHTML = "Descifrar";
        message.placeholder = "Escribe el mensaje cifrado aqui";
    } else if (localStorage.getItem("category")==='decipher') {
        localStorage.setItem("category", "cipher");
        secondTitle.innerHTML = "Cifrado";
        firstTitle.innerHTML = "Descifrado";
        buttonCipher.innerHTML = "Cifrar";
        message.placeholder = "Escribe el mensaje para descifrar aqui";
    }
    if(game == 1){
        messageContainer.value = "";
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
        offsetLabel.style.display = "block";
        description.innerHTML = "Ingresa el desplazamiento que tiene el mensaje cifrado.";
        resultMessageContainer.innerHTML = "";
        offsetContainer.value = "";
    }else{
        changeCipherDecipher();
    }
}

function showWords() {
    let word = words[wordNumber];
    let category = localStorage.getItem("category");
    gameOffset = Math.floor(Math.random() * 26)+1;
    if(category === 'cipher'){
        correctWord = cipher.encode(gameOffset, word);
        resultMessageContainer.innerHTML = correctWord;
    }else {
        correctWord = word;
        resultMessageContainer.innerHTML = word;
    }
    offsetContainer.value = gameOffset;
    wordNumber++;
    if(wordNumber > 5){
        wordNumber = 0;
        resultMessageContainer.innerHTML = "¡FELICIDADES, GANASTE!<br/><br/>Para jugar de nuevo puedes hacer click en el boton JUGAR";
    }
}

function game() {
    localStorage.setItem("game", "1");
    buttonPlay.className = "button--active";
    buttonCipher.className = "button--unactive";
    description.innerHTML = "¡Ahora es tu turno! Descifra o cifra el mensaje.<br/><br/>Recuerda que tu respuesta deben respetar las mayúsculas y minúsculas.";
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
    if(answer === message){

        showWords();
    }else{
        console.log(answer);
    }
}
