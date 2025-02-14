import { Component } from '@angular/core';
import { IonButtonComponent } from '../../button';
import { IonNotificationService } from './../service/notification.service';

@Component({
  standalone: true,
  selector: 'ion-open-notification-button',
  imports: [IonButtonComponent],
  providers: [IonNotificationService],
  template: `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <ion-button
        class="ion-button"
        label="success"
        iconType="check"
        (ionOnClick)="notificationSuccess()"></ion-button>

      <ion-button
        class="ion-button"
        label="warning"
        type="dashed"
        iconType="exclamation"
        (ionOnClick)="notificationWarning()"></ion-button>

      <ion-button
        class="ion-button"
        label="info"
        type="secondary"
        iconType="info"
        (ionOnClick)="notificationInfo()"></ion-button>

      <ion-button
        class="ion-button"
        label="error"
        [danger]="true"
        iconType="close"
        (ionOnClick)="notificationError()"></ion-button>
      <div></div>
    </div>
  `,
  styles: [
    `
      .ion-button {
        /deep/ button {
          width: 150px !important;
        }
      }
    `,
  ],
})
export class IonOpenNotificationButtonComponent {
  constructor(private ionNotificationService: IonNotificationService) {}

  notificationSuccess(): void {
    this.ionNotificationService.success(
      'Title...',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    );
  }

  notificationWarning(): void {
    this.ionNotificationService.warning(
      'Title...',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    );
  }

  notificationInfo(): void {
    this.ionNotificationService.info(
      'Title...',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    );
  }

  notificationError(): void {
    this.ionNotificationService.error(
      'Title...',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    );
  }
}
