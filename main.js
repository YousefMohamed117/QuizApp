let count = document.querySelector(".count span");
let bulletsContainer = document.querySelector(".bullets ");
let bullets = document.querySelector(".bullets .spans");
let question = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submit = document.querySelector(".submit-button");
let results = document.querySelector(".results");
let countDownContainer = document.querySelector(".countdown");
let currentIndex = 0;
let rAns = 0;

function next(){};


function getQuestions() {
  fetch("htmlkQuestion.json")
    .then((e) => {
      f = e.json();
      return f;
    })
    .then((obj) => {
      let l = obj.length;
      countNum(l);
      ///////////////////////

      getQuestionData(obj[currentIndex], l);
      ///////////////////////
      countDown(5,l);
      ///////////////////////
      submit.onclick = function next() {
        console.log(rAns)
        checkAnswer(obj[currentIndex].right_answer, l);
        currentIndex++;
        question.innerHTML = "";
        answersArea.innerHTML = "";
        ///////////////////////
        getQuestionData(obj[currentIndex], l);
        ///////////////////////
        checkBullets(currentIndex);
        ///////////////////////
        clearInterval(countIntreval)
        countDown(5,l);
        ////////////////////////
        showResult(l);
      };
    });
}

getQuestions();

function countNum(num) {
  count.innerHTML = num;
  for (i = 0; i < num; i++) {
    let span = document.createElement("span");
    bullets.append(span);
    if (i === 0) {
      span.classList.add("on");
    }
  }
}

function getQuestionData(obj, count) {
  if (currentIndex < count) {
    h2 = document.createElement("h2");
    h2.append(obj.title);
    question.append(h2);

    //////////////////////

    for (i = 1; i < 5; i++) {
      let ans = document.createElement("div");
      ans.className = "answer";

      let r = [];
      let random = Math.floor(Math.random()*4)
      

      let inp = document.createElement("input");
      inp.type = "radio";
      inp.id = `answer_${i}`;
      inp.name = "question";
      inp.dataset.answer = obj[`answer_${i}`];

      let label = document.createElement("label");
      label.htmlFor = `answer_${i}`;

      let labelTxt = document.createTextNode(obj[`answer_${i}`]);
      label.appendChild(labelTxt);

      ans.appendChild(inp);
      ans.appendChild(label);
      answersArea.appendChild(ans);
    }
  }
}

function checkAnswer(theAns, l) {
  answers = document.getElementsByName("question");
  let chosenAns;
  for (i = 0; i < 4; i++) {
    if (answers[i].checked) {
      chosenAns = answers[i].dataset.answer;
      if (chosenAns === theAns) {
        console.log(true);
        rAns++;
      }
    }
  }
}

function checkBullets(index) {
  let bullets = document.querySelectorAll(".bullets .spans span");

  let b = Array.from(bullets);

  b.forEach((e, i) => {
    if (index === i) {
      e.className = "on";
    }
  });
}

function showResult(c) {
  if (currentIndex === c) {
   let res;

    bulletsContainer.remove();
    submit.remove();
    question.remove()
    answersArea.remove()
    if (rAns === c) {
      res = `<span class="perfect">PERFECT</span>, ${rAns} From ${c}`;
    } else if (rAns > 5 && rAns < c) {
      res = `<span class="good">Good</span>, ${rAns} From ${c}`;
    } else {
      res = `<span class="bad">YOU SUCK</span>, ${rAns} From ${c}`;
    }
    results.innerHTML = res
  }
}

function countDown(timer, count ) {
  if (currentIndex < count) {
    countIntreval = setInterval(() => {
      min = Math.floor(timer / 60);
      sec = Math.floor(timer % 60);
      ///////////////////////////
      min = min <10 ?`0${min}` :`${min}`
      sec = sec <10 ?`0${sec}` :`${sec}`
      countDownContainer.innerHTML = `${min}:${sec}`;
      //////////////////////////////
      //////////////////////////////
      if (timer === 0) {
        clearInterval(countIntreval);
        submit.click()
       
      }
      //////////////////////////////
      --timer;
    }, 1000);
  }
}




