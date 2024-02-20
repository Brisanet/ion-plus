import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() ionPopConfirmTitle!: IonPopConfirmProps['ionPopConfirmTitle'];
  @Input() ionPopConfirmDesc: IonPopConfirmProps['ionPopConfirmDesc'];
  @Input() ionPopConfirmType: IonPopConfirmProps['ionPopConfirmType'] =
    'warning';
  @Input() ionConfirmText: IonPopConfirmProps['ionConfirmText'] = 'Confirmar';
  @Input() ionCancelText: IonPopConfirmProps['ionCancelText'] = 'Cancelar';

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
