const sum = (a: number, b: number) => a + b

setTimeout(() => {
  const a = sum(1, 2)
  console.log(a)
}, 5000)
