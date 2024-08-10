function addFillBlank() {
    const container = document.getElementById('fill-blank-container');
    const newBlank = document.createElement('div');
    newBlank.className = 'fill-blank-sentence';
    newBlank.innerHTML = `
        <div contenteditable="true" class="editable-sentence" placeholder="Enter another sentence here..."></div>
        <button onclick="createBlank()">Create Blank from Highlighted Text</button>
        <input type="text" class="correct-answer" placeholder="Correct Answer">
    `;
    container.appendChild(newBlank);
}

function createBlank() {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
        const range = selection.getRangeAt(0);
        const blankSpan = document.createElement('span');
        blankSpan.className = 'preview-blank';
        blankSpan.textContent = '______'; // A clean, distinct blank

        range.deleteContents();
        range.insertNode(blankSpan);

        // Move the cursor after the blank
        range.setStartAfter(blankSpan);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        alert("Please highlight the text you want to turn into a blank.");
    }
}

function finalize(gameType) {
    const data = { sentences: [] };

    document.querySelectorAll('.fill-blank-sentence').forEach(sentence => {
        const text = sentence.querySelector('.editable-sentence').innerHTML;
        const answer = sentence.querySelector('.correct-answer').value;
        data.sentences.push({ text, answer });
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

    document.querySelectorAll('.fill-blank-sentence').forEach(sentence => {
        const text = sentence.querySelector('.editable-sentence').innerHTML;
        const answer = sentence.querySelector('.correct-answer').value;
        container.innerHTML += `
            <div>
                <p>${text}</p>
                <p><strong>Answer:</strong> ${answer}</p>
            </div>
        `;
    });

    document.body.appendChild(container);
}
