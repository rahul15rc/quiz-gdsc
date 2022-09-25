
var score = localStorage.getItem('counter1');
var n = localStorage.getItem('counter');
if (n === null) {
    n = 0;
} else {
    n++;
}
if (n === 10) {
    if (score > 10) {
        alert("Quiz complete! Couldn't load score.")   
    }
    else {
        alert("Quiz complete! You scored: " + score);
    }
    n = 0;
    score = 0;
}
console.log("n = " + n);
localStorage.setItem("counter", n);
console.log("Score = " + score);

const url = 'https://opentdb.com/api.php?amount=10';

async function getTrivia() {
let response = await fetch(url);
let data = await response.json();
return data;
}

function shuffleArray(arr) {
for (let i = arr.length - 1; i >= 0; i--) {
const s = Math.floor(Math.random() * (i + 1));
[arr[i], arr[s]] = [arr[s], arr[i]];
}
}

getTrivia().then((data) => {
const results = data.results[0];
console.log(results);
document.getElementById('question').innerHTML = results.question;
document.getElementById('category').innerHTML = results.category;
const difficulty =
results.difficulty[0].toUpperCase() + results.difficulty.substring(1);
document.getElementById('difficulty').innerHTML = difficulty;
const answers = [...results.incorrect_answers, results.correct_answer];
shuffleArray(answers);
for (let i = 0; i < 4; i++) {
let index = i + 1;
document.getElementById(`choice${index}label`).innerHTML = answers[i];
document.getElementById(`choice${index}`).value = answers[i];
}

document.getElementById('display').style.display = 'flex';

document.getElementById('guess').addEventListener('click', () => {
document.querySelectorAll('input[name="choice"]').forEach((el) => {
    const result = document.getElementById('result');
    if (el.checked) {
    console.log(el.value);
    console.log(results.correct_answer);

    if (el.value === results.correct_answer) {
        result.innerHTML = "Correct Answer! 😎";
        score++;
        localStorage.setItem("counter1", score);
    }
    else {
        result.innerHTML = `Incorrect Answer 😢 The correct answer is ${results.correct_answer}.`;
    }
    }
});
});
});

document.getElementById('new').addEventListener('click', () => {
location.reload();
});
