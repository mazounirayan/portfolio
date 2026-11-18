import { afterEach, describe, expect, it } from 'vitest';
import { assetPath } from './asset';

describe('assetPath', () => {
  afterEach(() => { process.env.NEXT_PUBLIC_BASE_PATH = ''; });

  it('préfixe avec le basePath', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/boucle';
    expect(assetPath('/photo_rayan.jpg')).toBe('/boucle/photo_rayan.jpg');
  });

  it('sans basePath', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '';
    expect(assetPath('cv/x.pdf')).toBe('/cv/x.pdf');
  });
});
