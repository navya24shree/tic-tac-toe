document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let reset = document.querySelector("#reset");
    let newgame = document.querySelector("#new-game");
    let turnO = true;
    let heading = document.querySelector("h1");
    let game = document.getElementById("container");
    let usersinput = document.getElementById("usernameform");
    let submit = document.getElementById("submit");
    let scoreboard = document.getElementById("scoreboard");
    let player1name = document.getElementById("player1-name");
    let player2name = document.getElementById("player2-name");
    let score1 = document.getElementById("player1-score");
    let score2 = document.getElementById("player2-score");
    let s1 = 0;
    let s2 = 0;

    game.style.display = "none";
    usersinput.style.display = "flex";
    
    submit.addEventListener("click", (e) => {
        e.preventDefault(); 
        const p1 = document.getElementById("player1").value.trim();
        const p2 = document.getElementById("player2").value.trim();
        
        if(p1 && p2) {
            usersinput.style.display = "none";
            game.style.display = "flex";
            player1name.innerText = p1;
            player2name.innerText = p2;
        }
    })

    

   
const mainstyle = () => {
        game.style.display = "flex";
        usersinput.style.display = "flex";
        document.getElementById("player1").value = "";
        document.getElementById("player2").value = "";
        resetgame();
    }

    const winPatterns = [
        [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]
    ];
    
    let count = 0;
    let winnerMessageElement = null;
    let drawMessageElement = null;

    const addWinnerStyle = (index) => {
        boxes[index].style.animation = 'pulse 0.6s ease';
        boxes[index].style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
    }

    const drawmsg = () => {
        if(drawMessageElement) drawMessageElement.remove();
        
        drawMessageElement = document.createElement("div");
        drawMessageElement.className = "message draw-message";
        drawMessageElement.innerHTML = "<h2>🤝 It's a Draw!</h2><p>Start a new game!</p>";
        drawMessageElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(255, 193, 7, 0.95) 0%, rgba(255, 152, 0, 0.95) 100%);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            color: white;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            z-index: 1000;
            animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
        document.body.appendChild(drawMessageElement);
    }

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if(box.innerText === "") {
                count++;
                if(turnO) {
                    box.innerText = "O";
                    box.style.color = "#FF6B6B";
                    turnO = false;
                } else {
                    box.innerText = "X";
                    box.style.color = "#4ECDC4";
                    turnO = true;
                }
                box.disabled = true;
                box.style.animation = 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                
                if(!checkWinner() && count === 9) {
                    drawmsg();
                }
            }
        });
    });

    const winner = document.createElement("div");
    winner.className = "message winner-message";

    const styleWinner = () => {
        winner.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(76, 175, 80, 0.95) 0%, rgba(56, 142, 60, 0.95) 100%);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            color: white;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            z-index: 1000;
            animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
        if(!document.body.contains(winner)) {
            document.body.appendChild(winner);
        }
    };

    const checkWinner = () => {
        for(let pattern of winPatterns) {
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;
            
            if(pos1 !== "" && pos2 !== "" && pos3 !== "") {
                if(pos1 === pos2 && pos2 === pos3) {
                    // Highlight winning boxes
                    addWinnerStyle(pattern[0]);
                    addWinnerStyle(pattern[1]);
                    addWinnerStyle(pattern[2]);
                    
                    let winnerName = (pos1 === "X") ? player2name.innerText : player1name.innerText;
                    winner.innerHTML = `<h2>🎉 Congratulations!</h2><p>${winnerName} Wins! 🏆</p>`;
                    
                    count = 0;

                    if(pos1 === "X") {
                        s2 += 1;
                        score2.innerText = s2;
                    } else {
                        s1 += 1;
                        score1.innerText = s1;
                    }
                    
                    styleWinner();
                    disableboxes();
                    return true;
                }
            }
        }
        return false;
    };

    const enableboxes = () => {
        for(let box of boxes) {
            box.disabled = false;
            box.innerText = "";
            box.style.boxShadow = "";
            box.style.animation = "";
            box.style.color = "white";
        }
    };

    const resetgame = () => {
        turnO = true;
        count = 0;
        enableboxes();
        if(winner && document.body.contains(winner)) {
            winner.remove();
        }
        if(drawMessageElement && document.body.contains(drawMessageElement)) {
            drawMessageElement.remove();
        }
    };

    const disableboxes = () => {
        for(let box of boxes) {
            box.disabled = true;
        }
    };

    reset.addEventListener("click", resetgame);
    newgame.addEventListener("click", mainstyle);
});

