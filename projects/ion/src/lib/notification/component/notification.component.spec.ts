import { EventEmitter } from '@angular/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import { StatusType, statusColor } from '../../utils/statusTypes';
import { IonNotificationComponent } from './notification.component';
import { IonNotificationProps } from './types';

const defaultNotification = {
  title: 'Editado',
  message: 'cadastro',
  type: 'success' as StatusType,
};

const sut = async (
  customProps: IonNotificationProps = defaultNotification
): Promise<void> => {
  await render(IonNotificationComponent, {
    componentProperties: customProps,
  });
};

describe('IonNotificationComponent', () => {
  it('should show title', async () => {
    await sut();
    expect(screen.getByText(defaultNotification.title)).toBeInTheDocument();
  });

  it('should show message', async () => {
    await sut();
    expect(screen.getByText(defaultNotification.message)).toBeInTheDocument();
  });

  it('should render close icon', async () => {
    await sut();
    expect(document.getElementById(`ion-icon-close`)).toBeInTheDocument();
  });

  it('should render success icon by default', async () => {
    await sut({ title: 'Editado', message: 'cadastro' });
    expect(document.getElementById('ion-icon-check-solid')).toBeInTheDocument();
  });

  it('should render a custom icon', async () => {
    const icon = 'pencil';
    await sut({
      ...defaultNotification,
      icon,
    });
    expect(document.getElementById(`ion-icon-${icon}`)).toBeInTheDocument();
  });

  it('should render a custom icon in gray scale', async () => {
    const icon = 'star-solid';
    await sut({
      ...defaultNotification,
      icon,
      type: 'neutral',
    });
    expect(screen.getByTestId('notification-icon')).toHaveClass(
      'ion-notification__icon'
    );
  });

  it.only.each([
    {
      type: 'success',
      icon: 'check-solid',
    },
    {
      type: 'info',
      icon: 'info-solid',
    },
    {
      type: 'warning',
      icon: 'exclamation-solid',
    },
    {
      type: 'negative',
      icon: 'close-solid',
    },
    {
      type: 'neutral',
      icon: 'pencil',
    },
  ])('should render $type class and $icon icon', async ({ type, icon }) => {
    await sut({
      ...defaultNotification,
      type: type as StatusType,
      icon: icon,
    });
    expect(document.getElementById(`ion-icon-${icon}`)).toBeInTheDocument();
    expect(screen.getByTestId('notification-icon')).toHaveAttribute(
      'ng-reflect-color',
      statusColor[type as StatusType]
    );
  });

  it.each(['title', 'message'])(
    'should remove %s notification of screen',
    async () => {
      await sut();
      const btnRemove = screen.getByTestId('btn-remove');
      fireEvent.click(btnRemove);
      await sleep(1000);
      expect(screen.queryAllByText(defaultNotification.title)).toHaveLength(0);
    }
  );

  it('should not auto close when is fixed', async () => {
    await sut({ ...defaultNotification, fixed: true });
    await sleep(2000);
    expect(screen.queryAllByText(defaultNotification.message)).toHaveLength(1);
  });
});

describe('Time by words', () => {
  it('should emit event when call closeNotification function', async () => {
    const onCloseFunction = new EventEmitter<void>();
    await sut({
      ...defaultNotification,
      fixed: true,
      ionOnClose: onCloseFunction,
    });
    jest.spyOn(onCloseFunction, 'emit');
    const closeButton = document.getElementById(`ion-icon-close`);
    fireEvent.click(closeButton || new HTMLElement());
    expect(onCloseFunction.emit).toHaveBeenCalledTimes(1);
  });

  describe('Time by words', () => {
    it('should not has timer when is fixed and mouse enter', async () => {
      await sut({ ...defaultNotification, fixed: true });
      const notificationIcon = screen.getByTestId('ion-notification');
      fireEvent.mouseEnter(notificationIcon);
      expect(screen.queryAllByText(defaultNotification.message)).toHaveLength(
        1
      );
    });

    it('should remove component after 2s', async () => {
      await sut();
      await sleep(3000);
      expect(screen.queryAllByText(defaultNotification.message)).toHaveLength(
        0
      );
    });

    it('should not remove the component when on mouse enter', async () => {
      await sut();
      const notificationIcon = screen.getByTestId('ion-notification');
      fireEvent.mouseEnter(notificationIcon);
      await sleep(2000);
      expect(screen.queryAllByText(defaultNotification.message)).toHaveLength(
        1
      );
    });

    it('should not remove the component when on mouse leave by 500ms', async () => {
      await sut();
      const notificationIcon = screen.getByTestId('ion-notification');
      fireEvent.mouseEnter(notificationIcon);
      await sleep(1000);
      fireEvent.mouseLeave(notificationIcon);
      await sleep(500);
      expect(screen.queryAllByText(defaultNotification.message)).toHaveLength(
        1
      );
    });
  });
});

const sleep = (ms: number): Promise<unknown> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
