import { expect, it } from 'vitest';
import { computeLoopJump } from './loop';

it('saute en haut en fin de page', () => expect(computeLoopJump({ scrollY: 999, maxScroll: 1000, reduced: false })).toBe(0));
it('pas de saut avant la fin', () => expect(computeLoopJump({ scrollY: 500, maxScroll: 1000, reduced: false })).toBeNull());
it('jamais en mouvement réduit', () => expect(computeLoopJump({ scrollY: 1000, maxScroll: 1000, reduced: true })).toBeNull());
it('seuil personnalisable', () => expect(computeLoopJump({ scrollY: 990, maxScroll: 1000, reduced: false, threshold: 20 })).toBe(0));
it('page trop courte pour boucler', () => expect(computeLoopJump({ scrollY: 0, maxScroll: 0, reduced: false })).toBeNull());
