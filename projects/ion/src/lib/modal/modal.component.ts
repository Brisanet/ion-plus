import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { IonAlertComponent } from '../alert';
import { IonButtonComponent } from '../button';
import { ModalStateService } from './modal-state.service';
import { Action } from './types';

@Component({
  standalone: true,
  imports: [CommonModule, IonButtonComponent, IonAlertComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonModalComponent {
  public readonly modalRef = inject(DialogRef);
  private readonly modalState = inject(ModalStateService);
  public content = viewChild.required('content', { read: ViewContainerRef });
  public action = output<Action>();

  get configuration() {
    return this.modalState.getState();
  }

  public onHeaderAction() {
    this.action.emit('onHeaderAction');
  }

  public closeModal(action: Action) {
    this.action.emit(action);
    this.modalRef.close();
  }
}
