const billAmount = document.querySelector("#billAmt");
const cashGiven = document.querySelector("#cashGiven");
const errorDiv = document.querySelector(".errorMsg");
const cashGivenComponent = document.querySelector(".cashGivenInput");
const changeReturnComponent = document.querySelector(".changeReturn");
const output = document.querySelector("#output");
const nextBtn = document.querySelector("#nextBtn");
const checkBtn = document.querySelector("#checkBtn");
const numberofnotes = document.querySelectorAll(".noofnotes");
let audioTurn = new Audio("ting.mp3");

const arrayNoteAmt = [2000, 500, 100, 20, 10, 5, 1];

output.style.display = "none";
cashGivenComponent.style.display = "none";

//check if bill amount is valid
nextBtn.addEventListener('click', ()=>{
    hideError();
    if(Number(billAmount.value)>0){

        nextBtn.style.display = "none";
        cashGivenComponent.style.display = "block";
    }
    else{
        showError("Enter valid bill amount");
    }
} )

// processing inputs to get result
checkBtn.addEventListener('click', ()=>{
    clearnumberofnotes();
    hideError();
    audioTurn.play();

    let billAmountValue= Number(billAmount.value);
    let cashGivenValue= Number(cashGiven.value);

    if(billAmountValue>0 && cashGivenValue>0){

        if(billAmountValue > cashGivenValue){
            showError("Cash given is less than bill amount, please enter valid amount");
            return;
        }
        //if input valid 
        calculateNotes(billAmountValue, cashGivenValue);
    } else{
        showError("Enter valid bill amount and cash given to continue");
        }
})


function calculateNotes(bill, cash){
    let returnAmt = cash-bill;
    
    if(returnAmt<1){
        showError("No amount should be returned!");
        return;
    }
    changeReturnComponent.style.display = "block";
    output.style.display = "block";
    for(let i=0; i<arrayNoteAmt.length; i++){
        returnAmt= geteachNoteQuantity(returnAmt, arrayNoteAmt[i], i);
    }
    
}

// return each note's number and diplay it
function geteachNoteQuantity(remainder, noteValue, index){

    if(remainder >= noteValue){
        let notes = Math.floor(remainder/noteValue);
        remainder -= notes*noteValue;
        numberofnotes[index].innerText = `${notes}`;
    }
    return remainder
}

// clear the notes table
function clearnumberofnotes(){
    for(let notes of numberofnotes){
        notes.innerText = "";
    }
}

function showError(text){
    errorDiv.style.display = "block";
    errorDiv.innerText= text;
    changeReturnComponent.style.display = "none";
}

function hideError(){
    errorDiv.style.display = "none";
}