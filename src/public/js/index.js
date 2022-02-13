const wordTable = document.getElementById("wordT");
const fword = document.getElementById("fword");

onfocus = () => {
    fword.focus();
}

function findWord(form, e) {
    e.preventDefault();

    fetch('/word', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            word: form.word.value,
            field: form.ES.value
        })
    })
    .then(res => res.json())
    .then(data => {
        while(wordTable.hasChildNodes()) {
            wordTable.removeChild(wordTable.firstChild);
        }
        data.words.forEach((word, idx) => {
            const tr = document.createElement("tr");
            const nb = document.createElement("td");
            const w = document.createElement("td");
            nb.innerHTML = idx;
            w.innerHTML = word.word;
            w.classList.add("word");
            w.dataset[`d${idx}`] = idx;

            w.onclick = () => {
                navigator.clipboard.writeText(w.innerHTML);
            }

            tr.appendChild(nb);
            tr.appendChild(w);

            wordTable.appendChild(tr);
        });
        fword.blur();
    });
}

function learnWord(form, e) {
    e.preventDefault();

    fetch('/learn', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            word: form.word.value
        })
    })
    fword.focus();
}

document.body.onkeypress = (e) => {
    if(Number(e.key) || Number(e.key)==0) {
        const word = document.querySelector(`[data-d${e.key}`).innerHTML;
        navigator.clipboard.writeText(word);
    }
}