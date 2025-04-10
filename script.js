// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Scripts", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Syntax", correct: false }
      ]
    },
    {
      question: "What color is #ffcf0d",
      answers: [
        { text: "Pink", correct: false },
        { text: "Yellow", correct: true },
        { text: "Green", correct: false },
        { text: "Blue", correct: false }
      ]
    }
  ];
  
  // 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // You search for the id with the specified name inputted into the function getElementById(). The ids are specified in index.html in the quiz container class.
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const hintButton = document.getElementById("hint-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // The HTML elements are being created dynamically in the JS file because they are the elements that the user is interacting with, such as the answer buttons.
      // The other page elements are defined statically in the HTML file becaue they are not being interacted with by the user, such as the page header.
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      // 4. What is the line below doing? 
      // t is appending a button to the list of answer buttons, where correct answers have a button that ndicates the answer is correct.
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    answerButtonsElement.innerHTML = "";
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // Including this line of code is what allows for the user to get to the next question in the quiz via the "Next" button. If you did not have this line,
    // then no "Next" button appears after the user answers the first question, so the next question in the quiz cannot be accessed.
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart";
    nextButton.style.display = "block";
  }

  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex) {
      showQuestion();
    } else {
      showScore();
    }
  }

  hintButton.addEventListener("click", () => { 
    // make a list of all answer buttons
    const buttonsList = Array.from(answerButtonsElement.children);
    // make a list of the incorrect answer buttons
    const incorrectButtons = buttonsList.filter(btn => btn.dataset.correct !== "true" && !btn.classList.contains("wrong"))
    // if there are still incorrect answer buttons, reveal the first one from the top
    if (incorrectButtons.length > 0) {
      incorrectButtons[0].classList.add("wrong");
    }
  })
  
  // 6. Summarize in your own words what you think this block of code is doing. 
  // It continues through the quiz until al the questions have been answered, and then there is the option to restart the quiz when there are no more questions left.
  nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();
  