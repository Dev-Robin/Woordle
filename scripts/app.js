let letter;
let word;
let guess;
let guessArr = [];
let grid = 1;
let colum = 0;
let wordDuplicates = [];

keyPress();
function randWord() {
    // Get a random number between 0 and 908
    const rand = Math.floor(Math.random() * words.length);

    word = words[rand];
    console.log(word);
    // Check for duplicate letters
    wordDuplicates = checkDuplicates(word);
    console.log(wordDuplicates);
}


// Function to log keypresses
function keyPress() {
    // Listen for keypress
    // Use keydown instead of keypress to accomodate for backspace
    document.addEventListener('keydown', logkey);

    function logkey(e) {
        // Check if the pressed key is an actual letter
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            console.log(e.keyCode);
            letter = e.key;
            console.log(letter);
            
            // Add letter to word grid
            addLetter(letter);
        // Check if the pressed key is enter
        } else if (e.keyCode == 13) {
            enterKey();
        // Check if the pressed key is backspace
        } else if (e.keyCode == 8) {
            backSpaceKey();
        }   
    }
}

// Function to compare the guess to the word
function checkWord() {
    
    console.log(guess);
    // Check if the word and the guess have a direct match
    if (guess == word) {
        console.log("You guessed the right word!");
        for (let i = 0; i <= guessArr.length - 1; i++) {
            document.getElementById(colum*5 + i + 1).style.backgroundColor = "var(--correct)";
            document.getElementById(colum*5 + i + 1).style.borderColor = "var(--correct)";
        }
        alertPopup("Je hebt het goed geraden! Het woord was: ", word);
    } else {
        let wordArr = word.split('');
        let checkedArr = [];
        console.log(wordArr);
        // Check for all correct letters first
        for (let i = 0; i <= guessArr.length; i++) {
            if (guessArr[i] == wordArr[i] && guessArr[i] != null) {
                correctLetter(i);
                checkedArr.push(i);
            }
        }
        console.log(checkedArr);
        // Remove all checked letter from the secret word array
        // Has to be removed after the first check because this check, checks if the letters are at the correct spot
        if (checkedArr.length > 0) {
            for (let c = checkedArr.length - 1; c >= 0; c--) {
                if (checkedArr[c] != null) {
                    console.log(checkedArr[c]);
                    wordArr.splice(checkedArr[c], 1);
                }
            }
        }
        console.log(wordArr);
        // check for remaining letters
        for (let j = 0; j <= guessArr.length; j++) {
            if (checkedArr.includes(j) == false) {
                if (wordArr.includes(guessArr[j])) {
                    semiCorrectLetter(j);
                    // Remove the letter after it has been checked
                    const index = wordArr.indexOf(guessArr[j]);
                    if (index > -1) {
                        wordArr.splice(index, 1);
                    }
                } else {
                    incorrectLetter(j);
                }
            }
        }
    }
}

// The guessed letter is at the right place
function correctLetter (i) {
    console.log(guessArr[i] + " is positioned at the right place!");
    // Paint the square of the correct letter green
    document.getElementById(colum*5 + i + 1).style.backgroundColor = "var(--correct)";
    document.getElementById(colum*5 + i + 1).style.borderColor = "var(--correct)";
    // Check if the keyboard key hasn't already been colored or is colored yellow
    if (window.getComputedStyle(document.getElementById(guessArr[i]), null).getPropertyValue('background-color') == "rgb(182, 180, 180)" || window.getComputedStyle(document.getElementById(guessArr[i]), null).getPropertyValue('background-color') == "rgb(219, 210, 77)") {
        document.getElementById(guessArr[i]).style.backgroundColor = "var(--correct)";
    }
}

// The guessed letter is not at the right place but the word does contain the guessed letter
function semiCorrectLetter (i) {
    console.log("The word contains: " + guessArr[i]);
    // Paint the square of the correct letter yellow
    document.getElementById(colum*5 + i + 1).style.backgroundColor = "var(--semiCorrect)";
    document.getElementById(colum*5 + i + 1).style.borderColor = "var(--semiCorrect)";
    // Check if the keyboard key hasn't already been colored
    if (window.getComputedStyle(document.getElementById(guessArr[i]), null).getPropertyValue('background-color') == "rgb(182, 180, 180)") {
        document.getElementById(guessArr[i]).style.backgroundColor = "var(--semiCorrect)";
    }
}

 // The guessed letter is not in the word
function incorrectLetter (i) {
    console.log("The word does not contain: " + guessArr[i]);
    // Paint the square of the incorrect letter grey
    if (colum*5 + i + 1 != colum*5 + 6) {
        document.getElementById(colum*5 + i + 1).style.backgroundColor = "var(--incorrect)";
        document.getElementById(colum*5 + i + 1).style.borderColor = "var(--incorrect)";
    }
    
    if (guessArr[i] != null) {
        // Check if the keyboard key hasn't already been colored
        if (window.getComputedStyle(document.getElementById(guessArr[i]), null).getPropertyValue('background-color') == "rgb(182, 180, 180)") {
            document.getElementById(guessArr[i]).style.backgroundColor = "var(--incorrect)";
        }
    }
}

// Add a typed letter to the grid
function addLetter(letter) {
    if (guessArr.length < 5) {
        // Set grid-item to the typed letter
        document.getElementById(grid).innerHTML = letter;
        // Animation
        document.getElementById(grid).style.animation = "keyPress 0.3s";

        guessArr.push(letter);
        console.log(guessArr);
        grid++;
    }
}

// Get value of the pressed key
function keyBoard(button) {
    letter = button.getAttribute("data-key");
    console.log(letter);
    addLetter(letter);
}

// Add functionality to backspace key
function backSpaceKey() {
    if (guessArr.length > 0) {
        guessArr.length = guessArr.length - 1;
    
        // Update GUI
        grid = grid - 1;
        document.getElementById(grid).innerHTML = '';
        document.getElementById(grid).style.animation = "";
    }
}

// Add functionality to enter key
function enterKey() {
    // Set the seperate guessed letters in the array to a complete word to compare
    guess = guessArr.join('');
    // Check if the guess is a word from the word list
    for (let i = 0; i <= words.length + 1; i++) {
        if (guess == words[i]) {
            checkWord();
        
            colum = colum + 1;
            guessArr.length = 0;
            if (guess == word) {
                reset();
                break;
            }
            if (colum >= 6) {
                // Reset if max amount of guesses is reached
                alertPopup("Je hebt al je beurten gespeeld. Het woord was: ", word);
                reset();
                break;
            }
            break;
        } else if (i == words.length + 1) {
            alertPopup("Dit woord staat niet in de lijst. Probeer een ander woord.", "");
            break;
        }
    }   
}

// Reset the board for the next game
function reset() {
    // For every tile on the board; clear the text and reset colors
    for (let i = 1; i <= 30; i++) {
        document.getElementById(i).innerHTML = "";
        document.getElementById(i).style.backgroundColor = "var(--background)";
        document.getElementById(i).style.borderColor = "var(--border)";
        guessArr.length = 0;
        colum = 0;
        grid = 1;       
    }
    guessArr.length = 0;
    colum = 0;
    grid = 1; 
    // Reset keyboard colors
    let kbButtons = document.getElementsByTagName('button');

    for(let i = 0; i < kbButtons.length; i++) {
        kbButtons[i].style.backgroundColor = "var(--buttonBg)";
    }

    
    // Pick a new secret word
    randWord();
}

// Function to check for duplicate letters in a word
function checkDuplicates (word) {
    const wordArr = word.split('');
    const set = new Set(wordArr);

    let duplicates = wordArr.filter(item => {
    if (set.has(item)) {
        set.delete(item);
    } else {
        return item;
    }
    });
    return duplicates
}

