const questions = [
    {
        question: "Which of these is a Vector unit",
        answers: [
            { text: "Distance", correct: false},
            { text: "Acceleration", correct: true},
            { text: "Time", correct: false},
            { text: "Mass", correct: false},
        ]
    },
    {
        question: "What natural compound present in green plants that gives them their color?",
        answers: [
            { text: "Phloem", correct: false},
            { text: "Chlorofyll", correct: true},
            { text: "Xylem", correct: false},
            { text: "Sugar", correct: false},
        ]
    },
    {
        question: "What is Distance over Time?",
        answers: [
            { text: "Gravity", correct: false},
            { text: "Velocity", correct: false},
            { text: "Speed", correct: true},
            { text: "Weight", correct: false},
        ]
    },
    {
        question: "If element X have 6 electrons, how many protons does it have?",
        answers: [
            { text: "6", correct: true},
            { text: "7", correct: false},
            { text: "8", correct: false},
            { text: "5", correct: false},
        ]
    },
    {
        question: "Which acidic solution is required to create NaCl when doing a neutralization reacting using NaOH?",
        answers: [
            { text: "Hycdrocloric Acid", correct: true},
            { text: "Sulfuric Acid", correct: false},
            { text: "Limestone", correct: false},
            { text: "Nitric Acid", correct: false},
        ]
    },
    {
        question: "What do we call the most basic structural unit of living things?",
        answers: [
            { text: "DNA", correct: false},
            { text: "Skin", correct: false},
            { text: "Cell", correct: true},
            { text: "Life", correct: false},
        ]
    },
    {
        question: "At what temperature are Celsius? and Fahrenheit equal?",
        answers: [
            { text: "0", correct: false},
            { text: "273", correct: false},
            { text: "32", correct: false},
            { text: "-40", correct: true},
        ]
    },
    {
        question: "What is the formula of Kinetic Energy?",
        answers: [
            { text: "KE = 1/2(mv^2)", correct: true},
            { text: "KE = mc^2", correct: false},
            { text: "KE = ma", correct: false},
            { text: "KE = mgh", correct: false},
        ]
    },
    {
        question: "What counts as an 'Acidic Solution' on the pH scale?",
        answers: [
            { text: "> 7", correct: false},
            { text: "10", correct: false},
            { text: "= 7", correct: false},
            { text: "< 7", correct: true},
        ]
    },
    {
        question: "Where is DNA found inside a Cell?",
        answers: [
            { text: "Nucleus", correct: true},
            { text: "Cytoplasm", correct: false},
            { text: "Cell membrane", correct: false},
            { text: "None of the above", correct: false},
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