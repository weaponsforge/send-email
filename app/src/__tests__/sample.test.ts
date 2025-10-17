import { test, expect } from 'vitest'

const greet = (str: string): string => {
  console.log(str)
  return 'hello'
}

test('greet', () => {
  const message = greet('World')
  expect(message).toBeTypeOf('string')
})
