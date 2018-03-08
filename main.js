function loadQuestion(callback){
    let requestURL = "questions.json"
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'text'; // now we're getting a string!
    request.send();
    request.onload = function() {
        let questionsText = request.response; // get the string from the response
        let questions = JSON.parse(questionsText); // convert it to an object
        callback(questions)
      }
}

function getRandomInt(max) {
    return  Math.floor(Math.random() * (max  + 1));
  }

class Game{
    constructor(numquestion){
        this.init(numquestion)
    }
    init(numquestion){

        this.questions = []
        this.questionCount = numquestion
        this.state = "question"
        this.answers = []
        this.askedQuestions = []
        this.currentQuestion = null
        this.currentQuestionAnswer = null
        this.score = 0
        this.initQuestion()
    }
    initQuestion(){
        // var self = this
        // loadQuestion(function (questions){
        //     self.questions = questions
        // })
        // console.log(this.questions)
        this.questions = JSON.parse('{ "questions": [ {  "question": "aple",  "answer": "a",  "options":[ "a", "b", "c", "d"  ] }, {  "question": "orange",  "answer": "b",  "options":[ "a", "b", "c"  ] } ]}').questions
        this.questionCount = this.questions.length
    }
    getQuestion(){
        if (this.state == "question"){
            if (this.questionCount <=0){
                this.state = 'done'
                return null
            }
            this.changeState("answer")
            let question = this.questions[getRandomInt(this.questions.length-1)]
            this.askedQuestions.push(question)
            this.currentQuestionAnswer = question.answer
            this.questions.slice(this.questions.indexOf(question))
            return question
        }

    }
    getSummary(){
        return this.score
    }
    changeState(state){
        this.state = state
    }
    answer(ans){
        if(this.state == "answer"){
            if(this.currentQuestionAnswer == ans){
                this.score +=1
            }
            this.answers.push(ans)
            this.questionCount -=1
            this.changeState("question")
        }
    }
    reset(){
        this.init()
    }
}
// let questions = 
let g = new Game()

function update(){
    console.log(g.questionCount)
    if(g.questionCount != 0) {
        let ques = document.getElementById("question")
        question = g.getQuestion()
        ques.innerHTML = question.question
        let option1 = document.getElementById("option-1")
        option1.innerHTML = question.options[0]
        option1.onclick = function() { 
            answer(question.options[0])
        }
        let option2 = document.getElementById("option-2")
        option2.innerHTML = question.options[1]
        option2.onclick = function() { 
            answer(question.options[1])
        }
        let option3 = document.getElementById("option-3")
        option3.innerHTML = question.options[2]
        option3.onclick = function() { 
            answer(question.options[3])
        }
        let option4 = document.getElementById("option-4")
        option4.innerHTML = question.options[3]
        option4.onclick = function() { 
            answer(question.options[4])
        }
    }
    else{
        console.log(g.getSummary())
        let score = document.getElementById("score")
        score.innerHTML = g.getSummary()
        let container = document.getElementById("container")
        container.style.display = "none"
        let result = document.getElementById("result")
        result.style.display = "flex" 
    }
}

function answer(ans){
    g.answer(ans)
    update()
}

function reset(){
    g.reset()
    update()
    let container = document.getElementById("container")
    container.style.display = "inline-block"
    let result = document.getElementById("result")
    result.style.display = "none" 
}
function start(numquestion){
    g = new Game(numquestion)
    update()
    let container = document.getElementById("container")
    container.style.display = "inline-block"
    let result = document.getElementById("result")
    result.style.display = "none" 
    let start = document.getElementById("start")
    start.style.display = "none" 
}

// console.log(question)
// console.log(g.getQuestion())
// console.log(g.questionCount)
// console.log(g.getQuestion())
// console.log(g.questionCount)
// console.log(g.answer(""))
// console.log(g.questionCount)
// console.log(g.getQuestion())
// console.log(g.questionCount)
// console.log(g.getSummary())