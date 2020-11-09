const dicePics = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', 'yatzy logo.png'];
const valuesArray = document.querySelectorAll('img');
const cbx = document.querySelectorAll('input');
let points = document.querySelectorAll('#t3');
let sum = document.querySelectorAll('#t5');
let check = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let endResult = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let button = document.querySelector('button');

button.onclick = function btnRollAction() { 
    if (throwCount == 1) {
        for (let i; i < cbx.length; i++) {
            cbx[i].disabled = false;
        }
    }
    for (let i = 0; i < cbx.length; i++) {
        if (cbx[i].checked == true) {
            cbx[i].disabled = true;
            holds[i] = true;
        }
    }
    throwDice();
    button.innerHTML = 3 - throwCount + ' rolls remaining';

    if (throwCount <= 3) {
        for (let i = 0; i < values.length; i++) {
            if (values[i] == 1) {
                valuesArray[i].src = dicePics[0];
            } else if (values[i] == 2) {
                valuesArray[i].src = dicePics[1];
            } else if (values[i] == 3) {
                valuesArray[i].src = dicePics[2];
            } else if (values[i] == 4) {
                valuesArray[i].src = dicePics[3];
            } else if (values[i] == 5) {
                valuesArray[i].src = dicePics[4];
            } else if (values[i] == 6) {
                valuesArray[i].src = dicePics[5];
            }
        }
    }

    if (throwCount == 1) {
        for (let i = 0; i < values.length; i++) {
            if (throwCount == 1) {
                cbx[i].disabled = false;
            }
        }
    }

    if (throwCount == 3) {
         button.disabled = true;
        for (let i = 0; i < points.length; i++) {
           if (check[i] == false) {
            points[i].disabled = false;
           }
        }
        getResults();
        for (let i = 0; i < points.length; i++) {
            if(check[i] == false) {
            points[i].value = results[i + 1];
            }
        }
        for (let i = 0; i < values.length; i++) {
            cbx[i].disabled = true;
        }
        mouseClick();
    }
}

function realdeal() {
    for (let i = 0; i < points.length; i++) {
        if (check[i] == true) {
            points[i].value = endResult[i];
            points[i].style.color = 'Red';
        }
    }
}

function updateResult() {
    let results = getResults();
    for (let i = 0; i < results.length; i++) {
        if (check[i] == false) {
        points[i].value = results[i];
        }
    }
}

function newRound() {
    for (let i = 0; i < 5; i++) {
       // valuesArray[i].disabled = true;
        cbx[i].checked = false;
        holds[i] = false;
        button.value = '3 rolls remaining'
        button.disabled = false;
        throwCount = 0;
    }
    for (let i = 0; i < points.length; i++) {
        points[i].disabled = true;
    }
}

function upperSum() {
    let upperSum = 0;
    for (let i = 0; i < 6; i++) {
        upperSum += (endResult[i]) - 1;
        upperSum += 1;
    }
    sum[0].value = upperSum;
}

function bonus() {
    sum[1].innerHTML = 0;
    let sameSum = sum[0].value;
    if (sameSum >= 63) {
        sum[1].value = 50;
    }
}

function lowerSum() {
    let lowerSum = 0;
    for (let i = 6; i < 15; i++) {
        lowerSum += endResult[i] - 1;
        lowerSum += 1;
    }
    sum[2].value = lowerSum;
}

function total() {
    let upperSum = sum[0].value - 1;
    let bonus = sum[1].value - 1;
    let lowerSum = sum[2].value - 1;
    let total = upperSum + bonus + lowerSum - 1;
    total += 4;
    sum[3].value = total;
}

function endGame() {
    for (let i = 0; i < check.length; i++) {
        if (check[i] == false) {
            return;
        }
        button.disabled = true;
    }
    alert('The end\nGAME OVER\nYou scored: ' + sum[3].value);
}

function mouseClick() {
    for (let i = 0; i < points.length; i++) {
        points[i].onclick = () => {
            button.value = '3 rolls remaining'
            if (check[i] == false) {
                endResult[i] = points[i].value;
                button.innerHTML = '3 rolls remaining'
                upperSum();
                bonus();
                lowerSum();
                total();
                check[i] = true;
                realdeal();
                newRound();
                endGame(); 
            }
        }
    }
}


