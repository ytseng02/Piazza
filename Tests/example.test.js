const sum = require('/example.js');

test('Make Sure that 9 + 11 equals 20', () => {
  expect(sum(9, 11)).toBe(20);
});
