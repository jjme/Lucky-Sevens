function clearErrors() {    
    if (document.forms["lucky7Form"].elements[0].parentElement.className.indexOf("error") != -1) {
            document.forms["lucky7Form"].elements[0]
               .parentElement.classList.remove("has-error");
    }    
} 

function resetForm() {
    document.forms["lucky7Form"]["startingBet"].value = "";
    document.getElementById("btnPlay").innerText = "Play";
    document.forms["lucky7Form"]["startingBet"].focus();
}

function validateItem() {
    clearErrors();
    var validBet = Number(document.forms["lucky7Form"]["startingBet"].value);
    if (validBet == "" || isNaN(validBet) || validBet <=0 ) {
        alert("Starting bet must be a positive number.")
        resetForm();
        return false;
    }
    else {
        play(validBet);
        return false;
    }
}

function play(validBet) {
    var startBet = validBet;
    var gameMoney = startBet;
    var rolls = 0;
    var maxHeld = gameMoney;
    var rollWhenMax = 0;
    while(gameMoney >= 1) {
        rolls++;
        if (rollDice() === 7) {
            gameMoney += 4;
            if (gameMoney > maxHeld) {
                maxHeld = gameMoney;
                rollWhenMax = rolls;
            }
        }
        else {
            gameMoney -= 1;
        }
    }
    gameOver(startBet, rolls, maxHeld, rollWhenMax);
    return false;
}

function rollDice() {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    var diceResult = dice1 + dice2;
    return diceResult;
}

function gameOver(startBet, rolls, maxHeld, rollWhenMax) {
    document.getElementById("results").style.display = "block";
    document.getElementById("btnPlay").innerText = "Play Again";
    document.getElementById("startBet").innerText = startBet.toFixed(2);
    document.getElementById("totalRolls").innerText = rolls;
    document.getElementById("maxHeld").innerText = maxHeld.toFixed(2);
    document.getElementById("rollOnHigh").innerText = rollWhenMax;
}
 

