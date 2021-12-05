const billAmt = document.querySelector("#billAmt");
const cashGiven = document.querySelector("#cashGiven");
const errorDiv = document.querySelector(".errorMsg");
const cashGivenDiv = document.querySelector(".cashGivenInput");
const changeReturnDiv = document.querySelector(".changeReturn");
const output = document.querySelector("#output");
const nextBtn = document.querySelector("#nextBtn");
const checkBtn = document.querySelector("#checkBtn");
const noOfNotes = document.querySelectorAll(".noOfNotes");

const arrayNoteAmt = [2000, 500, 100, 20, 10, 5, 1];

output.style.display = "none";
cashGivenDiv.style.display = "none";

//check if bill amount is valid
nextBtn.addEventListener('click', ()=>{
    hideError();
    if(Number(billAmt.value)>0){

        nextBtn.style.display = "none";
        cashGivenDiv.style.display = "block";
    }
    else{
        showError("Enter valid bill amount");
    }
} )

// processing inputs to get result
checkBtn.addEventListener('click', ()=>{
    clearNoOfNotes();
    hideError();

    let billAmtValue= Number(billAmt.value);
    let cashGivenValue= Number(cashGiven.value);

    if(billAmtValue>0 && cashGivenValue>0){

        if(billAmtValue > cashGivenValue){
            showError("Cash is less than bill, please enter right amount");
            return;
        }
        //if input valid 
        calculateNotes(billAmtValue, cashGivenValue);
    } else{
        showError("Enter valid bill amount and cash given to continue");
        }
})


function calculateNotes(bill, cash){
    let returnAmt = cash-bill;
    
    if(returnAmt<1){
        showError("No amount should be returned");
        return;
    }
    changeReturnDiv.style.display = "block";
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
        noOfNotes[index].innerText = `${notes}`;
    }
    return remainder
}

// clear the notes table
function clearNoOfNotes(){
    for(let notes of noOfNotes){
        notes.innerText = "";
    }
}

function showError(text){
    errorDiv.style.display = "block";
    errorDiv.innerText= text;
    changeReturnDiv.style.display = "none";
}

function hideError(){
    errorDiv.style.display = "none";
}
