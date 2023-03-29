import { saveAs } from 'file-saver';

export function exportState(state: object, fileName: string) {
  const json = JSON.stringify(state);
  const blob = new Blob([json], { type: 'application/json' });
  saveAs(blob, fileName + '.sil');
}