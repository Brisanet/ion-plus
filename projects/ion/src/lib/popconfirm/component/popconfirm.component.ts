import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Subject } from 'rxjs';
import { IonAlertComponent } from '../../alert';
import { IonButtonComponent } from '../../button';
import { IonDividerComponent } from '../../divider';
import { IonPopConfirmProps } from '../types';

@Component({
  standalone: true,
  selector: 'ion-popconfirm',
  imports: [
    CommonModule,
    IonAlertComponent,
    IonDividerComponent,
    IonButtonComponent,
  ],
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
})
export class IonPopConfirmComponent {
  public ionPopConfirmTitle = input<IonPopConfirmProps['ionPopConfirmTitle']>();
  public ionPopConfirmDesc = input<IonPopConfirmProps['ionPopConfirmDesc']>('');
  public ionPopConfirmType =
    input<IonPopConfirmProps['ionPopConfirmType']>('warning');
  public ionConfirmText =
    input<IonPopConfirmProps['ionConfirmText']>('Confirmar');
  public ionCancelText = input<IonPopConfirmProps['ionCancelText']>('Cancelar');

  readonly ionOnConfirm = new Subject<void>();
  readonly ionOnClose = new Subject<void>();

  onClickOutside(): void {
    this.close();
  }

  handleConfirm(): void {
    this.ionOnConfirm.next();
  }

  close(): void {
    this.ionOnClose.next();
  }
}
