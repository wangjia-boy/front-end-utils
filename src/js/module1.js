export default function moduleTest () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const obj1 = {a: 1}
      const obj2 = {b: 2}
      const result = {...obj1, ...obj2}
      resolve(result)
    }, 1000)
  })
}