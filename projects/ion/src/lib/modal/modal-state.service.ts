import { Injectable, signal } from '@angular/core';
import { ModalConfiguration } from './types';

const DEFAULT_WIDTH = 500;

@Injectable({
  providedIn: 'root',
})
export class ModalStateService {
  private state = signal<ModalConfiguration>({
    title: 'Ion Modal',
    width: DEFAULT_WIDTH,
  });

  getState() {
    return this.state.asReadonly();
  }

  updateState(config: Partial<ModalConfiguration>) {
    this.state.update(prev => ({ ...prev, ...config }));
  }
}
