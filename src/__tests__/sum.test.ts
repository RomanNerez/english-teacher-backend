function sum(a: number, b: number): number {
  return a + b;
}

test('sum works', () => {
  expect(sum(1, 2)).toBe(3);
});