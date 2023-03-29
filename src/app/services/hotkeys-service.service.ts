import { Injectable } from '@angular/core';
import { HotkeysService } from '@ngneat/hotkeys';
import { Observable } from 'rxjs';

//const shortcuts = ['shift.v', 'shift.tab', 'shift.g', 'shift.a', 'shift.r', 'shift.c', 'shift.s'] as const;

export const shortcuts = [
  { hotKey: 'meta.z', description: 'undo' },
  { hotKey: 'meta.shift.z', description: 'redo' },
  { hotKey: 'meta.shift.s', description: 'redo' },
] as const;

type Shortcut = typeof shortcuts[number]['hotKey'];

@Injectable({
  providedIn: 'root'
})
export class ShortcutsService {
  private shortcuts$ = new Map<Shortcut, Observable<KeyboardEvent>>();

  constructor(private hotkeys: HotkeysService) {
    shortcuts.forEach(shortcut => {
      this.shortcuts$.set(shortcut.hotKey, this.hotkeys.addShortcut({ keys: shortcut.hotKey }));
    });
  }

  public getShortcut(s: Shortcut) {
    return this.shortcuts$.get(s)!;
  }
}
