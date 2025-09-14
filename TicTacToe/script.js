document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let reset = document.querySelector("#reset");
    let newgame = document.querySelector("#new-game");
    let turnO = true;
    let heading = document.querySelector("h1");
    let undo = document.createElement("button");
    let game = document.getElementById("container");
    
    
    let players = document.getElementById("btwplayers");
    let inputs = document.querySelector(".player");
    let usersinput = document.getElementById("usernameform");
    let submit=document.getElementById("submit");
    let scoreboard=document.getElementById("scoreboard");
    let player1=document.getElementById("player1").value;
    let player2=document.getElementById("player2").value;
    let player1name=document.getElementById("player1-name");
    let player2name=document.getElementById("player2-name");
    let score1=document.getElementById("player1-score");
    let score2=document.getElementById("player2-score");
    let s1=0;
    let s2=0;

    game.style.display = "none";
    usersinput.style.display = "block";
    scoreboard.style.display="none";
    
    submit.addEventListener("click",(e)=>{
        e.preventDefault(); 
        usersinput.style.display="none";
        game.style.display="block";
        
        scoreboard.style.display="block";
        player1name.innerText=document.getElementById("player1").value;
        player2name.innerText=document.getElementById("player2").value;
    })

    

   
const mainstyle=()=>{
    
    game.style.display="block";
    usersinput.style.display="none";
    scoreboard.style.display="none";
    winner.style.display="none";
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
    // resetgame();
  
    


}





const winPatterns=[
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]
];
let count=0;
let msg=document.createElement("h4");
const drawmsg=()=>{
    
    msg.innerText="This match was a draw . Start with a new game";
    msg.style.color="white";
    msg.style.textAlign="center";
    msg.style.fontSize="30px";
    heading.after(msg);
    
    

    
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        count=count+1;
        if(turnO){
            box.innerText="O";
            box.style.fontSize="50px";
            box.style.textShadow="0 0 15px  red";
            box.style.color="white";
            turnO=false;
        }
        else {
            box.innerText="X";
            box.style.fontSize="50px";
            box.style.textShadow="0 0 15px  green";
            box.style.color="white";
            turnO=true;
        }
        box.disabled=true;
        if(!checkWinner() && count ===9){
            if(checkWinner()){
                count=0;
            }
            drawmsg();

        }
        
        
   });
});
const styleWinner=()=>{
    
    
    winner.style.textAlign="center";
    winner.style.fontSize="40px";
    heading.after(winner);

};

const winner=document.createElement("h2");
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                boxes[pattern[0]].style.boxShadow="0px 0px 15px red";
                boxes[pattern[1]].style.boxShadow="0px 0px 15px red";
                boxes[pattern[2]].style.boxShadow="0px 0px 15px red";
                let winnerName = (pos1 === "X") ? player2name.innerText : player1name.innerText;

                winner.innerText = `"Congratulations winner is ${winnerName}"`;
                
                count=0;

                if(pos1==="X"){
                    winner.style.color="green";

                    s2 += 1;  // Increment player1 score (X)
                    score2.innerText = s2;  // Update scoreboard UI for player1
                    
                }
                else{
                    winner.style.color="red";
                    s1 += 1;  // Increment player2 score (O)
                    score1.innerText = s1;  // Update scoreboard UI for player2
                    
                }
                styleWinner();
                console.log("winner is ",pos1);
                disableboxes();
                
                return true;
               

            }
        }
    }
};
const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.style.boxShadow="";
    }
};
const resetgame=()=>{
    turnO=true;
    enableboxes();
    winner.remove();
    msg.remove();
};
const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};


reset.addEventListener("click",resetgame);
newgame.addEventListener("click",mainstyle);

});

