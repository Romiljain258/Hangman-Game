const wordE1=document.getElementById("word");
const wrongLettersE1=document.getElementById("wrong-letters");
const playAgainBtn=document.getElementById("play-button");
const popup=document.getElementById("popup-container");
const notification=document.getElementById("notification-container");
const finalMessage=document.getElementById("final-message");
const finalMessageReveal=document.getElementById("final-message-reveal-word");

//this is same as document.getElementsByClassName("figure-part");
const figureParts=document.querySelectorAll(".figure-part");

const words=["krish","kesari","boss","joker","don"];//array of words

//here we getting random array of element
let selectedWord=words[Math.floor(Math.random()*words.length)];

let playable=true;

const correctLetters=[]; // this is the array of letters,of current word.
const wrongLetters=[];   // this is the array of letters,those who we wrong letter pressed.

//show hidden words(template string)
function displayWord(){
    console.log(selectedWord);
    wordE1.innerHTML=`
    ${selectedWord.split('').map(letter=>{
        return `<span class="letter">
          ${correctLetters.includes(letter)?letter:""}
          </span>`
    }).join('')}
    `;
  
    const innerWord = wordE1.innerText.replace(/[ \n]/g,'');//here we are replacing new line with nothing,it will print in single line.
    if(innerWord===selectedWord){
        finalMessage.innerText="congratulation! you won😊";
        popup.style.display="flex";
        playable=false;
    }
}
function showNotification()
{
   notification.classList.add("show");
   popup.style.display="flex";
   setTimeout(function(){
       notification.classList.remove("show");
   },2000);
}
function updateWrongLettersEl()
{
    wrongLettersE1.innerHTML=`
    ${wrongLetters.length>0?`<p>Wrong Letters</p>`:''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `
    figureParts.forEach((part,index)=>{
        const errors=wrongLetters.length;
        if(index<errors){
            part.style.display="block";//show body part
        }
        else{
            part.style.display="none";
        }
    })
    if(wrongLetters.length===figureParts.length){
        finalMessage.innerText="you loss";
        popup.style.display="flex";
        playable=false;
    }
}

//add evenet listner by keyword,when some one press key.
window.addEventListener("keydown",e=>{
   if(playable){
    if(e.keyCode>=65 && e.keyCode<=90){ //range of character //keycode giving value of keys.
        //here we are converting capital letter to small as well as small to small.
        const letter=e.key.toLowerCase(); 
        if(selectedWord.includes(letter))
        {//i'm checking there if this letter is present in my word or not.               
            if(!correctLetters.includes(letter)){
                    correctLetters.push(letter);
                    displayWord(letter);
               }
        //if that letter already pressed.
        else{
            showNotification();
        }
    }
    else{//if letter is not in string.
        if(!wrongLetters.includes(letter)){
            wrongLetters.push(letter);
            updateWrongLettersEl();
        }
        else{
            //letter is not present & already pressed.
            showNotification();
        }
    }
    }
   }
});
//restart game
playAgainBtn.addEventListener("click",function(){
    playable=true;
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord=words[Math.floor(Math.random()*words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display="none";
})
displayWord();
