let letter;
let word;
let guess;
let guessArr = [];
let grid = 1;
let colum = 0;

keyPress();
function randWord() {
    // Get a random number between 0 and 908
    const rand = Math.floor(Math.random() * words.length);

    word = words[rand];
    console.log(word);
    return word;
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
            document.getElementById(colum*5 + i + 1).style.backgroundColor = "#6db347";
            document.getElementById(colum*5 + i + 1).style.borderColor = "#6db347";
        }
        alert("Je hebt het goed geraden! Het woord was: " + word);
    } else {
        // Check if the guess matches any letters with the word
        for (let i = 0; i <= guessArr.length; i++) {
            const wordArr = word.split('');
            if (word.includes(guessArr[i])) {
                // Check if the guessed letter is positioned at the right place
                if (guessArr[i] == wordArr[i]) {
                    // The guessed letter is at the right place
                    console.log(guessArr[i] + " is positioned at the right place!");
                    // Paint the square of the correct letter green
                    document.getElementById(colum*5 + i + 1).style.backgroundColor = "#6db347";
                    document.getElementById(colum*5 + i + 1).style.borderColor = "#6db347";
                    document.getElementById(guessArr[i]).style.backgroundColor = "#6db347";
                } else {
                    // The guessed letter is not at the right place but the word does contain the guessed letter
                    console.log("The word contains: " + guessArr[i]);
                    // Paint the square of the correct letter yellow
                    document.getElementById(colum*5 + i + 1).style.backgroundColor = "#dbd24d";
                    document.getElementById(colum*5 + i + 1).style.borderColor = "#dbd24d";
                    document.getElementById(guessArr[i]).style.backgroundColor = "#dbd24d";
                }
            } else {
                // The guessed letter is not in the word
                console.log("The word does not contain: " + guessArr[i]);
                // Paint the square of the incorrect letter grey
                if (colum*5 + i + 1 != colum*5 + 6) {
                    document.getElementById(colum*5 + i + 1).style.backgroundColor = "#454545";
                    document.getElementById(colum*5 + i + 1).style.borderColor = "#454545";
                }
                if (guessArr[i] != null) {
                    document.getElementById(guessArr[i]).style.backgroundColor = "#454545";
                }
            }
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
        //document.getElementById(grid).style.animation = "";        

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
                // Reset is max amount of guesses is reached
                alert("Je hebt al je beurten gespeeld. Het woord was: " + word);
                reset();
                break;
            }
            break;
        } else if (i == words.length + 1) {
            alert("Dit woord staat niet in de lijst. Probeer een ander woord.");
            break;
        }
    }   
}

// Reset the board for the next game
function reset() {
    // For every tile on the board; clear the text
    for (let i = 1; i <= 30; i++) {
        document.getElementById(i).innerHTML = "";
        document.getElementById(i).style.backgroundColor = "#272727";
        document.getElementById(i).style.borderColor = "#979494";
        guessArr.length = 0;
        colum = 0;
        grid = 1;       
    }
    // Reset keyboard colors
    let kbButtons = document.getElementsByTagName('button');

    for(let i = 0; i < kbButtons.length; i++) {
        kbButtons[i].style.backgroundColor = "#b6b4b4";
    }

    
    // Pick a new secret word
    randWord();
}