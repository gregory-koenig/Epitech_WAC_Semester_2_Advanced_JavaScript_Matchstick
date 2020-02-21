/**
 * This the main file for the Allum1 project.
 *
 * To launch the game :
 * - node allum1.js
 *
 * @author Gregory KOENIG <koenig.gregory@epitech.eu>
 */

/**
 * VARIABLES
 */
let   allum      = '\n\x1b[47m\x1b[30m\x1b[1m\x1b[5m|||||||||||\x1b[0m\n'
let   nbMatches  = 11
let   turn       = 0
let   match      = 0
let   error      = false
let   difficulty = false
let   level, question
const readLine   = require('readline')
const rL         = readLine.createInterface({
	input : process.stdin,
	output: process.stdout
})

/**
 * FUNCTIONS
 */

/**
 * Error handling
 * @param  {string}  answer Input that the user write in the terminal
 * @return {boolean}        True if an error is found, else false
 */
function handleErrors(answer)
{
	if (question === '\x1b[4mDifficulty\x1b[0m (\x1b[1measy\x1b[0m, '
		+ '\x1b[1mmedium\x1b[0m or \x1b[1mhard\x1b[0m): '
		&& (answer !== 'easy' && answer !== 'medium' && answer !== 'hard')){
		console.log('\x1b[31mError: invalid input (easy, medium or hard '
			+ 'expected\x1b[0m')
		return true
	} else if (question === '\x1b[36m\x1b[4mMatches:\x1b[0m ') {
		if (answer < 0 || !answer.match(/[0-9]+/) || answer === '') {
			console.log('\x1b[33mError: invalid input (positive number '
				+ 'expected)\x1b[0m')
			return true
		} else if (answer < 1) {
			console.log('\x1b[33mError: you have to remove at least one match'
				+ '\x1b[0m')
			return true
		} else if (answer > 11 || (nbMatches < 3 && answer > nbMatches)) {
			console.log('\x1b[33mError: not enough matches\x1b[0m')
			return true
		} else if (answer > 3) {
			console.log('\x1b[33mError: you have to remove between only one '
				+ 'and three matches\x1b[0m')
			return true
		}
	} else {
		return false
	}
}

/**
 * Display the ending message according to the winner
 */
function winMessage()
{
	if (turn === 0) {
		console.log("\x1b[32mI lost... sniff... but I'll get you next time!!"
			+ "\x1b[0m\n")
	} else {
		console.log('\x1b[31mYou lost, too bad...\x1b[0m\n')
	}
}

/**
 * Display the starting message for the user
 */
function initPlayerTurn()
{
	if (difficulty === false) {
		question = '\x1b[4mDifficulty\x1b[0m (\x1b[1measy\x1b[0m, \x1b[1m'
			+ 'medium\x1b[0m or \x1b[1mhard\x1b[0m): '
	} else {
		question = '\x1b[36m\x1b[4mMatches:\x1b[0m '

		if (error === false) {
			console.log('\x1b[36m\x1b[4mYour turn:\x1b[0m')
		}
	}
}

/**
 * Player turn
 */
function playerTurn()
{
	rL.question(question, function (answer) {
		error = handleErrors(answer)

		if (!error) {
			if (difficulty === false) {
				level      = answer
				difficulty = true
			} else {
				answer     = Number(answer)
				match      = answer
				nbMatches -= match
				error      = false

				for (var i = 0; i < match; i++) {
					allum = allum.replace('|', ' ');
				}

				console.log('\n\x1b[36mPlayer removed \x1b[1m' + match 
					+ '\x1b[0m\x1b[36m match(es)\x1b[0m')

				turn  = 1
				match = 0
			}
		}
		
		recursiveAsyncReadLine()
	})
}

/**
 * Easy mode for the AI
 */
function easyMode()
{
	if (nbMatches <= 3) {
		match = Math.floor(Math.random() * (nbMatches - 1)) + 1
	} else {
		match = Math.floor(Math.random() * 3) + 1
	}
}

/**
 * Medium mode for the AI
 */
function mediumMode()
{
	if ((nbMatches - 2) % 4 === 0) {
		match = 1
	} else if ((nbMatches - 3) % 4 === 0) {
		match = 2
	} else if ((nbMatches - 4) % 4 === 0) {
		match = 3
	} else {
		match = Math.floor(Math.random() * 3) + 1
	}
}

/**
 * Hard mode for the AI
 */
function hardMode()
{
	if ((nbMatches - 2) % 4 === 0) {
		match = 1
	} else if ((nbMatches - 3) % 4 === 0) {
		match = 2
	} else if ((nbMatches - 4) % 4 === 0) {
		match = 3
	} else {
		match = 1
	}
}

/**
 * AI turn
 */
function AiTurn()
{
	if (level === 'easy') {
		easyMode()
	} else if (level === 'medium') {
		mediumMode()
	} else if (level === 'hard') {
		hardMode()
	}

	nbMatches -= match

	for (var i = 0; i < match; i++) {
		allum = allum.replace('|', ' ');
	}

	console.log("\x1b[35mAI's turn...\x1b[0m")
	console.log("\n\x1b[35mAI's removed \x1b[1m" + match + '\x1b[0m\x1b[35m '
		+ 'match(es)\x1b[0m')

	turn  = 0
	match = 0
}

/**
 * Recursive function which implements the others and that loops until there is
 *  a winner
 */
function recursiveAsyncReadLine()
{
	if (difficulty === true && error === false) {
		console.log(allum)
	}

	if (nbMatches <= 0) {
		winMessage()
		return rL.close()
	}

	if (turn === 0) {
		initPlayerTurn()
		playerTurn()
	} else {
		AiTurn()
		recursiveAsyncReadLine()
	}
}

/**
 * Launch of the script
 */
recursiveAsyncReadLine()