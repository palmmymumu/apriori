/************************************
  Pongsathorn Veeratumma
  5835512030
  11-03-2019
  [ https://fb.me/palmz.haxker ]
************************************/

Array.prototype.isSubset = function(arr) {
	let match = true
	arr.forEach(item => {
		if (this.indexOf(item) === -1) match = false
	})
	return match
}

const getCombinations = arr => {
	let result = []
	let f = (prefix, arr) => {
		for (let i = 0; i < arr.length; i++) {
			result.push(prefix.concat(arr[i]))
			f(prefix.concat(arr[i]), arr.slice(i + 1))
		}
	}
	f([], arr)
	return result
}

const getPermutations = arr => {
	let result = []
	arr.forEach(x => {
		arr.forEach(y => {
			let match = false
			for (let i = 0; i < x.length; i++) {
				if (y.indexOf(x.slice(i, i + 1).pop()) !== -1) match = true
			}
			if (!match) result.push({ x, y })
		})
	})
	return result
}

const getKey = arr => {
	return arr.sort((a, b) => a > b).join('')
}

const getVal = (arr, key) => {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].key == key) {
			return arr[i].val
		}
	}
	return 0
}

const makeFreq = (comb, input, min = 50) => {
	let freq = []
	comb.forEach(item => {
		const key = getKey(item)
		input.forEach(line => {
			if (line.isSubset(item)) {
				let match = false
				for (let i = 0; i < freq.length; i++) {
					if (freq[i].key === key) {
						freq[i].val += (1 / INPUT.length) * 100
						match = true
					}
				}
				if (!match) freq.push({ key, item, val: (1 / INPUT.length) * 100 })
			}
		})
	})
	return freq.filter(item => item.val >= MIN)
}

const makeStrong = (perm, freq, min = 50) => {
	let strong = []
	perm.forEach(item => {
		const { x, y } = item
		const freqA = getVal(freq, getKey(x.concat(y)))
		const freqB = getVal(freq, getKey(x))

		let val = Math.round((freqA / freqB) * 100) || 0
		strong.push({ x, y, val })
	})
	return strong.filter(item => item.val >= MIN)
}

const ITEMS = ['A', 'B', 'C', 'D', 'E']
const INPUT = [['A', 'C', 'D'], ['B', 'C', 'E'], ['A', 'B', 'C', 'E'], ['B', 'E']]
const MIN = 50

const COMBINATION = getCombinations(ITEMS)
const PERMUTATION = getPermutations(COMBINATION)

const freq = makeFreq(COMBINATION, INPUT, MIN)
const strong = makeStrong(PERMUTATION, freq, MIN)

console.log('Freq')
console.log(freq.map(x => `[${x.item.join()}] : ${x.val}%`).join('\n'))
console.log('========================\nStrong')
console.log(strong.map(x => `[${x.x.join()}] => [${x.y.join()}] : ${x.val}%`).join('\n'))

/************************************
  Pongsathorn Veeratumma
  5835512030
  11-03-2019
  [ https://fb.me/palmz.haxker ]
************************************/
