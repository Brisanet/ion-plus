import { Component, input } from '@angular/core';

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
  standalone: true,
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
        height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
    <div>
      <ion-button
        ionPopover
        [ionPopoverIcon]="ionPopoverIcon()"
        [ionPopoverIconColor]="ionPopoverIconColor()"
        [ionPopoverTitle]="ionPopoverTitle()"
        [ionPopoverBody]="BodyTemplate"
        [ionPopoverIconClose]="ionPopoverIconClose()"
        [ionPopoverPosition]="ionPopoverPosition()"
        [ionPopoverActions]="ionPopoverActions()"
        [ionPopoverTrigger]="ionPopoverTrigger()"
        [ionPopoverKeep]="ionPopoverKeep()"
        [ionPopoverCustomClass]="ionPopoverCustomClass()"
        [label]="label()">
      </ion-button>
      <ng-template #BodyTemplate> {{ ionPopoverBody() }} </ng-template>
    </div>
  `,
  styles: [popoverStyleForStorybook],
})
export class OpenPopoverComponent {
  label = input('');
  ionPopoverTitle = input('');
  ionPopoverIconClose = input(false);
  ionPopoverIcon = input('');
  ionPopoverPosition = input(PopoverPosition.BOTTOM_CENTER);
  ionPopoverTrigger = input(PopoverTrigger.DEFAULT);
  ionPopoverArrowPointAtCenter = input(false);
  ionPopoverIconColor = input('');
  ionPopoverBody = input('');
  ionPopoverCustomClass = input('');
  ionPopoverActions = input([
    { label: 'voltar', shape: 'normal', keepOpenAfterAction: false },
    { label: 'concluir', shape: 'normal', keepOpenAfterAction: false },
  ]);
  ionPopoverKeep = input(false);
}
