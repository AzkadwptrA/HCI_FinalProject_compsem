const questions = [
    {
        question: "10 + 20 = ?",
        answers: [
            { text: "5", correct: false},
            { text: "29", correct: false},
            { text: "-30", correct: false},
            { text: "30", correct: true},
        ]
    },
    {
        question: "-5 * (-2) = ?",
        answers: [
            { text: "10", correct: true},
            { text: "7", correct: false},
            { text: "-10", correct: false},
            { text: "100", correct: false},
        ]
    },
    {
        question: "12 * 25/12 = ?",
        answers: [
            { text: "25", correct: true},
            { text: "12", correct: false},
            { text: "-25", correct: false},
            { text: "2", correct: false},
        ]
    },
    {
        question: "3x + 2y = 26, If y = 4 find x",
        answers: [
            { text: "16", correct: false},
            { text: "-20", correct: false},
            { text: "20", correct: false},
            { text: "6", correct: true},
        ]
    },
    {
        question: "How many Seconds is in 2 Hour?",
        answers: [
            { text: "60", correct: false},
            { text: "1600", correct: false},
            { text: "7200", correct: true},
            { text: "3600", correct: false},
        ]
    },
    {
        question: "Which one of these is not a Prime number?",
        answers: [
            { text: "3", correct: false},
            { text: "1", correct: true},
            { text: "5", correct: false},
            { text: "7", correct: false},
        ]
    },
    {
        question: "(25*2)/10",
        answers: [
            { text: "100", correct: false},
            { text: "50", correct: false},
            { text: "5", correct: true},
            { text: "23", correct: false},
        ]
    },
    {
        question: "(25 - 18 + 5)/12",
        answers: [
            { text: "1", correct: true},
            { text: "0", correct: false},
            { text: "8", correct: false},
            { text: "12", correct: false},
        ]
    },
    {
        question: "12x + 8 - 4 = 28, find x",
        answers: [
            { text: "4", correct: false},
            { text: "8", correct: false},
            { text: "2", correct: true},
            { text: "3", correct: false},
        ]
    },
    {
        question: "which one is the correct factorization of y = x^2 + 7 + 10?",
        answers: [
            { text: "(x + 7)(x + 10)", correct: false},
            { text: "(x - 5)(x + 2)", correct: false},
            { text: "(x - 2)(x - 5)", correct: false},
            { text: "(x + 5)(x + 2)", correct: true},
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
    questionElement.innerHTML = questionNo + ") " + currentQuestion.question;

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