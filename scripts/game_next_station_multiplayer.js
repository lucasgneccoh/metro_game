const inputBox = document.getElementById('answer-input-box');
const submitted = document.getElementById('answer-submitted');
const question = document.getElementById('question');
const info = document.getElementById('answer-info');
var correctAnswer = null;


entrypoint = "https://localhost:8080";
const socket = io(entrypoint);

var stations = [];
var player_id = -1;
var score = 0;


socket.on('register', (data) => {
        console.log(`Client:register: Registered Player as ${socket.id}`);
        this.stations = data
        // Put options in datalist
        const datalist = document.getElementById("list-stations");
        data.forEach((item) =>{
                                var option = document.createElement('option');
                                option.value = item;
                                datalist.appendChild(option);
                            }
                );
        console.log(`Client:register: Registered stations ${stations[0]}, ${stations[1]} ...`);
});

var currQ = '';
var currA = '';

socket.on('QA', (currQuestion, currAnswer) => {
    console.log(`Client:newQA: ${currQuestion}, ${currAnswer}`);
    currQ = currQuestion;
    currA = currAnswer;
    question.innerText = currQuestion;
    // submitted.innerText = "";
    inputBox = "";
});



function compareAnswer(answer, correct){
    // Leave this here in case there is a more sophisticated way of comparing
    return answer.toLowerCase() === correct.toLowerCase()
}


socket.on('endRound', () => {
    if (compareAnswer(currA, submitted.innerText)){
        score ++;
        msg = "Correct !";
        submitted.style.background = '#61e885';
        info.innerText = "";
    }
    else{
        submitted.style.background = '#ff4a4a';
        info.innerText = `Correct answer was: ${correctAnswer}`;
    };
    
    
});

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitted.innerText = inputBox.value;
        socket.emit('submit', inputBox.value);
        inputBox.value = "";
    }
});

