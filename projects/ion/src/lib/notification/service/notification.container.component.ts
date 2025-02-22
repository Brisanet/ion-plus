import { Component, ComponentRef, ElementRef, Renderer2 } from '@angular/core';
import { IonNotificationComponent } from '../component/notification.component';

@Component({
  standalone: true,
  selector: 'ion-notification-container',
  template: '',
  styleUrls: ['notification.container.scss'],
})
export class IonNotificationContainerComponent {
  constructor(
    private renderer: Renderer2,
    private element: ElementRef
  ) {}

  addNotification(notification: ComponentRef<IonNotificationComponent>): void {
    notification.instance.ionOnClose.subscribe(() => {
      this.removeNotification(notification.location.nativeElement);
    });

    this.renderer.appendChild(
      this.element.nativeElement,
      notification.location.nativeElement
    );
  }

  removeNotification(notification: ElementRef): void {
    this.renderer.removeChild(this.element.nativeElement, notification);
  }
}
