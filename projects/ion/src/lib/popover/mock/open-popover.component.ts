import { Component } from '@angular/core';

import {
  IonButtonComponent,
  IonDividerComponent,
  IonIconComponent,
} from '../../../public-api';
import { IonPopoverDirective } from '../popover.directive';
import { PopoverPosition, PopoverTrigger } from '../types';

export const popoverStyleForStorybook = `
  ::ng-deep .ion-popover__sup-container--leftBottom,
  ::ng-deep .ion-popover__sup-container--leftCenter,
  ::ng-deep .ion-popover__sup-container--leftTop {
    margin-left: -12px !important;
    
    &:before, &:after {
      margin-left: 14px !important;
    }
  }
`;

@Component({
  selector: 'ion-open-popover',
  imports: [
    IonIconComponent,
    IonDividerComponent,
    IonButtonComponent,
    IonPopoverDirective,
  ],
  template: `
    <style>
      div {
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
    <div>
      <ion-button
        ionPopover
        [ionPopoverIcon]="ionPopoverIcon"
        [ionPopoverIconColor]="ionPopoverIconColor"
        [ionPopoverTitle]="ionPopoverTitle"
        [ionPopoverBody]="BodyTemplate"
        [ionPopoverIconClose]="ionPopoverIconClose"
        [ionPopoverPosition]="ionPopoverPosition"
        [ionPopoverActions]="ionPopoverActions"
        [ionPopoverTrigger]="ionPopoverTrigger"
        [ionPopoverCustomClass]="ionPopoverCustomClass"
        [label]="label">
      </ion-button>
      <ng-template #BodyTemplate> {{ ionPopoverBody }} </ng-template>
    </div>
  `,
  styles: [popoverStyleForStorybook],
})
export class OpenPopoverComponent {
  label = '';
  ionPopoverTitle = '';
  ionPopoverIconClose = false;
  ionPopoverIcon = '';
  ionPopoverPosition = PopoverPosition.BOTTOM_CENTER;
  ionPopoverTrigger = PopoverTrigger.DEFAULT;
  ionPopoverArrowPointAtCenter = false;
  ionPopoverIconColor = '';
  ionPopoverBody = '';
  ionPopoverCustomClass = '';
  ionPopoverActions = [
    { label: 'voltar', shape: 'normal', keepOpenAfterAction: false },
    { label: 'concluir', shape: 'normal', keepOpenAfterAction: false },
  ];
  ionPopoverKeep = false;
}
