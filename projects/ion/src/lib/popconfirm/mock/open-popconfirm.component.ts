import { Component } from '@angular/core';
import { IonButtonComponent } from '../../button';
import { IonPopConfirmDirective } from '../public-api';

@Component({
  standalone: true,
  imports: [IonButtonComponent, IonPopConfirmDirective],
  template: `
    <style>
      div {
        height: 400px;
        display: flex;
        align-items: center;
      }
    </style>
    <div>
      <ion-button
        label="Open Popconfirm"
        ionPopConfirm
        ionConfirmText="Sim"
        ionCancelText="Não" />
    </div>
  `,
})
export class OpenPopconfirmComponent {}
