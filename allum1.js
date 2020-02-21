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
let   allum     = '|||||||||||'
let   nbMatches = 11
let   turn      = 0
let   match     = 0
let   error     = false
const readLine  = require('readline')
const rL        = readLine.createInterface({
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
	if (answer < 0 || !answer.match(/[0-9]+/) || answer === '') {
		console.log('Error: invalid input (positive number expected)')
		return true
	} else if (answer < 1) {
		console.log('Error: you have to remove at least one match')
		return true
	} else if (answer > 11 || (nbMatches < 3 && answer > nbMatches)) {
		console.log('Error: not enough matches')
		return true
	} else if (answer > 3) {
		console.log('Error: you have to remove between only one and three '
			+ 'matches')
		return true
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
		console.log("I lost... sniff... but I'll get you next time!!\n")
	} else {
		console.log('You lost, too bad...\n')
	}
}

/**
 * Player turn
 */
function playerTurn()
{
	if (error === false) {
		console.log('Your turn:')
	}

	rL.question('Matches: ', function (answer) {
		error = handleErrors(answer)

		if (!error) {
			answer     = Number(answer)
			match      = answer
			nbMatches -= match

			for (var i = 0; i < match; i++) {
				allum = allum.replace('|', ' ');
			}

			console.log('Player removed ' + match + ' match(es)')

			turn  = 1
			match = 0
		}
		
		recursiveAsyncReadLine()
	})
}

/**
 * AI turn
 */
function AiTurn()
{
	if (nbMatches <= 3) {
		match = Math.floor(Math.random() * (nbMatches - 1)) + 1
	} else {
		match = Math.floor(Math.random() * 3) + 1
	}

	nbMatches -= match

	for (var i = 0; i < match; i++) {
		allum = allum.replace('|', ' ');
	}

	console.log("AI's turn...")
	console.log("AI's removed " + match + ' match(es)')

	turn  = 0
	match = 0
}

/**
 * Recursive function which implements the others and that loops until there is
 *  a winner
 */
function recursiveAsyncReadLine()
{
	if (error === false) {
		console.log(allum)
	}

	if (nbMatches <= 0) {
		winMessage()
		return rL.close()
	}

	if (turn === 0) {
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