import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { SafeAny } from '../utils/safe-any';
import { ModalStateService } from './modal-state.service';
import { IonModalComponent } from './modal.component';
import {
  Action,
  DialogConfiguration,
  ModalConfiguration,
  ModalResponse,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class IonModalService {
  private readonly dialog = inject(Dialog);
  private readonly modalState = inject(ModalStateService);
  private modalRef!: IonModalComponent;
  private modalSubscriber: Subject<ModalResponse> =
    new Subject<ModalResponse>();

  public open(
    component: Type<SafeAny>,
    configuration?: ModalConfiguration & DialogConfiguration
  ) {
    const dialogRef = this.dialog.open(IonModalComponent, {
      hasBackdrop: configuration?.showOverlay ?? true,
      disableClose: true,
      autoFocus: false,
    });

    if (dialogRef.componentInstance) {
      this.modalRef = dialogRef.componentInstance;
      const componentInstance = this.modalRef
        .content()
        .createComponent(component);

      if (configuration) {
        this.update(configuration);

        if (configuration.params) {
          this.setParamsToComponent(
            componentInstance?.instance,
            configuration?.params
          );
        }
      }

      dialogRef.keydownEvents.subscribe(event => {
        if (configuration && configuration.preventCloseOnEscKey) {
          if (event.key === 'Escape') {
            event.preventDefault();
            return;
          }
        }
        this.close();
      });

      this.modalRef.action.subscribe(event => {
        this.emitModalResponse(event, componentInstance.instance);
      });
    }

    return {
      id: dialogRef.id,
      observable: this.modalSubscriber.asObservable(),
    };
  }

  public close(): void {
    if (this.modalRef) {
      this.modalRef.closeModal('onClose');
    }
  }

  public closeById(id: string): void {
    const modalRef = this.dialog.getDialogById(id);

    if (modalRef) {
      modalRef.close();
    }
  }

  public closeAll(): void {
    this.dialog.closeAll();
  }

  public update(configuration: Partial<ModalConfiguration>): void {
    this.modalState.updateState(configuration);
  }
  private emitModalResponse(
    action: Action,
    instance?: Record<string, unknown>
  ): void {
    this.modalSubscriber.next({ action, instance });
  }

  private setParamsToComponent(instance: SafeAny, params: SafeAny): void {
    Object.assign(instance, params);
  }
}
