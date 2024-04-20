/*const progressBar = document.querySelector(".progress-bar"),
progressText = document.querySelector(".progress-text");

const progress = (value) => {
      const percentage = (value / time) * 100;
      progressBar.computedStyleMap.width = `${precentage}%`;
      progressText.innerHTML = `${value}`
};

let questions = [],
time = 30,
score = 0,
currentQuestion,
timer;

const startBtn = document.querySelector(".start"),
numQuestion = document.querySelector("num-questions"),
subject = document.querySelector("#subject"),
pattern = document.querySelector("#pattern"),
quizes = document.querySelector(".quizes"),
startscreen = document.querySelector(".start-screen");

const startQuiz = () => {
      const num = numQuestion.value;
      sub = subject.value;
      patt = pattern.value;

      //API link ekhane upload korbo
      const url = `PutYourLinkHere.com`;

      fetch(url).then((res) => res.json())
      .then((data) => {
            questions = data.results;
            startscreen.classList.add("hide");
            quizes.classList.remove("hide");
            currentQuestion = 1;
            showQuestion(questions[0]);
      });
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
      const questionText = document.querySelector(".question"),
      answerWrapper = document.querySelector(".answer-wrapper"),
      questionNumber = document.querySelector(".number");

      questionText.innerHTML = question.question;

      //correct a wrong answers are separate lets mix them
      const answers = [
            ...question.incorrect_answer,
            question.correct_answer.toString(),
      ];
      //correct answer will be always at last
      //shuffle the array
      answerWrapper.ariaSort(() => Math.random() - 0.5);
      answerWrapper.innerHTML = "";
      answerWrapper.forEach((answer) => {
            answerWrapper.innerHTML +=
            <div class="answer"><span class="text">${Answer}</span><span class="checkbox"><span class="icon">√</span>
            </span>
            </div>
      })
};
*/
const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start"),
  numQuestions = document.querySelector("#num-questions"),
  category = document.querySelector("#category"),
  difficulty = document.querySelector("#difficulty"),
  timePerQuestion = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

let questions = [],
  time = 30,
  score = 0,
  currentQuestion,
  timer;

const startQuiz = () => {
  const num = numQuestions.value,
    cat = category.value,
    diff = difficulty.value;
  loadingAnimation();
  const url = //api url here ;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      questions = data.results;
      setTimeout(() => {
        startScreen.classList.add("hide");
        quiz.classList.remove("hide");
        currentQuestion = 1;
        showQuestion(questions[0]);
      }, 1000);
    });
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
                  <div class="answer ">
            <span class="text">${answer}</span>
            <span class="checkbox">
              <i class="fas fa-check"></i>
            </span>
          </div>
        `;
  });

  questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
            <span class="total">/${questions.length}</span>`;
  //add event listener to each answer
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = timePerQuestion.value;
  startTimer(time);
};

const startTimer = (time) => {
  timer = setInterval(() => {
    if (time === 3) {
      playAdudio("countdown.mp3");
    }
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      checkAnswer();
    }
  }, 1000);
};

const loadingAnimation = () => {
  startBtn.innerHTML = "Loading";
  const loadingInterval = setInterval(() => {
    if (startBtn.innerHTML.length === 10) {
      startBtn.innerHTML = "Loading";
    } else {
      startBtn.innerHTML += ".";
    }
  }, 500);
};
function defineProperty() {
  var osccred = document.createElement("div");
  osccred.innerHTML =
    "A Project By <a href='https://www.facebook.com/alvi.evan.9/' target=_blank>Team Qualyzer</a>";
  osccred.style.position = "absolute";
  osccred.style.bottom = "0";
  osccred.style.right = "0";
  osccred.style.fontSize = "10px";
  osccred.style.color = "#ccc";
  osccred.style.fontFamily = "Montserrat";
  osccred.style.padding = "5px";
  osccred.style.background = "#fff";
  osccred.style.borderTopLeftRadius = "5px";
  osccred.style.borderBottomRightRadius = "5px";
  osccred.style.boxShadow = "0 0 5px #ccc";
  document.body.appendChild(osccred);
}

defineProperty();

const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");
submitBtn.addEventListener("click", () => {
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    console.log(currentQuestion);
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      const correctAnswer = document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct");
          }
        });
    }
  } else {
    const correctAnswer = document
      .querySelectorAll(".answer")
      .forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion - 1].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
  }
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
};

const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score");
const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});

const playAdudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};




const seeLecturesElements = document.querySelectorAll('.see-lectures');

seeLecturesElements.forEach(seeLectures => {
  seeLectures.addEventListener('click', () => {
    const chaptersContainers = document.querySelectorAll('.chapters-container');
    
    chaptersContainers.forEach(chaptersContainer => {
      if (chaptersContainer !== seeLectures.parentElement.querySelector('.chapters-container')) {
        chaptersContainer.classList.add('hidden'); // Hide other containers
      }
    });
    
    const chaptersContainer = seeLectures.parentElement.querySelector('.chapters-container');
    chaptersContainer.classList.toggle('hidden'); // Toggle visibility on click
  });
});







      
let names = [

      'Introduction to Computers [ CSE 1101 ]',
      'Emergence of Bangladesh [GED 1202 ]',
      'Structured Programming Language [ CSE 1102 ]',
      'Mathematics I [ MATH 1101 ]',
      'Mathematics II [ MATH 1302 ]',
      'Mathematics III [ MATH 2103 ]',
      'Mathematics IV [ MATH 2204 ]',
      'Mathematics V [ MATH 2305 ]',
      'Data Structure [ CSE 2111 ]',
      'Discrete Mathematics [ CSE 1258 ]',
      'Physics I [ PHY 1201 ]',
      'Physics II [ PHY 1302 ]',
      'Object Oriented Programming I (C++) [ CSE 1307 ]',
      'Object Oriented Programming II (Java) [ CSE 3333 ]',
      'Algorithm Design and Analysis [ CSE 2263 ]',
      'Electronic Engineering [ CSE 2109 ]',
      'Electrical Engineering and Circuit Analysis [ CSE 1205 ]',
      'Data Communication [ CSE 3227 ]',
      'Numerical Methods [CSE 3168 ]',
      'Digital Logic Design [ CSE 2215 ]',
      'Database Management System [ CSE 2319 ]',
      'Bangla Language & Literature [ BANG 1109 ]',
      'Computer Architecture [ CSE 3170 ]',
      'Digital Electronics & Pulse Technique [ CSE 2317 ]',
      'Theory of Computation [ CSE 3169 ]',
      'Microprocessor and Assembly Language Programming [ CSE 3124 ]',
      'Software Engineering [ CSE 3230 ]',
      'Compiler Design [CSE 3228 ]',
      'Operating System [ CSE 3331 ]',
      'Economics [ HUM 1301 ]',
      'Image Processing and Computer Vision [ CSE 4351 ]',
      'VLSI Design [ CSE 4241 ]',
      'Management Information System [ CSE 4349 ]',
      'Communication Engineering [ CSE 3375 ]',
      'Computer Networks [ CSE 4136 ]',
      'Artificial Intelligence & Experts System [ CSE 4355 ]',
      'Image Processing [ CSE 4351 ]',

];
let sortedNames = names.sort();
console.log(sortedNames);



let input = document.getElementById("input");
    input.addEventListener("keyup", (e) => {
        removeElements();
        for(let i of sortedNames) {
            if(i.toLowerCase().startsWith(input.value.toLowerCase()) && input.value != "") {
                let listItem = document.createElement("li");
                listItem.classList.add("list-items");
                listItem.style.cursor = "pointer";
                listItem.setAttribute("onclick", "displaynames('" + i + "')");
                let word = "<b>" + i.substr(0,input.value.length) + "</b>";
                word += i.substr(input.value.length);
                listItem.innerHTML = word;
                let list = document.querySelector(".list");
                if (list) {
                    list.appendChild(listItem);
                }
            }
        }
      });

function displaynames(value) {
      input.value = value;
      removeElements();
}
function removeElements() {
      let items = document.querySelectorAll(".list-items");
      items.forEach((item) => {
            item.remove();
      });
}





document.getElementById("searchButton").addEventListener("click", function() {
  searchCourse();
});

document.getElementById("input").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
      searchCourse();
  }
});

function searchCourse() {
  let courseName = document.getElementById("input").value.trim();
  let courseDestinations = {
      "Mathematics I [ MATH 1101 ]": "mathematics1",
      "Introduction to Computers [ CSE 1101 ]": "introductionToComputers",
      // Add more courses here as needed
  };

  if (courseName in courseDestinations) {
      let destination = courseDestinations[courseName];
      window.location.href = "allCourses.html" + destination;
  }
}



/*document.addEventListener('DOMContentLoaded', function() {
  const chapterList = document.getElementById('chapter-list');
  const chapterItems = chapterList.getElementsByTagName('li');

  for (let i = 0; i < chapterItems.length; i++) {
    chapterItems[i].addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const chapters = document.querySelectorAll('.container-box');

  for (let i = 0; i < chapters.length; i++) {
    chapters[i].addEventListener('click', function() {
      const content = this.querySelector('.chapter-content');
      if (content) {
        content.classList.toggle('hidden');
      }
      this.classList.toggle('expanded');
    });
  }
});
*/

