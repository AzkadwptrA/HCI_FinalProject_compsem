const questions = [
    {
        question: "What is the capital city of Australia?",
        answers: [
            { text: "Sydney", correct: false},
            { text: "Perth", correct: false},
            { text: "canberra", correct: true},
            { text: "Brisbane", correct: false},
        ]
    },
    {
        question: "What is the most common surname in the United States?",
        answers: [
            { text: "Robert", correct: false},
            { text: "John", correct: false},
            { text: "Smith", correct: true},
            { text: "Shakespear", correct: false},
        ]
    },
    {
        question: "When did Indonesia gain Independence?",
        answers: [
            { text: "17 September, 1945", correct: false},
            { text: "7 August, 1944", correct: false},
            { text: "20 July, 1969", correct: false},
            { text: "17 August, 1945", correct: true},
        ]
    },
    {
        question: "How many ghosts chase Pac-Man at the start of each game?",
        answers: [
            { text: "4", correct: true},
            { text: "5", correct: false},
            { text: "6", correct: false},
            { text: "None", correct: false},
        ]
    },
    {
        question: "What is a group of crows known as?",
        answers: [
            { text: "An embarassment", correct: false},
            { text: "A class", correct: false},
            { text: "A murder", correct: true},
            { text: "A surgeon", correct: false},
        ]
    },
    {
        question: "In what country is the Chernobyl nuclear plant located?",
        answers: [
            { text: "Russia", correct: false},
            { text: "Pakistan", correct: false},
            { text: "Ukraine", correct: true},
            { text: "Kazakhstan", correct: false},
        ]
    },
    {
        question: "How many planets are in our Solar System?",
        answers: [
            { text: "8", correct: true},
            { text: "10", correct: false},
            { text: "9", correct: false},
            { text: "No such things as Planets", correct: false},
        ]
    },
    {
        question: "How many cards are in a Deck of cards?",
        answers: [
            { text: "51", correct: false},
            { text: "52", correct: true},
            { text: "54", correct: false},
            { text: "64", correct: false},
        ]
    },
    {
        question: "There are 4 different suits in a deck of card, how many cards are in each suit?",
        answers: [
            { text: "13", correct: true},
            { text: "14", correct: false},
            { text: "12", correct: false},
            { text: "16", correct: false},
        ]
    },
    {
        question: "Which chess piece can move in a diagonal direction only?",
        answers: [
            { text: "Queen", correct: false},
            { text: "King", correct: false},
            { text: "Bishop", correct: true},
            { text: "Knight", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion()
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct =  answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild("loader");
    })
})


startQuiz();