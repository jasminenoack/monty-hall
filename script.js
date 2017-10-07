var doors = $(".door")
var message = $("#message")
var switch_el = $("#switch span")
var stay_el = $("#stay span")
var door
var winner
var empty_door
var switch_door

function chooseDoor() {
    door = Math.floor(Math.random() * 3) + 1
    winner = Math.floor(Math.random() * 3) + 1
    // turn events off
    doors.off()
    doors[door - 1].classList.add("active")
    message.text("Door " + door + " was choosen.")
    setTimeout(showOtherDoor, 1000)
}

function showOtherDoor() {
    var door_el
    if (door !== 1 && winner !== 1) {
        empty_door = 1
    } else if (door !== 2 && winner !== 2) {
        empty_door = 2
    } else if (door !== 3 && winner !== 3) {
        empty_door = 3
    }
    door_el = doors[empty_door - 1]
    door_el.classList.add("empty")
    message.text("Door " + empty_door + " is empty.")

    setTimeout(determineSwitchWins, 1000)
}

function determineSwitchWins() {
    if (door !== 1 && empty_door !== 1) {
        switch_door = 1
    } else if (door !== 2 && empty_door !== 2) {
        switch_door = 2
    } else if (door !== 3 && empty_door !== 3) {
        switch_door = 3
    }
    door_el = doors[switch_door - 1]
    door_el.classList.add("switch")

    message.text(
        "Switching will win if door " + switch_door + " is the winner. " +
        "Original will win if door " + door + " is the winner."
    )

    setTimeout(processWinner, 1000)
}

function processWinner() {
    if (door === winner) {
        stay_el.text(parseInt(stay_el.text()) + 1)
        message.text("Staying leads to winning.")
    } else {
        switch_el.text(parseInt(switch_el.text()) + 1)
        message.text("Switching leads to winning.")
    }
    doors[winner - 1].classList.add("winner")

    setTimeout(resetGame, 1000)
}

function resetGame() {
    doors.removeClass("empty")
    doors.removeClass("active")
    doors.removeClass("switch")
    doors.removeClass("winner")
    var door = null
    var winner = null
    var empty_door = null
    var switch_door = null

    setTimeout(chooseDoor, 1000)
}

setTimeout(chooseDoor, 1000)