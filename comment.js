let quiz = [
    {
        "question": "Welches Land liegt nicht in Europa?",
        "answer_1": "Malta",
        "answer_2": "Armenien",
        "answer_3": "Türkei",
        "answer_4": "Tunesien",
        "right_answer": 4,
    },
    {
        "question": "Wie heißt die Hauptstadt von Australien?",
        "answer_1": "Melbourne",
        "answer_2": "Canberra",
        "answer_3": "Sydney",
        "answer_4": "Perth",
        "right_answer": 2,
    },
    {
        "question": "Wie heißt die berühmte Brücke von New York City?",
        "answer_1": "Brooklyn Bridge",
        "answer_2": "Tower Bridge",
        "answer_3": "Golden Gate Bridge",
        "answer_4": "Bay Bridge",
        "right_answer": 1,
    },
    {
        "question": "In welchem Ozean liegt die Insel Sri Lanka?",
        "answer_1": "Indischer Ozean",
        "answer_2": "Pazifischer Ozean",
        "answer_3": "Atlantischer Ozean",
        "answer_4": "Mittelmeer",
        "right_answer": 1,
    },
    {
        "question": "Welche Stadt hat die meisten Einwohner der Welt?",
        "answer_1": "Shanghai",
        "answer_2": "Tokio",
        "answer_3": "São Paulo",
        "answer_4": "Delhi",
        "right_answer": 2,
    },
    {
        "question": "Welche Tierart ist nicht in Afrika zu finden?",
        "answer_1": "Schimpanse",
        "answer_2": "Gorilla",
        "answer_3": "Orang-Utan",
        "answer_4": "Lemur",
        "right_answer": 3,
    },
    {
        "question": "Welcher dieser Staaten ist kein US-Bundesstaat?",
        "answer_1": "New Hampshire",
        "answer_2": "Minnesota",
        "answer_3": "Maine",
        "answer_4": "Ontario",
        "right_answer": 4,
    },
    {
        "question": "Das größte Land der Welt ist (Fläche)...",
        "answer_1": "Kanada",
        "answer_2": "Russland",
        "answer_3": "China",
        "answer_4": "Indien",
        "right_answer": 2,
    },
];

let rightQuestions = 0;
let currentQuestion = 0;
let success = new Audio('audio/success.mp3');
let fail = new Audio('audio/fail.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = quiz.length; // Gesamtanzahl der Fragen festlegen
    showQuestion();
}

function startQuiz() {
    document.getElementById('startscreen').style = 'display: none';
    document.getElementById('playscreen').style = '';
    document.getElementById('atw').classList.remove('sidebar-box-middle');
    document.getElementById('atw').classList.add('sidebar-box-start')
    

}

function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {
        updateProgressBar();
        showNextQuestion();
    } 
}
function gameIsOver() {
    return currentQuestion >= quiz.length  // Wenn die Reihenfolge der aktuellen Fragen höher oder gleich der Gesamtanzahl der Fragen ist 

    // return validiert den Wert uns sorgt dafür, dass die Funktion true ist.

}


function showEndscreen() {
        document.getElementById('endscreen').style = ''; //
        document.getElementById('question-body').style = 'display: none;'
        document.getElementById('total-right-answers').innerHTML = quiz.length;
        document.getElementById('total-right-questions').innerHTML = rightQuestions; 
}


function updateProgressBar() {
        let percent = (currentQuestion +1) / quiz.length;
        percent = Math.round(percent *100);                           //Update Prozentbalken
        document.getElementById('progress').innerHTML = `${percent}%`; 
        document.getElementById('progress').style.width = `${percent}%`;  
}

function showNextQuestion() {
    let question = quiz[currentQuestion];

        document.getElementById('current-number').innerHTML = currentQuestion +1;
        document.getElementById('questiontext').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];   // Zeigt nächste Frage an
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(a) {
    let question = quiz[currentQuestion];
    let selection = a.slice(-1);

    let rightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selection, question)) {
        document.getElementById(a).parentNode.classList.add('right-answer');
        rightQuestions++;
        success.play();
    } else {
        document.getElementById(a).parentNode.classList.add('wrong-answer');
        document.getElementById(rightAnswer).parentNode.classList.add('right-answer');
        fail.play();
    }

    document.getElementById('next-btn').disabled = false;
}

function rightAnswerSelected(selection, question) {
   return selection == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++; //z.B. von 0 auf 1 wird array "quiz" erhöht.
    document.getElementById('next-btn').disabled = true;
    resetAnswers();
    showQuestion();
 
}
function resetAnswers() {
    document.getElementById('answer_1').parentNode.classList.remove('wrong-answer');
    document.getElementById('answer_1').parentNode.classList.remove('right-answer');
    document.getElementById('answer_2').parentNode.classList.remove('wrong-answer');
    document.getElementById('answer_2').parentNode.classList.remove('right-answer');
    document.getElementById('answer_3').parentNode.classList.remove('wrong-answer');
    document.getElementById('answer_3').parentNode.classList.remove('right-answer');
    document.getElementById('answer_4').parentNode.classList.remove('wrong-answer');
    document.getElementById('answer_4').parentNode.classList.remove('right-answer');
}
function replay() {
    rightQuestions = 0;  // Anzahl richtiger Antworten zurücksetzen
    currentQuestion = 0; // Anzahl aktueller Fragen zurücksetzen
    document.getElementById('endscreen').style = 'display: none'; //endscreen ausblenden
    document.getElementById('question-body').style = ''; // Fragen wieder einblenden
    init();
}
