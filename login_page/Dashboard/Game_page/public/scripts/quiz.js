function addQuizOption(button) {
    const container = button.previousElementSibling;
    const newOption = document.createElement('input');
    newOption.type = 'text';
    newOption.placeholder = `Option ${container.children.length + 1}`;
    container.appendChild(newOption);
}

function addQuizQuestion() {
    const container = document.getElementById('quiz-container');
    const newQuestion = document.createElement('div');
    newQuestion.className = 'quiz-question';
    newQuestion.innerHTML = `
        <input type="text" placeholder="Enter your question">
        <div class="quiz-options">
            <input type="text" placeholder="Option 1">
        </div>
        <button onclick="addQuizOption(this)">Add Option</button>
    `;
    container.appendChild(newQuestion);
}

function finalize(gameType) {
    const data = { questions: [] };

    document.querySelectorAll('.quiz-question').forEach(question => {
        const text = question.querySelector('input[type="text"]').value;
        const options = Array.from(question.querySelectorAll('.quiz-options input')).map(option => option.value);
        data.questions.push({ text, options });
    });

    fetch(`http://localhost:3000/api/${gameType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => alert(`Data has been stored in the ${gameType} collection.`))
    .catch(error => console.error('Error:', error));
}

function preview() {
    const container = document.createElement('div');
    container.className = 'preview-container';

    document.querySelectorAll('.quiz-question').forEach(question => {
        const text = question.querySelector('input[type="text"]').value;
        const options = Array.from(question.querySelectorAll('.quiz-options input')).map(option => option.value);
        container.innerHTML += `
            <div>
                <p><strong>Question:</strong> ${text}</p>
                <p><strong>Options:</strong></p>
                <ul>
                    ${options.map(option => `<li>${option}</li>`).join('')}
                </ul>
            </div>
        `;
    });

    document.body.appendChild(container);
}
