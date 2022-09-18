
/*----------------------------------------------------------------------Variables*/
let keyboard = document.querySelector('.keyboard');

let result = document.querySelector('.result');
let mssg = document.querySelector('.result-mssg');
let resAnswer = document.querySelector('.result-answer');

let resultAlert = document.querySelector('.popup-alert');
let mssgAlert = document.querySelector('.alert-mssg');

let maxWrongNum = document.querySelector('.max-wrong-num');

let addWord = document.querySelector('#add-word');
let addHint = document.querySelector('#add-hint');
let hintTag = document.getElementById("HintPopup");

let optsDropdown = document.querySelectorAll('#DropdownOptions .option');

let wordsToPlay = ["javascript",
                    "html",
                    "css",
                    "code",
                    "hello world",
                    "hola mundo",
                    "alura",
                    "oracle",
                    "programming"];

let answer = '';
let maxWrong = 7;
let mistake = 0;
let guessed = [];
let wordStatus = null;

let rgx = /^[a-zA-Z\ ]+$/;

//---------------------------------------------------------------------------------

function startGame() {
    document.getElementById('btn-start-game').style.display = 'none';
    document.querySelector('.keyboard').style.display = 'flex'
    document.querySelector('.word-guessing').style.display = 'flex';
    document.querySelector('.body-drawing').style.display = 'flex';
}

//--------------------------------------------------------------------------------- Internal Array <wordsToPlay>

/*const btnAddWord = () => {
    let newWord = addWord.value.toLowerCase();
        
    if (newWord.length === 0) {
        alert('El campo no puede estar vacío');
        addWord.value = "";
    }
    else if (newWord.length <= 2) {
        alert("La palabra es muy corta");
        addWord.value = "";
    }
    else if (newWord.length >= 15) {
        alert("La palabra es muy extensa");
        addWord.value = "";
    }
    else if (newWord.startsWith(' ') || newWord.endsWith(' ')){
        alert('La palabra NO puede Iniciar/Terminar con espaciado');
        addWord.value = "";
    }
    else if (wordsToPlay.includes(newWord)){
        alert('La palabra ya existe. Intente con otra palabra');
        addWord.value = "";
    }
    else if (!rgx.test(newWord)) {
        alert('Sólo se permite texto\nPor favor NO intente: \nCaracteres especiales - Acentos - Números');
        addWord.value = "";
    }*/
    /*else if (newWord.includes(' ')){
        newWord = newWord.replace(" ", "-");
        wordsToPlay.unshift(newWord);
        alert("Palabra agregada con éxito");
        addWord.value = "";
    }*/
    /*else {
        wordsToPlay.unshift(newWord);
        alert('< ' + newWord + ' >' + " Agregada con éxito");
        addWord.value = "";
    }
    console.log(wordsToPlay);
}*/

//--------------------------------------------------------------------------------- External Array <words.js>

const btnAddWord = () => {
    let newWord = addWord.value.toLowerCase();
    let newHint = addHint.value;
    
    if (newWord.length === 0 || newHint.length === 0) {
        resultAlert.style.display = 'block';
        mssgAlert.innerHTML = 'Los campos NO pueden estar vacíos.';
        /*mssgAlert.style.color = 'greenyellow';*/
        
        addWord.value = "";
        addHint.value = "";
    }
    else if (newWord.length <= 2 || newHint.length < 5) {
        resultAlert.style.display = 'block';
        mssgAlert.innerHTML = 'La palabra o la pista son muy cortas.' + '<br/><br/>' + 'Palabra: Min = 3 letras' + '<br/>' + 'Pista: Min = 5 caracteres';
        
        addWord.value = "";
        addHint.value = "";
    }
    else if (newWord.length >= 16 || newHint.length >= 51) {
        resultAlert.style.display = 'block';
        mssgAlert.innerHTML = 'La palabra o la pista son muy extensas.' + '<br/><br/>' + 'Palabra: Max = 15 letras' + '<br/>' + 'Pista: Max = 50 caracteres';

        addWord.value = "";
        addHint.value = "";
    }
    else if (newWord.startsWith(' ') || newWord.endsWith(' ') || newHint.startsWith(' ') || newHint.endsWith(' ')){
        resultAlert.style.display = 'block';
        mssgAlert.innerHTML = 'Los campos NO pueden Iniciar/Terminar con espacios.';

        addWord.value = "";
        addHint.value = "";
    }
    else if (wordList.some(wl => wl.word === newWord)){
        resultAlert.style.display = 'block';
        mssgAlert.innerHTML = '[' + newWord + ']' + ' Ya existe.' + '<br/><br/>' + 'Intente con otra palabra';

        addWord.value = "";
        addHint.value = "";
    }
    else if (!rgx.test(newWord)) {
        resultAlert.style.display = 'block';
        mssgAlert.innerHTML = 'La palabra sólo permite texto' + '<br/><br/>' + 'NO intente:' + '<br/>' + 'Acentos - Números' + '<br/>' + 'Caracteres especiales';

        addWord.value = "";
        addHint.value = "";
    }
    else {
        wordList.unshift({word: newWord, hint: newHint});
        resultAlert.style.display = 'block';
        mssgAlert.innerHTML = '{' + newWord + '}' + '<br/><br/>' + ' Agregada con éxito.';

        addWord.value = "";
        addHint.value = "";
    }
    
    //console.log(wordList);
}

//---------------------------------------------------------------------------------

let btnAlert = () => {
    resultAlert.style.display = 'none';
    /*btnResetAlt();
    opt4();*/
}

//---------------------------------------------------------------------------------

// When the user clicks on <hint>, it opens the popup
function btnHint () {
    var popupHint = document.getElementById("HintPopup");
    popupHint.classList.toggle("showHint");
}

//----------------------------------------------------------------------------------

// Internal Array <wordsToPlay>
/*let randWord = () => {
    answer = wordsToPlay[Math.floor(Math.random()*wordsToPlay.length)]
    console.log(answer)
}*/

// External Array <words.js>
function randWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    answer = ranItem.word;
    hintTag.innerText = ranItem.hint;

    //console.log(answer)
}

//---------------------------------------------------------------------------------

const opt1 = () => {
    let _opt1 = wordList.filter(function(num) {
        return num.word.length >= 3 && num.word.length <= 5;
      });
    let _opt1_ = _opt1[Math.floor(Math.random() * _opt1.length)];
    answer = _opt1_.word;
    hintTag.innerText = _opt1_.hint;

    btnResetAlt();
    /*
    console.log(_opt1_)
    console.log(_opt1)
    console.log(answer)
    */
}

const opt2 = () => {
    let _opt2 = wordList.filter(function(num) {
        return num.word.length >= 6 && num.word.length <= 10;
      });
    let _opt2_ = _opt2[Math.floor(Math.random() * _opt2.length)];
    answer = _opt2_.word;
    hintTag.innerText = _opt2_.hint;

    btnResetAlt();
    /*
    console.log(_opt2_)
    console.log(_opt2)
    console.log(answer)
    */
}

const opt3 = () => {
    let _opt3 = wordList.filter(function(num) {
        return num.word.length >= 11 && num.word.length <= 15;
      });
    let _opt3_ = _opt3[Math.floor(Math.random() * _opt3.length)];
    answer = _opt3_.word;
    hintTag.innerText = _opt3_.hint;

    btnResetAlt();
    /*
    console.log(_opt3_)
    console.log(_opt3)
    console.log(answer)
    */
}

const opt4 = () => {
    randWord();
    btnResetAlt();

}

//---------------------------------------------------------------------------------

function createKeyboard(){
    //let keyboardBtns = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
    let keyboardBtns = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
            <button
                class="keyboard-btns"
                id='` + letter + `'
                onclick="guess('` + letter + `')"
            >
                ` + letter + `
            </button>
        `).join('');
    keyboard.innerHTML = keyboardBtns;
}

//---------------------------------------------------------------------------------

let guess = (choosenLetter)=>{
    guessed.indexOf(choosenLetter) === -1 ? guessed.push(choosenLetter) : null;
    document.getElementById(choosenLetter).setAttribute('disabled', true);
    /*document.getElementById(choosenLetter).style.backgroundColor = '#D2F3C3';
    document.getElementById(choosenLetter).style.color = 'black';*/

    if (answer.indexOf(choosenLetter) >= 0){
        document.getElementById(choosenLetter).style.backgroundColor = '#6A726E';
        document.getElementById(choosenLetter).style.color = 'white';
        guessWord();
        gameWon();
    }
    else if (answer.indexOf(choosenLetter) === -1){
        document.getElementById(choosenLetter).style.backgroundColor = '#D5E5DC';
        document.getElementById(choosenLetter).style.color = 'black';
        mistake++;
        mistakeUpdate();
        hangmanUpdate();
        gameLost();
    }
}

//---------------------------------------------------------------------------------

let gameWon = () =>{
    if(wordStatus === answer){
        result.style.display = 'block';
        mssg.innerHTML = 'Ganaste';
        mssg.style.color = 'green';
        resAnswer.innerHTML = answer;
    }
}

//---------------------------------------------------------------------------------

let gameLost = () =>{
    if(mistake === maxWrong){
        result.style.display = 'block';
        mssg.innerHTML = 'Perdiste';
        mssg.style.color = '#FF5B5B';
        resAnswer.innerHTML = answer;
    }
}

//---------------------------------------------------------------------------------

let guessWord = () => {
    wordStatus = answer.split('').map(letter => (letter === ' ' ? ' ' : guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    document.querySelector('.word-spotlight').innerHTML = wordStatus;
}

//---------------------------------------------------------------------------------

let hangmanUpdate = () => {
    switch(mistake){
        case 1:
            document.querySelector('.head').style.display = 'block';
            break;
        case 2:
            document.querySelector('.upper-body').style.display = 'block';
            break;
        case 3:
            document.querySelector('.arm-one').style.display = 'block';
            break;
        case 4:
            document.querySelector('.arm-two').style.display = 'block';
            break;
        case 5:
            document.querySelector('.leg-one').style.display = 'block';
            break;
        case 6:
            document.querySelector('.leg-two').style.display = 'block';
            break;
    }
}

//---------------------------------------------------------------------------------

/*When the user clicks on the button, toggle between hiding and showing the dropdown content*/
function chooseLettersQ() {
    document.getElementById("DropdownLetters").classList.toggle("show");
}
 
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('#resetBtn')) {
      var dropdowns = document.getElementsByClassName("menu-q-letter");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
   }
}

//---------------------------------------------------------------------------------

const btnResetAlt = () => {
    mistake = 0;
    guessed = [];
    guessWord();
    mistakeUpdate();
    hangmanUpdate();
    createKeyboard();
    document.querySelector('.head').style.display = 'none';
    document.querySelector('.upper-body').style.display = 'none';
    document.querySelector('.arm-one').style.display = 'none';
    document.querySelector('.arm-two').style.display = 'none';
    document.querySelector('.leg-one').style.display = 'none';
    document.querySelector('.leg-two').style.display = 'none';
}

const btnReset = () => {
    chooseLettersQ();
}

//---------------------------------------------------------------------------------

let btnStartOver = () => {
    result.style.display = 'none';
    btnResetAlt();
    opt4();
}

//---------------------------------------------------------------------------------

let mistakeUpdate = () => {
    document.querySelector('.mistake').innerHTML=mistake;
}

//---------------------------------------------------------------------------------

maxWrongNum.innerHTML = maxWrong;

randWord();
createKeyboard();
guessWord();