// Cкопіюй код з минулого уроку
document.addEventListener('DOMContentLoaded', () => {

    // 1. БАЗА ДАНИХ (Масив об'єктів)
    const questions = [
        {
            question: "Яка квітка є символом Японії та асоціюється з весняним цвітінням?",
            answers: ["Тюльпан", "Ромашка", "Соняшник", "Сакура"],
            correct: 3
        },
        {
            question: "Яка квітка завжди повертається за сонцем?",
            answers: ["Мак", "Троянда", "Соняшник", "Фіалка"],
            correct: 2
        },
        {
            question: "Яка квітка має захисні шипи на стеблі?",
            answers: ["Волошка", "Троянда", "Кульбаба", "Конвалія"],
            correct: 1
        },
        {
            question: "З якої квітки збирають солодкий нектар для найсмачнішого меду, а її цвіт заварюють під час застуди?",
            answers: ["Липа", "Калина", "Огірочник", "Бузок"],
            correct: 0
        },
        {
            question: "Яка польова квітка має яскраво-синій колір і часто росте серед жита?",
            answers: ["Ромашка", "Кульбаба", "Мак", "Волошка"],
            correct: 3
        },
        {
            question: "Яка частина квітки знаходиться під землею і поживними речовинами живить всю рослину?",
            answers: ["Корінь", "Листок", "Бутон", "Пелюстка"],
            correct: 0
        },
         {
            question: "Як називається маленький пухнастий кульок, який утворюється після цвітіння кульбаби?",
            answers: ["Ягода", "Горішок", "Парашутик", "Шишка"],
            correct: 2
        },
         {
            question: "Який колір зазвичай мають пелюстки незабудки?",
            answers: ["Червоний", "Чорний", "Фіолетовий", "Блакитний"],
            correct: 3
        },
        {
            question: "Хто найчастіше допомагає квітам запилюватися, переносячи пилок?",
            answers: ["Звірі", "Комахи", "Риби", "Черв'яки"],
            correct: 1
        },
         {
            question: "Яка весняна квітка першою пробивається крізь сніг?",
            answers: ["Хризантема", "Підсніжник", "Гладіолус", "Жоржина"],
            correct: 1
        }];
        //   Додай свої запитання
        
        const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const scoreDisplay = document.querySelector('#score-display')
    
    let questionIndex = 0;
    let score = 0;
    let timer = 40;
    const timerDisplay = document.querySelector('#timer');
    let interval;
    
    // Керування екранами (JS)
    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);

    // Функція для відображення запитання
    function showQuestion(question) {
        clearInterval(interval); 
        startTimer();
        answersContainer.innerHTML = '';
        questionText.innerText = question.question;
        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);

        }
    }
    showQuestion(questions[questionIndex]);
    
    // Функція для переходу до наступного запитання
    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }
    
    // Перевірка відповіді
    function checkAnswer(button, i) {
        if (i == questions[questionIndex].correct) {
            score++;
            scoreDisplay.innerText = `Бали: ${score}`;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        })
        setTimeout(nextQuestion, 1000);
    }


    function showResult() {
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
        const finalScore = document.querySelector('#final-score');
        finalScore.innerText = score;
    }


    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);


    function startTimer() {
        timer = 40;
        timerDisplay.innerText = `Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    restartBtn.addEventListener('click', () => {
        startGame();
        resultScreen.classList.add('hide');
    });

});
