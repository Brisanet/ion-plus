import { Component } from '@angular/core';
import { IonAlertComponent } from '../alert.component';
import { NgStyle } from '@angular/common';

@Component({
  imports: [NgStyle, IonAlertComponent],
  template: `
    <div>
      <ion-alert [customBody]="BodyTemplate"></ion-alert>
      <ng-template #BodyTemplate>
        <div data-testid="ion-alert-custom-body">
          <p [ngStyle]="{ margin: 0 }">
            Custom
            <span [ngStyle]="{ 'font-weight': '700' }">Alert</span>
            message
          </p>
        </div>
      </ng-template>
    </div>
  `,
})
export class AlertCustomBodyComponent {}
