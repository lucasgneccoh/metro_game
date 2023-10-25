const inputBox = document.getElementById('answer-input-box');
const submitted = document.getElementById('answer-submitted');
const question = document.getElementById('question');
const info = document.getElementById('answer-info');
var correctAnswer = null;

const owner = "lucasgneccoh";
const repo = "paris_metro_graph";
const path = "cards_line_number.txt";
var num = Math.floor(Math.random()*100);
var maxQuestions = 100;
var score = 0;
var played = 0;

// Load data and prepare
let data = fetch (
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  )
    .then (d => d.json ())
    .then (d =>
      fetch (
        `https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`
      )
    )
    .then (d => d.json ())
    .then (d => atob (d.content))
    .then (d => d.split("\n"))
    .then (d => Array.from(d.slice(0, maxQuestions).sort((a, b) => 0.5 - Math.random())))
    .then (d => d.join("@"))
    .then (d => {localStorage.setItem("lineNumberData", d)});


const compareArrays = (a, b) => {
    return a.toString() === b.toString();
};

function compareAnswer(answer, correct){
    // Turn them both in arrays using their delimiters
    // Answer must be delimited by commas
    return compareArrays(
        answer.trim().split(",").map(x => x.trim()).sort(), 
        correct.trim().split("-").map(x => x.trim()).sort()
        )
}


function consumeQuestion(){
    var aux = localStorage.getItem("lineNumberData").split("@");
    let qa = aux.pop();
    question.innerText = qa.split(";")[0];
    correctAnswer = qa.split(";")[1];
    // submitted.innerText = `Correct answer is ${correctAnswer}`
    localStorage.setItem("lineNumberData", aux.join("@"))
};

// Call it once at load up
consumeQuestion();

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        var ans = inputBox.value;
        played ++;
        var msg = "Wrong !";
        // Check if answer was good or not
        if(compareAnswer(ans, correctAnswer)){
            score ++;
            msg = "Correct !";
            submitted.style.background = '#61e885';
            info.innerText = "";
        }
        else{
            submitted.style.background = '#ff4a4a';
            info.innerText = `Correct answer was: ${correctAnswer}`;
        };
        
        submitted.innerText = `${msg} (Score: ${score} / ${played})`;
        
        // Ready up for next question
        inputBox.value = "";
        consumeQuestion()
    }
});
