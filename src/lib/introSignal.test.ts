import { beforeEach, expect, it, vi } from 'vitest';
import { markIntroDone, onIntroDone, resetIntroSignal } from './introSignal';

beforeEach(() => resetIntroSignal());

it('prévient les abonnés quand l’intro se termine', () => {
  const cb = vi.fn();
  onIntroDone(cb);
  expect(cb).not.toHaveBeenCalled();
  markIntroDone();
  expect(cb).toHaveBeenCalledOnce();
});

it('appelle tout de suite un abonné arrivé après la fin', () => {
  markIntroDone();
  const cb = vi.fn();
  onIntroDone(cb);
  expect(cb).toHaveBeenCalledOnce();
});
