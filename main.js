const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { option: "Hyper Text Markup Language", correct: true },
            { option: "Hot Mail", correct: false },
            { option: "How to Make Links", correct: false },
            { option: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { option: "HTML", correct: false },
            { option: "JQuery", correct: false },
            { option: "CSS", correct: true },
            { option: "XML", correct: false }
        ]
    },
    {
        question: "Which is not a JavaScript Framework?",
        answers: [
            { option: "Python Script", correct: true },
            { option: "React", correct: false },
            { option: "Angular", correct: false },
            { option: "Vue", correct: false }
        ]
    }
];

// Get elements from the homepage
const questionContainer = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-container");
const nextButton = document.getElementById("nextButton");
const resultEl = document.getElementById("result");

let score = 0;
let currentQuestionIndex = 0;

// Function to handle starting the quiz
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    nextButton.style.display = "none";
    resultEl.textContent = "";
    showQuestion();
}

function showQuestion() {
    cancelPrev();
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.option;
        button.classList.add("optionBtns");
        answerButtons.appendChild(button);

        button.addEventListener("click", function() {
            evaluateOption(answer.correct);
        });
    });
}

function evaluateOption(isCorrect) {
    // Change the score based on correct answer
    if (isCorrect === true) {
        score++;
    }

    // Disable all buttons and show correct/incorrect answers
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answers.find(item => item.correct === true).option;

    for (let btn of answerButtons.children) {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.style.backgroundColor = "green";
        } else {
            btn.style.backgroundColor = "red";
        }
    }

    nextButton.style.display = "inline-block";
}

function cancelPrev() {
    answerButtons.innerHTML = "";
}

// Add next button event listener once
nextButton.addEventListener("click", function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        nextButton.style.display = "none";
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    cancelPrev();
    questionEl.textContent = "";
    nextButton.style.display = "none";

    if (score  === 3){
        resultEl.textContent="Congratulations,  your score is "+score+ "/"+questions.length + " You Have Passed!";
    }
    else{
        resultEl.textContent="Oh Sorry,your score is "+score+"/"+questions.length+ " You have Failed,Try Again!";
    }
}

startQuiz();