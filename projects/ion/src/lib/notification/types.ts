import { OutputEmitterRef } from '@angular/core';
import { IconType } from '../icon';
import { fadeInDirection, fadeOutDirection } from '../utils/animationsTypes';
import { StatusType } from '../utils/statusTypes';

export interface IonNotificationProps extends IonNotificationConfigOptions {
  /**
   * Notification title.
   * @param title - Title that will be displayed on the notification
   * @type {string}
   * @example
   * <ion-notification title = `Notification title` />
   */
  title: string;

  /**
   * Notification message.
   * @param message - Message that will be displayed on the notification
   * @type {string}
   * @example
   * <ion-notification message = `Content of notification message` />
   */
  message: string;

  /**
   * Notification type.
   * @param type - Defines the notification status style.
   * @type {'success' | 'info' | 'warning' | 'negative'}
   * @default `success`
   * @example
   * <ion-notification type = `success`/>
   */
  type: StatusType;
}

export interface IonNotificationConfigOptions {
  /**
   * Notification icon
   * @param icon - Name of an Ion icon that customize icon that appears at notification title.
   * @type {string}
   * @example
   * <ion-notification [icon]="'play'" />
   */
  icon?: IconType;

  /**
   * Notification fixed
   * @param fixed - Indicates that notification only disappear whether user click at close button.
   * @type {boolean}
   * @default false
   * @example
   * <ion-notification [fixed] = false />
   */
  fixed?: boolean;

  /**
   * Notification fade in direction
   * @param fadeIn - Indicates where effect of fade in direction should starts.
   * @type {`fadeIn` | `fadeInUp`  | `fadeInRigth`  | `fadeInLeft`  | `fadeInDown`}
   * @default 'fadeIn'
   * @example
   * <ion-notification [fadeIn] = 'fadeIn' />
   */
  fadeIn?: fadeInDirection;

  /**
   * Notification fade out direction
   * @param fadeOut - Indicates where effect of fade in direction should ends.
   * @type {`fadeOutUp`  | `fadeOutRigth`  | `fadeOutLeft`  | `fadeOutDown`  | `fadeOut`}
   * @default 'fadeOut'
   * @example
   * <ion-notification [fadeOut] = 'fadeOut' />
   */
  fadeOut?: fadeOutDirection;

  /**
   * Notification ionOnClose
   * @event IonNotificationComponent#ionOnClose - Event triggered when notification is closed.
   * @type {OutputEmitterRef<null>}
   * @description This event is emitted when the notificaion is closed.
   * @example
   * <ion-notification (ionOnClose) = "yourFunction()"/>
   */
  ionOnClose: OutputEmitterRef<void>;
}
