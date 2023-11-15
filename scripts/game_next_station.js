const inputBox = document.getElementById('answer-input-box');
const submitted = document.getElementById('answer-submitted');
const question = document.getElementById('question');
const info = document.getElementById('answer-info');
var correctAnswer = null;

const owner = "lucasgneccoh";
const repo = "paris_metro_graph";
const path = "cards_next_station_metro_only.txt";
var maxQuestions = 700;
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
    .then (d => {localStorage.setItem("nextStationData", d)});




function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
    }

// Fill the datalist so that when typing, we see the possible stations
function init(){
    const datalist = document.getElementById("list-stations");
    var all_stations = localStorage.getItem("nextStationData")
                        .split("@").map(x => x.split(";")[1])
                        .sort().filter(onlyUnique).forEach(
                            function(item){
                                var option = document.createElement('option');
                                option.value = item;
                                datalist.appendChild(option);
                            }
                        );
    // Sort and take unique values

}

function compareAnswer(answer, correct){
    // Leave this here in case there is a more sophisticated way of comparing
    return answer.toLowerCase() === correct.toLowerCase()
}


function consumeQuestion(){
    var aux = localStorage.getItem("nextStationData").split("@");
    let qa = aux.pop();
    question.innerText = qa.split(";")[0];
    correctAnswer = qa.split(";")[1];
    // submitted.innerText = `Correct answer is ${correctAnswer}`
    localStorage.setItem("nextStationData", aux.join("@"))
};


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



// INIT
init();
// Call it once at load up
consumeQuestion();
