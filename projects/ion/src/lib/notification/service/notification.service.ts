import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Inject,
  Injectable,
  createComponent,
} from '@angular/core';
import { Subject } from 'rxjs';
import { IonNotificationConfigOptions } from '..';
import { StatusType } from '../../utils/statusTypes';
import { SafeAny } from './../../utils/safe-any';
import { IonNotificationComponent } from './../component/notification.component';
import { IonNotificationContainerComponent } from './notification.container.component';

enum NOTIFICATION_TYPES {
  success = 'success',
  info = 'info',
  warning = 'warning',
  negative = 'negative',
}

@Injectable({
  providedIn: 'root',
})
export class IonNotificationService {
  private notificationContainerComponentRef!: ComponentRef<IonNotificationContainerComponent>;
  private componentSubscriber!: Subject<SafeAny>;

  constructor(
    @Inject(DOCUMENT) private document: SafeAny,
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  public success(
    title: string,
    message: string,
    options?: Partial<IonNotificationConfigOptions>,
    closeEventCall?: () => void
  ): void {
    this.showNotification(
      title,
      message,
      options,
      NOTIFICATION_TYPES.success,
      closeEventCall ? closeEventCall : undefined
    );
  }

  public info(
    title: string,
    message: string,
    options?: Partial<IonNotificationConfigOptions>,
    closeEventCall?: () => void
  ): void {
    this.showNotification(
      title,
      message,
      options,
      NOTIFICATION_TYPES.info,
      closeEventCall ? closeEventCall : undefined
    );
  }

  public warning(
    title: string,
    message: string,
    options?: Partial<IonNotificationConfigOptions>,
    closeEventCall?: () => void
  ): void {
    this.showNotification(
      title,
      message,
      options,
      NOTIFICATION_TYPES.warning,
      closeEventCall ? closeEventCall : undefined
    );
  }

  public error(
    title: string,
    message: string,
    options?: Partial<IonNotificationConfigOptions>,
    closeEventCall?: () => void
  ): void {
    this.showNotification(
      title,
      message,
      options,
      NOTIFICATION_TYPES.negative,
      closeEventCall ? closeEventCall : undefined
    );
  }

  addCloseEventEmitter(
    notification: ComponentRef<IonNotificationComponent>,
    closeEvent: () => void
  ): void {
    notification.instance.ionOnClose.subscribe(() => {
      closeEvent();
    });
  }

  private createComponentView(
    viewRef: ComponentRef<IonNotificationContainerComponent>
  ): void {
    this.appRef.attachView(viewRef.hostView);
    viewRef.changeDetectorRef.detectChanges();

    const notificationElement = viewRef.location.nativeElement;
    this.document.body.appendChild(notificationElement);

    this.componentSubscriber = new Subject<SafeAny>();
    this.componentSubscriber.asObservable();
  }

  private createNotificationContainer(): void {
    const containerRef = createComponent(IonNotificationContainerComponent, {
      environmentInjector: this.injector,
    });

    this.notificationContainerComponentRef = containerRef;

    this.createComponentView(this.notificationContainerComponentRef);
  }

  private createNotificationInstance(): ComponentRef<IonNotificationComponent> {
    return createComponent(IonNotificationComponent, {
      environmentInjector: this.injector,
    });
  }

  private showNotification(
    title: string,
    message: string,
    options?: Partial<IonNotificationConfigOptions>,
    type: StatusType = 'success',
    closeEventCall?: () => void
  ): void {
    if (!this.notificationContainerComponentRef)
      this.createNotificationContainer();

    const notification = this.createNotificationInstance();

    this.configNotification(notification, title, message, options, type);

    this.instanceNotification(notification);

    if (closeEventCall) {
      this.addCloseEventEmitter(notification, closeEventCall);
    }
  }

  private configNotification(
    notification: ComponentRef<IonNotificationComponent>,
    title: string,
    message: string,
    options?: Partial<IonNotificationConfigOptions>,
    type: StatusType = 'success'
  ): void {
    notification.setInput('title', title);
    notification.setInput('message', message);
    notification.setInput('type', type);

    if (options) {
      Object.keys(options).forEach(key => {
        const keyName = key as keyof IonNotificationConfigOptions;
        notification.setInput(keyName, options[keyName]);
      });
    }
  }

  private instanceNotification(
    notification: ComponentRef<IonNotificationComponent>
  ): void {
    notification.hostView.detectChanges();
    notification.changeDetectorRef.detectChanges();

    this.notificationContainerComponentRef.instance.addNotification(
      notification
    );

    this.notificationContainerComponentRef.changeDetectorRef.detectChanges();

    return this.componentSubscriber.next(void 0);
  }
}
