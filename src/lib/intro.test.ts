import { expect, it } from 'vitest';
import { yearSequence } from './intro';

it('années de 2020 à 2026', () => {
  expect(yearSequence(2020, 2026)).toEqual([2020, 2021, 2022, 2023, 2024, 2025, 2026]);
});
