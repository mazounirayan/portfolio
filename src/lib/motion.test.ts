import { describe, expect, it } from 'vitest';
import { prefersReducedMotion, shouldPlayIntro } from './motion';

describe('shouldPlayIntro', () => {
  it('intro jouée si première visite', () => expect(shouldPlayIntro({ reduced: false, seen: false })).toBe(true));
  it('pas d’intro en mouvement réduit', () => expect(shouldPlayIntro({ reduced: true, seen: false })).toBe(false));
  it('pas d’intro si déjà vue', () => expect(shouldPlayIntro({ reduced: false, seen: true })).toBe(false));
});

describe('prefersReducedMotion', () => {
  it('lit la media query fournie', () => expect(prefersReducedMotion({ matches: true })).toBe(true));
  it('faux sans window ni media query', () => expect(prefersReducedMotion()).toBe(false));
});
