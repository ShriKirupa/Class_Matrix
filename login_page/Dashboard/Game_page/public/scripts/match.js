document.addEventListener('DOMContentLoaded', () => {
    addMatchItem(); // Ensure at least one item is added on page load
});

function addMatchItem() {
    const container = document.getElementById('match-container');
    const itemCount = container.children.length + 1;

    const newPair = document.createElement('div');
    newPair.className = 'match-item';
    newPair.innerHTML = `
        <label for="item-${itemCount}">Item ${itemCount}:</label>
        <input type="text" id="item-${itemCount}" placeholder="Text or Image URL">
        <label for="match-${itemCount}">Matching Item ${itemCount}:</label>
        <input type="text" id="match-${itemCount}" placeholder="Matching Text or Image URL">
        <input type="file" id="item-file-${itemCount}" accept="image/*" onchange="uploadFile(this, 'item-${itemCount}')">
        <input type="file" id="match-file-${itemCount}" accept="image/*" onchange="uploadFile(this, 'match-${itemCount}')">
    `;
    container.appendChild(newPair);
}

function uploadFile(input, id) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '150px';
            img.style.maxHeight = '150px';
            document.getElementById(id).parentElement.insertBefore(img, input);
        };
        reader.readAsDataURL(file);
    }
}

function finalize(gameType) {
    const data = { pairs: [] };

    document.querySelectorAll('#match-container > .match-item').forEach(pair => {
        const itemText = pair.querySelector('input[type="text"]').value;
        const matchText = pair.querySelectorAll('input[type="text"]')[1].value;
        data.pairs.push({ itemText, matchText });
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

    document.querySelectorAll('#match-container > .match-item').forEach(pair => {
        const itemText = pair.querySelector('input[type="text"]').value;
        const matchText = pair.querySelectorAll('input[type="text"]')[1].value;
        container.innerHTML += `
            <div>
                <p><strong>Item:</strong> ${itemText}</p>
                <p><strong>Match:</strong> ${matchText}</p>
            </div>
        `;
    });

    document.body.appendChild(container);
}

