let values = [1, 1, 1, 1, 1];
let holds = [false, false, false, false, false];
let results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let throwCount = 0;

function throwDice() {
    for (let i = 0; i < values.length; i++) {
        if (!holds[i] == true) {
            values[i] = Math.ceil(Math.random() * 6);
        }
        
    }
    throwCount++;
}

function getResults() {
    for (let i = 0; i <= 6; i++) {
        results[i] = sameValuePoints(i);
    }
    results[7] = onePairPoints();
    results[8] = twoPairPoints();
    results[9] = threeSamePoints();
    results[10] = fourSamePoints();
    results[11] = fullHousePoints();
    results[12] = smallStraightPoints();
    results[13] = largeStraightPoints();
    results[14] = chancePoints();
    results[15] = yatzyPoints();
}



function frequency() {
    let freq = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < values.length; i++) {
        let currentValue = values[i];
        freq[currentValue]++;
    }
    return freq;
}

function sameValuePoints(value) {
    let freq = frequency();
    let sameValuePoints = value * freq[value];

    return sameValuePoints;
}

function onePairPoints() {
    let highestScore = 0;
    let freq = frequency();
    for (let i = 6; i > 1; i--) {
        if (freq[i] > 1) {
            highestScore = i * 2;
            break;
        }
    }
    return highestScore;
}

function twoPairPoints() {
    let totalPoints = 0;
    let onePair = onePairPoints();
    let freq = frequency();
    if (onePair > 0) {
        for (let i = 0; i < freq.length; i++) {
        if (freq[i] > 1 && i * 2 != onePair) {
            totalPoints += i * 2 + onePair;
            break;
            }
        }
    }
    return totalPoints;
}

function threeSamePoints() {
    let totalPoints = 0;
    let freq = frequency();
    for (let i = 0; i < freq.length; i++) {
        if (freq[i] >= 3) {
            totalPoints = i * 3;
            break;
        }
    }
    return totalPoints;
}

function fourSamePoints() {
    let totalPoints = 0;
    let freq = frequency();
    for (let i = 0; i < freq.length; i++) {
        if (freq[i] >= 4) {
            totalPoints = i * 4;
            break;
        }
    }
    return totalPoints;
}

function fullHousePoints() {
    let totalPoints = 0;
    let threeSame = 0;
    let freq = frequency();

    for (let i = 0; i < freq.length; i++) {
        if (freq[i] == 3) {
            threeSame = 1 * 3;
            break;
        }
    }
    if (threeSame > 0) {
        for (let i = 0; i < freq.length; i++) {
            if (freq[i] == 2) {
                totalPoints = i * 2 + threeSame;
            }
        }
    }
    return totalPoints;
}

function smallStraightPoints() {
    let totalPoints = 0;
    let freq = frequency();
    for (let i = 0; i < freq.length; i++) {
        if (freq[1] == 1 && freq[2] == 1 && freq[3] == 1 && freq[5] == 1 && freq[6] == 0) {
            totalPoints = 15;
        } 
    }
    return totalPoints;
}

function largeStraightPoints() {
    let totalPoints = 0;
    let freq = frequency();
    for (let i = 0; i < freq.length; i++) {
        if (freq[1] == 0 && freq[2] == 1 && freq[3] == 1 && freq[5] == 1 && freq[6] == 1) {
            totalPoints = 20;
        } 
    }
    return totalPoints;
}

function chancePoints() {
    let totalPoints = 0;
    let freq = frequency();
    for (let i = 0; i < freq.length; i++) {
        totalPoints += freq[i] * i;
    }
    return totalPoints;
}

function yatzyPoints() {
    let yatzy = 0;
    let freq = frequency();
    for (let i = 0; i < freq.length; i++) {
        if (freq[i] == 5) {
            yatzy = 50;
        }
    }
    return yatzy;
}