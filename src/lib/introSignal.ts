// Signal partagé entre l'intro et le hero : le hero s'anime quand l'intro libère l'écran
let done = false;
let listeners: Array<() => void> = [];

export function onIntroDone(cb: () => void): () => void {
  if (done) {
    cb();
    return () => {};
  }
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

export function markIntroDone(): void {
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
  listeners = [];
}

export function resetIntroSignal(): void {
  done = false;
  listeners = [];
}
