import { ComponentFixture } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { IonAlertComponent, alertIconTypes } from './alert.component';
import { AlertCustomBodyComponent } from './mocks/alert-custom-body.component';
import { IonAlertProps, IonAlertStatus } from './types';

const types: Array<IonAlertStatus> = ['info', 'negative', 'success', 'warning'];

const defaultAlertConfig = {
  message: 'Alert message',
};

const sut = async (
  customProps: Partial<IonAlertProps>
): Promise<ComponentFixture<IonAlertComponent>> => {
  const { fixture } = await render(IonAlertComponent, {
    componentInputs: { ...customProps },
  });

  return fixture;
};

describe('IonAlertComponent', () => {
  it('should render the alert', async () => {
    await sut(defaultAlertConfig);
    expect(screen.getByTestId('ion-alert')).toBeInTheDocument();
  });
  it.each(types)('should render %s type', async (type: IonAlertStatus) => {
    const { nativeElement } = await sut({
      ...defaultAlertConfig,
      type,
    });
    expect(nativeElement).toHaveAttribute('data-type', type);
  });
  it.each(Object.entries(alertIconTypes))(
    'should render %s alert icon',
    async (alertType, iconType) => {
      await sut({ ...defaultAlertConfig, type: alertType as IonAlertStatus });
      expect(screen.queryByTestId(`alert-icon-${iconType}`)).toBeVisible();
    }
  );
  it('should render without the background when informed', async () => {
    await sut({
      ...defaultAlertConfig,
      hideBackground: true,
    });
    expect(screen.getByTestId('ion-alert')).toHaveClass(
      'ion-alert--no-background'
    );
  });
  it('should render without border radius when informed', async () => {
    await sut({
      ...defaultAlertConfig,
      noRadius: true,
    });
    expect(screen.getByTestId('ion-alert')).toHaveClass('ion-alert--no-radius');
  });

  describe('IonAlertComponent - Closable alert', () => {
    const closableAlert = {
      ...defaultAlertConfig,
      closable: true,
    };
    it('should render closable alert', async () => {
      await sut(closableAlert);
      expect(screen.getByTestId('close-icon')).toBeVisible();
    });
    it.each(types)(
      'should render closable %s type',
      async (type: IonAlertStatus) => {
        const { nativeElement } = await sut({
          ...closableAlert,
          type,
        });
        expect(nativeElement).toHaveAttribute('data-type', type);
        expect(screen.getByTestId('close-icon')).toBeVisible();
      }
    );
    it('should close alert', async () => {
      await sut(closableAlert);
      const closeIcon = screen.getByTestId('close-icon');
      fireEvent.click(closeIcon);
      expect(screen.queryByTestId('ion-alert')).not.toBeInTheDocument();
    });
  });

  describe('IonAlertComponent - Whith plain text provided', () => {
    it('should render with the alert message', async () => {
      const description = 'Alert description';
      await sut({ ...defaultAlertConfig, description });
      expect(screen.getByText(description)).toBeVisible();
    });
  });
  describe('IonAlertComponent - Whith a custom body provided', () => {
    beforeEach(async () => {
      await render(AlertCustomBodyComponent);
    });
    it('should render with the custom body provided', async () => {
      expect(screen.getByTestId('ion-alert-custom-body')).toBeVisible();
    });
    it('should not render the default alert message', async () => {
      expect(screen.queryByTestId('ion-alert-message')).not.toBeInTheDocument();
    });
  });
});
