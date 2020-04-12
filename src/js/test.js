export function randomID () {
	return Math.random().toString(36).substring(2)
}
export function change () {
	let a = 1, b = 2
	a ^= b
	b ^= a
	a ^= b
	console.log(a,b)
}
export function arrFill () {
	return Array(6).fill(8)
}
export function zheng (num) {
	return ~~num
	return num | 0
	return num >> 0
	return num ^ 0
}
export function qian (num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}