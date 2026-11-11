
/* =========================================
   THE BURN CROSSWORD
   ========================================= */

// ADD YOUR GOOGLE FORM URL HERE WHEN READY
const GOOGLE_FORM_URL = "YOUR_GOOGLE_FORM_URL";

const GRID_SIZE = 19;


/* =========================================
   PUZZLE ANSWERS AND CLUES

   row and col start at zero.
   A = Across
   D = Down
   ========================================= */

const entries = [

    // ================= ACROSS =================

    {
        number: 2,
        direction: "A",
        row: 2,
        col: 1,
        answer: "MUFFIN",
        clue: '"Eww this is a salty ___!" - Muff probably'
    },

    {
        number: 3,
        direction: "A",
        row: 2,
        col: 12,
        answer: "CHEWY",
        clue: "One of Carters nicknames"
    },

    {
        number: 6,
        direction: "A",
        row: 5,
        col: 2,
        answer: "STABOL",
        clue: "This frisbee house recently got a pool"
    },

    {
        number: 7,
        direction: "A",
        row: 5,
        col: 13,
        answer: "POD",
        clue: "Go to handler ___!"
    },

    {
        number: 8,
        direction: "A",
        row: 7,
        col: 2,
        answer: "APOPKA",
        clue: "Location of Florida tourney"
    },

    {
        number: 9,
        direction: "A",
        row: 7,
        col: 11,
        answer: "CRAINE",
        clue: "Last name of a teammate (sounds like a bird)"
    },

    {
        number: 11,
        direction: "A",
        row: 9,
        col: 5,
        answer: "CENTROS",
        clue: "Michael's favorite place on earth"
    },

    {
        number: 12,
        direction: "A",
        row: 9,
        col: 13,
        answer: "CHEEKS",
        clue: "Something white that you can't escape at every tournament"
    },

    {
        number: 15,
        direction: "A",
        row: 11,
        col: 10,
        answer: "TATE",
        clue: "Probably the freakiest member on the team (recently got a haircut)"
    },

    {
        number: 17,
        direction: "A",
        row: 13,
        col: 6,
        answer: "SLAMMER",
        clue: "Sidewalk ___ (Pain)"
    },

    {
        number: 18,
        direction: "A",
        row: 13,
        col: 14,
        answer: "LIGHT",
        clue: "Odds are in ___"
    },

    {
        number: 19,
        direction: "A",
        row: 15,
        col: 5,
        answer: "AFRICA",
        clue: "Ben is from the south of this place"
    },

    {
        number: 21,
        direction: "A",
        row: 15,
        col: 14,
        answer: "FLOP",
        clue: "Michael's new nickname"
    },

    {
        number: 23,
        direction: "A",
        row: 17,
        col: 2,
        answer: "SHOOT",
        clue: "What do shooters do?"
    },


    // ================= DOWN =================

    {
        number: 1,
        direction: "D",
        row: 0,
        col: 3,
        answer: "BUFFET",
        clue: "Go-to spot after a tournament"
    },

    {
        number: 4,
        direction: "D",
        row: 2,
        col: 15,
        answer: "WARDEN",
        clue: "Best scav hunt team"
    },

    {
        number: 5,
        direction: "D",
        row: 4,
        col: 6,
        answer: "POOKIE",
        clue: "Scav hunt top scorer"
    },

    {
        number: 9,
        direction: "D",
        row: 7,
        col: 11,
        answer: "CASCADES",
        clue: "Hike with a waterfall at the end"
    },

    {
        number: 10,
        direction: "D",
        row: 7,
        col: 16,
        answer: "EYE",
        clue: "Part of Link's face that is always red"
    },

    {
        number: 13,
        direction: "D",
        row: 9,
        col: 18,
        answer: "SHITTY",
        clue: "Don't use more than 4 of these"
    },

    {
        number: 14,
        direction: "D",
        row: 10,
        col: 2,
        answer: "DOLPHINS",
        clue: "NFL Team on Pookie's jacket (best NFL team oat)"
    },

    {
        number: 16,
        direction: "D",
        row: 12,
        col: 15,
        answer: "WILL",
        clue: "We used to have only one but this year two people have this first name (neither go by it though)"
    },

    {
        number: 17,
        direction: "D",
        row: 13,
        col: 6,
        answer: "SAFETY",
        clue: "What to say after your fart and before Trevor punches you"
    },

    {
        number: 20,
        direction: "D",
        row: 15,
        col: 9,
        answer: "CT",
        clue: "Weird stuff is happening in this frisbee house's basement"
    },

    {
        number: 22,
        direction: "D",
        row: 15,
        col: 17,
        answer: "POOP",
        clue: "6 of these were done on the drillfield this year"
    }

];


/* =========================================
   GAME STATE
   ========================================= */

const grid = [];

let activeEntry = null;
let selectedCell = null;
let previousCellClick = null;

let seconds = 0;
let timerInterval = null;
let timerStarted = false;
let puzzleCompleted = false;


/* =========================================
   BUILD THE GRID
   ========================================= */

function buildGrid() {

    for (let r = 0; r < GRID_SIZE; r++) {

        grid[r] = [];

        for (let c = 0; c < GRID_SIZE; c++) {

            grid[r][c] = {
                letter: "",
                correctLetter: "",
                number: null,
                entries: [],
                isBlack: true
            };

        }

    }

    entries.forEach(entry => {

        for (let i = 0; i < entry.answer.length; i++) {

            const r = entry.row +
                (entry.direction === "D" ? i : 0);

            const c = entry.col +
                (entry.direction === "A" ? i : 0);

            if (
                r < 0 || r >= GRID_SIZE ||
                c < 0 || c >= GRID_SIZE
            ) {
                console.error("Answer outside grid:", entry);
                continue;
            }

            const cell = grid[r][c];
            const letter = entry.answer[i];

            if (
                cell.correctLetter &&
                cell.correctLetter !== letter
            ) {

                console.error(
                    "CROSSWORD CONFLICT:",
                    r,
                    c,
                    cell.correctLetter,
                    letter
                );

            }

            cell.correctLetter = letter;
            cell.isBlack = false;
            cell.entries.push(entry);

            if (i === 0) {
                cell.number = entry.number;
            }

        }

    });

    renderGrid();
    renderClues();

}


/* =========================================
   RENDER GRID
   ========================================= */

function renderGrid() {

    const container = document.getElementById("crossword-grid");

    container.innerHTML = "";

    for (let r = 0; r < GRID_SIZE; r++) {

        for (let c = 0; c < GRID_SIZE; c++) {

            const cellData = grid[r][c];

            const cell = document.createElement("div");

            cell.className = "cell";

            cell.dataset.row = r;
            cell.dataset.col = c;

            if (cellData.isBlack) {

                cell.classList.add("black");

            } else {

                if (cellData.number !== null) {

                    const number = document.createElement("span");

                    number.className = "cell-number";
                    number.textContent = cellData.number;

                    cell.appendChild(number);

                }

                const input = document.createElement("input");

                input.type = "text";
                input.maxLength = 1;
                input.autocomplete = "off";
                input.autocapitalize = "characters";
                input.spellcheck = false;

                input.dataset.row = r;
                input.dataset.col = c;

                input.setAttribute(
                    "aria-label",
                    `Row ${r + 1}, column ${c + 1}`
                );

                input.value = cellData.letter;

                input.addEventListener("click", () => {
                    selectCell(r, c);
                });

                input.addEventListener("input", event => {

                    const value = event.target.value
                        .replace(/[^a-z]/gi, "")
                        .slice(-1)
                        .toUpperCase();

                    event.target.value = value;

                    grid[r][c].letter = value;

                    if (value) {

                        startTimer();
                        moveToNextCell();

                    }

                    clearCellFeedback();
                    updateProgress();

                });

                input.addEventListener("keydown", event => {
                    handleKeydown(event, r, c);
                });

                cell.appendChild(input);

                cell.addEventListener("click", event => {

                    if (event.target.tagName !== "INPUT") {
                        selectCell(r, c);
                    }

                });

            }

            container.appendChild(cell);

        }

    }

}


/* =========================================
   RENDER CLUES
   ========================================= */

function renderClues() {

    const acrossContainer = document.getElementById("across-clues");
    const downContainer = document.getElementById("down-clues");

    acrossContainer.innerHTML = "";
    downContainer.innerHTML = "";

    entries.forEach(entry => {

        const clue = document.createElement("div");

        clue.className = "clue";

        clue.dataset.number = entry.number;
        clue.dataset.direction = entry.direction;

        const number = document.createElement("span");
        number.className = "clue-number";
        number.textContent = entry.number;

        const text = document.createElement("span");
        text.className = "clue-text";
        text.textContent = entry.clue;

        clue.appendChild(number);
        clue.appendChild(text);

        clue.addEventListener("click", () => {
            selectEntry(entry);
        });

        if (entry.direction === "A") {
            acrossContainer.appendChild(clue);
        } else {
            downContainer.appendChild(clue);
        }

    });

}


/* =========================================
   SELECT A WORD
   ========================================= */

function selectEntry(entry) {

    activeEntry = entry;

    selectedCell = {
        row: entry.row,
        col: entry.col
    };

    previousCellClick = null;

    highlightActiveEntry();
    updateActiveClue();
    focusCell(entry.row, entry.col);

}


function selectCell(r, c) {

    const cell = grid[r][c];

    if (cell.isBlack || !cell.entries.length) return;

    const sameCell =
        previousCellClick &&
        previousCellClick.row === r &&
        previousCellClick.col === c;

    let chosenEntry;

    if (
        sameCell &&
        cell.entries.length > 1 &&
        activeEntry
    ) {

        chosenEntry = cell.entries.find(entry =>
            entry.direction !== activeEntry.direction
        ) || cell.entries[0];

    } else if (
        activeEntry &&
        cell.entries.includes(activeEntry)
    ) {

        chosenEntry = activeEntry;

    } else {

        chosenEntry = cell.entries[0];

    }

    previousCellClick = { row: r, col: c };

    activeEntry = chosenEntry;

    selectedCell = { row: r, col: c };

    highlightActiveEntry();
    updateActiveClue();
    focusCell(r, c);

}


function updateActiveClue() {

    document.querySelectorAll(".clue").forEach(clue => {

        clue.classList.toggle(
            "active",
            activeEntry &&
            Number(clue.dataset.number) === activeEntry.number &&
            clue.dataset.direction === activeEntry.direction
        );

    });

}


function highlightActiveEntry() {

    document.querySelectorAll(".cell").forEach(cell => {

        cell.classList.remove(
            "active-word",
            "selected"
        );

    });

    if (!activeEntry) return;

    const cells = getEntryCells(activeEntry);

    cells.forEach(position => {

        const cell = document.querySelector(
            `.cell[data-row="${position.row}"][data-col="${position.col}"]`
        );

        if (cell) {
            cell.classList.add("active-word");
        }

    });

    if (selectedCell) {

        const selected = document.querySelector(
            `.cell[data-row="${selectedCell.row}"][data-col="${selectedCell.col}"]`
        );

        if (selected) {
            selected.classList.add("selected");
        }

    }

}


function focusCell(r, c) {

    const input = document.querySelector(
        `.cell input[data-row="${r}"][data-col="${c}"]`
    );

    if (input) {
        input.focus({ preventScroll: true });
    }

}


/* =========================================
   MOVE BETWEEN LETTERS
   ========================================= */

function getEntryCells(entry) {

    const cells = [];

    for (let i = 0; i < entry.answer.length; i++) {

        cells.push({

            row: entry.row +
                (entry.direction === "D" ? i : 0),

            col: entry.col +
                (entry.direction === "A" ? i : 0)

        });

    }

    return cells;

}


function moveToNextCell() {

    if (!activeEntry || !selectedCell) return;

    const cells = getEntryCells(activeEntry);

    const currentIndex = cells.findIndex(cell =>
        cell.row === selectedCell.row &&
        cell.col === selectedCell.col
    );

    if (currentIndex < 0) return;

    if (currentIndex < cells.length - 1) {

        const next = cells[currentIndex + 1];

        selectedCell = next;

        highlightActiveEntry();
        focusCell(next.row, next.col);

    }

}


function moveToPreviousCell() {

    if (!activeEntry || !selectedCell) return;

    const cells = getEntryCells(activeEntry);

    const currentIndex = cells.findIndex(cell =>
        cell.row === selectedCell.row &&
        cell.col === selectedCell.col
    );

    if (currentIndex > 0) {

        const previous = cells[currentIndex - 1];

        selectedCell = previous;

        highlightActiveEntry();
        focusCell(previous.row, previous.col);

    }

}


/* =========================================
   KEYBOARD CONTROLS
   ========================================= */

function handleKeydown(event, r, c) {

    if (event.key === "Backspace") {

        event.preventDefault();

        if (grid[r][c].letter) {

            grid[r][c].letter = "";
            event.target.value = "";

        } else {

            moveToPreviousCell();

            if (selectedCell) {

                grid[selectedCell.row][selectedCell.col].letter = "";

                const previousInput = document.querySelector(
                    `.cell input[data-row="${selectedCell.row}"][data-col="${selectedCell.col}"]`
                );

                if (previousInput) {
                    previousInput.value = "";
                }

            }

        }

        clearCellFeedback();
        updateProgress();

    }

    if (event.key === "ArrowRight") {

        event.preventDefault();
        moveInGrid(0, 1);

    }

    if (event.key === "ArrowLeft") {

        event.preventDefault();
        moveInGrid(0, -1);

    }

    if (event.key === "ArrowDown") {

        event.preventDefault();
        moveInGrid(1, 0);

    }

    if (event.key === "ArrowUp") {

        event.preventDefault();
        moveInGrid(-1, 0);

    }

}


function moveInGrid(rowChange, colChange) {

    if (!selectedCell) return;

    let r = selectedCell.row + rowChange;
    let c = selectedCell.col + colChange;

    while (
        r >= 0 && r < GRID_SIZE &&
        c >= 0 && c < GRID_SIZE
    ) {

        if (!grid[r][c].isBlack) {

            selectCell(r, c);
            return;

        }

        r += rowChange;
        c += colChange;

    }

}


/* =========================================
   TIMER
   ========================================= */

function startTimer() {

    if (timerStarted || puzzleCompleted) return;

    timerStarted = true;

    timerInterval = setInterval(() => {

        seconds++;

        updateTimer();

    }, 1000);

}


function stopTimer() {

    clearInterval(timerInterval);

}


function updateTimer() {

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formatted =
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0");

    document.getElementById("timer").textContent = formatted;

}


function getFormattedTime() {

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );

}


/* =========================================
   CHECK PUZZLE
   ========================================= */

function checkPuzzle() {

    let emptyCells = 0;
    let incorrectCells = 0;

    document.querySelectorAll(".cell").forEach(cell => {

        cell.classList.remove("correct", "incorrect");

    });

    for (let r = 0; r < GRID_SIZE; r++) {

        for (let c = 0; c < GRID_SIZE; c++) {

            const cell = grid[r][c];

            if (cell.isBlack) continue;

            const element = document.querySelector(
                `.cell[data-row="${r}"][data-col="${c}"]`
            );

            if (!cell.letter) {

                emptyCells++;

                continue;

            }

            if (cell.letter !== cell.correctLetter) {

                incorrectCells++;

                element.classList.add("incorrect");

            } else {

                element.classList.add("correct");

            }

        }

    }

    const feedback = document.getElementById("feedback");

    if (emptyCells > 0 || incorrectCells > 0) {

        feedback.className = "feedback error";

        if (incorrectCells > 0 && emptyCells > 0) {

            feedback.textContent =
                `You have ${incorrectCells} incorrect letters and ${emptyCells} empty squares. Keep going!`;

        } else if (incorrectCells > 0) {

            feedback.textContent =
                `You have ${incorrectCells} incorrect letters. Keep trying!`;

        } else {

            feedback.textContent =
                `You're almost there! ${emptyCells} squares remaining.`;

        }

        return;

    }

    completePuzzle();

}


/* =========================================
   CLEAR FEEDBACK
   ========================================= */

function clearCellFeedback() {

    document.querySelectorAll(".cell").forEach(cell => {

        cell.classList.remove("correct", "incorrect");

    });

    const feedback = document.getElementById("feedback");

    feedback.textContent = "";
    feedback.className = "feedback";

}


/* =========================================
   PROGRESS
   ========================================= */

function updateProgress() {

    const total = grid.flat().filter(cell =>
        !cell.isBlack
    ).length;

    const filled = grid.flat().filter(cell =>
        !cell.isBlack && cell.letter
    ).length;

    const feedback = document.getElementById("feedback");

    if (filled === total) {

        feedback.textContent =
            "All squares filled! Check your answers.";

    }

}


/* =========================================
   COMPLETE PUZZLE
   ========================================= */

function completePuzzle() {

    if (puzzleCompleted) return;

    puzzleCompleted = true;

    stopTimer();

    document.getElementById("final-time").textContent =
        getFormattedTime();

    document.getElementById("game-screen")
        .classList.add("hidden");

    document.getElementById("completion-screen")
        .classList.remove("hidden");

}


/* =========================================
   CLEAR PUZZLE
   ========================================= */

function clearPuzzle() {

    if (!confirm("Are you sure you want to clear all your letters?")) {
        return;
    }

    for (let r = 0; r < GRID_SIZE; r++) {

        for (let c = 0; c < GRID_SIZE; c++) {

            if (!grid[r][c].isBlack) {

                grid[r][c].letter = "";

            }

        }

    }

    document.querySelectorAll(".cell input").forEach(input => {

        input.value = "";

    });

    clearCellFeedback();
    updateProgress();

}


/* =========================================
   BUTTONS
   ========================================= */

document.getElementById("check-button")
    .addEventListener("click", checkPuzzle);

document.getElementById("clear-button")
    .addEventListener("click", clearPuzzle);


document.getElementById("google-form-button")
    .addEventListener("click", () => {

        if (
            GOOGLE_FORM_URL === "YOUR_GOOGLE_FORM_URL" ||
            !GOOGLE_FORM_URL.startsWith("https://")
        ) {

            alert("The Google Form link has not been added yet.");

            return;

        }

        window.open(GOOGLE_FORM_URL, "_blank");

    });


document.getElementById("play-again-button")
    .addEventListener("click", () => {

        location.reload();

    });


/* =========================================
   START GAME
   ========================================= */

buildGrid();
