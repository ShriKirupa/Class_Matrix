// Save data to local storage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Retrieve data from local storage
function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Example usage for Match game
function finalizeMatch() {
    const data = { pairs: [] };

    document.querySelectorAll('#match-container > .match-item').forEach(pair => {
        const itemText = pair.querySelector('input[type="text"]').value;
        const matchText = pair.querySelectorAll('input[type="text"]')[1].value;
        data.pairs.push({ itemText, matchText });
    });

    saveToLocalStorage('matchData', data);
    alert('Data has been stored in local storage.');
}

// Example usage for Quiz
function finalizeQuiz() {
    const questions = [];

    document.querySelectorAll('.quiz-question').forEach(question => {
        const questionText = question.querySelector('input[type="text"]').value;
        const options = Array.from(question.querySelectorAll('input[type="text"]')).map(input => input.value);
        questions.push({ questionText, options });
    });

    saveToLocalStorage('quizData', { questions });
    alert('Data has been stored in local storage.');
}

// Example usage for Fill in the Blanks
function finalizeFillUps() {
    const sentences = [];

    document.querySelectorAll('.fill-blank-sentence').forEach(sentence => {
        const text = sentence.querySelector('.editable-sentence').innerText;
        const correctAnswer = sentence.querySelector('.correct-answer').value;
        sentences.push({ text, correctAnswer });
    });

    saveToLocalStorage('fillUpsData', { sentences });
    alert('Data has been stored in local storage.');
}
