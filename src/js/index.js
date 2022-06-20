let started = false;
let level = 0;
let userClickedPattern = [];
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];

$(document).on("keypress", () => {

    function nextSequence() {
        level++;
        userClickedPattern = [];

        let randomNumber = Math.floor(Math.random() * 4);

        $("#level-title").text(`Level: ${level}`);
        let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        
        $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    }

    function checkAnswer(currentLevel) {

        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(nextSequence, 1000);
            }

        } else {
            $("#level-title").text("Game over, press any key to restart.");

            let sound = new Audio("../../sounds/wrong.mp3");
            sound.play();

            $("body").addClass("game-over");

            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);

            startOver();
        }

    } 

    function startOver() {
        level = 0;
        gamePattern = 0;
        started = false;
    }

    function playSound(name) {
        switch (name) {
            case "green":
                let green = new Audio("../../sounds/green.mp3");
                green.play()
                break;

            case "red":
                let red = new Audio("../../sounds/red.mp3");
                red.play();
                break;

            case "yellow":
                let yellow = new Audio("../../sounds/yellow.mp3");
                yellow.play();
                break;

            case "blue":
                let blue = new Audio("../../sounds/blue.mp3");
                blue.play();
                break;

        }
    }

    function animatePress(currentColor) {
        $(`#${currentColor}`).addClass("pressed");
        setTimeout(() => {
            $(`#${currentColor}`).removeClass("pressed");
        }, 100);
    }

    if (!started) {
        nextSequence();
        level = 0;
        $("#level-title").text(`Level: ${level}`);

        started = true;
    }

    $("div.btn").on("click", (event) => {
        let userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);

    });
})