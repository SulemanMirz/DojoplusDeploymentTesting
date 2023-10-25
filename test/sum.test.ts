import { sumar } from './sum';

describe('Operaciones matemáticas', () => {
  test('Realizamos la suma', () => {
    expect(sumar(1, 1)).toBe(2);
  });
});
