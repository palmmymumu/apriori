const ITEMS = ['A', 'B', 'C', 'D', 'E']
const INPUT = [['A', 'C', 'D'], ['B', 'C', 'E'], ['A', 'B', 'C', 'E'], ['B', 'E']]
const MIN = 50

let supports = []

console.log('Starting')

function getCombinations(chars) {
	let result = []
	let f = (prefix, chars) => {
		for (let i = 0; i < chars.length; i++) {
			result.push(prefix + chars[i])
			f(prefix + chars[i], chars.slice(i + 1))
		}
	}
	f('', chars)
	return result
}

function perm(xs) {
	let ret = []
	for (let i = 0; i < xs.length; i = i + 1) {
		let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)))
		if (!rest.length) {
			ret.push([xs[i]])
		} else {
			for (let j = 0; j < rest.length; j = j + 1) {
				ret.push([xs[i]].concat(rest[j]))
			}
		}
	}
	return ret
}

const COMBINATION = getCombinations(ITEMS)
console.log(COMBINATION)
console.log(COMBINATION.length)

function calcFrequent(trans) {
	return trans.map(tran => tran.join(''))
}

const inputString = calcFrequent(INPUT)
let frequent = []
COMBINATION.forEach(com => {
	inputString.forEach(input => {
		var match = true
		for (let i = 0; i < input.length; i++) {
			if (input.indexOf(com.slice(i, i + 1)) === -1) {
				match = false
			}
		}
		if (match) {
			if (typeof frequent[com] === 'undefined') frequent[com] = 1
			else frequent[com]++
		}
	})
})

Object.keys(frequent).map(com => {
	frequent[com] = (frequent[com] / INPUT.length) * 100
})

console.log(frequent)
console.log(Object.keys(frequent).length)

// console.log(supports)
// console.log(supports.length)
