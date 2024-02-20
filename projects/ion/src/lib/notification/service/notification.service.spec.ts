import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { fireEvent, screen } from '@testing-library/angular';
import { IonNotificationConfigOptions } from '..';
import { StatusType, statusColor } from '../../utils/statusTypes';
import { IonNotificationComponent } from '../component/notification.component';
import { IonNotificationContainerComponent } from './notification.container.component';
import { IonNotificationService } from './notification.service';

const NOTIFICATION_ICONS = {
  success: 'success-icon',
  info: 'info-icon',
  warning: 'warning-icon',
  negative: 'negative-icon',
};
const NOTIFICATION_TYPES = Object.keys(NOTIFICATION_ICONS);
const DEFAULT_NOTIFICATION_OPTIONS = {
  title: 'Titulo Padrão',
  message: 'Mensagem Padrão',
};

@Component({
  standalone: true,
  template: '<div></div>',
  imports: [IonNotificationContainerComponent, IonNotificationComponent],
})
class ContainerRefTestComponent {}

jest.setTimeout(1000);

describe('NotificationService', () => {
  let notificationService: IonNotificationService;
  const renderNotification = (
    options: Partial<IonNotificationConfigOptions> = {},
    closeEventCall?: () => void
  ) => {
    notificationService.success(
      DEFAULT_NOTIFICATION_OPTIONS.title,
      DEFAULT_NOTIFICATION_OPTIONS.message,
      options,
      closeEventCall
    );
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContainerRefTestComponent],
    }).compileComponents();

    notificationService = TestBed.inject(IonNotificationService);
  });

  it('should remove a notification', () => {
    renderNotification({ fixed: true });
    const removeNotification = screen.getByTestId('btn-remove');
    fireEvent.click(removeNotification);
    const elements = document.getElementsByTagName('ion-notification');
    expect(elements).toHaveLength(0);
  });

  it('should emit event when a notification is closed', () => {
    const closeEvent = jest.fn();
    renderNotification({ fixed: true }, closeEvent);
    const removeNotification = screen.getByTestId('btn-remove');
    fireEvent.click(removeNotification);
    expect(closeEvent).toHaveBeenCalledTimes(1);
  });

  it('should create a notification', () => {
    renderNotification();
    expect(screen.getByTestId('ion-notification')).toBeTruthy();
  });

  it.each(Object.keys(DEFAULT_NOTIFICATION_OPTIONS))(
    'should render a notification with default %s',
    key => {
      renderNotification();
      expect(
        screen.getByText(
          DEFAULT_NOTIFICATION_OPTIONS[
            key as keyof typeof DEFAULT_NOTIFICATION_OPTIONS
          ]
        )
      ).toBeInTheDocument();
    }
  );
});

describe('NotificationService -> notification types', () => {
  let notificationService: IonNotificationService;

  const NOTIFICATIONS_CALLS = {
    success: (): void => {
      notificationService.success('teste', 'teste', {}, () => {
        return true;
      });
    },
    info: (): void => {
      notificationService.info('teste', 'teste', {}, () => {
        return true;
      });
    },
    warning: (): void => {
      notificationService.warning('teste', 'teste', {}, () => {
        return true;
      });
    },
    negative: (): void => {
      notificationService.error('teste', 'teste', {}, () => {
        return true;
      });
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContainerRefTestComponent],
    }).compileComponents();

    notificationService = TestBed.inject(IonNotificationService);
  });

  it.each(NOTIFICATION_TYPES)('should create %s notification', async type => {
    NOTIFICATIONS_CALLS[type as keyof typeof NOTIFICATION_ICONS]();
    expect(screen.getByTestId('notification-icon')).toHaveClass(
      'ion-notification__icon'
    );
    expect(screen.getByTestId('notification-icon')).toHaveAttribute(
      'ng-reflect-color',
      statusColor[type as StatusType]
    );
  });

  it('should remove multiple notifications', async () => {
    const indexesToRemove = [1, 2, 0];
    Object.keys(NOTIFICATIONS_CALLS).forEach(type => {
      NOTIFICATIONS_CALLS[type as keyof typeof NOTIFICATION_ICONS]();
    });
    const elements = document.getElementsByTagName('ion-notification');
    const numberOfElements = elements.length;
    const closeButton = screen.getAllByTestId('btn-remove');
    indexesToRemove.forEach(item => {
      fireEvent.click(closeButton[item]);
    });
    expect(elements).toHaveLength(numberOfElements - indexesToRemove.length);
  });

  it.each(NOTIFICATION_TYPES)(
    'should add ionOnClose subscription when %s notification is created',
    async type => {
      notificationService.addCloseEventEmitter = jest.fn();
      NOTIFICATIONS_CALLS[type as keyof typeof NOTIFICATION_ICONS]();
      expect(notificationService.addCloseEventEmitter).toHaveBeenCalledTimes(1);
    }
  );
});
