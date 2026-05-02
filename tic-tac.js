let boxes = document.querySelectorAll(".box")
let resetbtn = document.querySelector(".reset-btn")
let newgamebtn = document.querySelector(".new-game")
let msgcont = document.querySelector(".msg-cont");
let msg = document.querySelector(".msg");

let turnO = true

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO =true;
    enableBoxes();
    msgcont.classList.add("hide");
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {   /*try box.onlick after*/
        if (turnO) {
            box.innerText = "X";
           box.style.color = "#00F5FF"; 
            box.style.textShadow = "0 0 10px #00F5FF";
            turnO = false;
        } else {
            box.innerText = "O";
            box.style.color = "#FF007F";
            box.style.textShadow = "0 0 10px #FF007F";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
      box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
};



const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcont.classList.remove("hide");
    disableBoxes();
    
};

const checkWinner = () => {
    let isWinner = false;
    for ( let pattern of winPatterns) {
       let pv1 = boxes[pattern[0]].innerText;
       let pv2 = boxes[pattern[1]].innerText;
       let pv3 = boxes[pattern[2]].innerText;

       if(pv1 != "" && pv2 != "" && pv3 !=  "" ){
          if(pv1 === pv2 && pv2 === pv3){
            showWinner(pv1);
            isWinner = true; 
            return; 
          }
       }
    }



    if (!isWinner) {
        let allFilled = true;
        for (let box of boxes) {
            if (box.innerText === "") {
                allFilled = false; 
            }
        }

        if (allFilled) {
            msg.innerText = "Game was a Draw! 🤝"; 
            msgcont.classList.remove("hide"); 
            disableBoxes(); 
        }
    }
    
};




newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

