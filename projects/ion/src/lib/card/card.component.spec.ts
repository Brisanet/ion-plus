import { ComponentFixture } from '@angular/core/testing';
import { IonCardProps } from './types';
import { IonCardComponent } from './card.component';
import { SafeAny } from '../utils/safe-any';
import { render, screen } from '@testing-library/angular';
import { BodyMockComponent } from './mock/body-mock.component';
import userEvent from '@testing-library/user-event';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<h1 data-testid="footerTest">Aqui é o footer</h1>`,
})
class FooterTestComponent {}

const sut = async (
  customProps: IonCardProps
): Promise<ComponentFixture<IonCardComponent>> => {
  const { cardEvents, ...rest } = customProps;

  const { fixture } = await render(IonCardComponent, {
    componentInputs: {
      configuration: { ...rest },
    },
    componentOutputs: {
      cardEvents: cardEvents as SafeAny,
    },
  });

  return fixture;
};

describe('CardComponent', () => {
  const cardEvents = jest.fn();
  beforeEach(async () => {
    await sut({
      header: {
        title: 'Card Title',
        buttons: [
          { type: 'secondary', label: 'Secondary', nameAction: 'secondary' },
        ],
      },
      body: BodyMockComponent,
      cardEvents: {
        emit: cardEvents,
      } as SafeAny,
      footer: {
        body: FooterTestComponent,
        buttons: {
          primary: { label: 'primary' },
        },
      },
    });
  });

  it('should render component', async () => {
    expect(screen.getByTestId('ion-card')).toBeInTheDocument();
  });

  it('should render body', async () => {
    expect(screen.getByTestId('ion-card-body')).toBeInTheDocument();
  });

  it('should render footer', async () => {
    expect(screen.getByTestId('ion-card-footer')).toBeInTheDocument();
  });

  it('should emit event when button is clicked', async () => {
    const headerTitle = screen.getByTestId('ion-card-header-title');
    expect((headerTitle.textContent as string).trim()).toBe('Card Title');

    await userEvent.click(screen.getByTestId('ion-button-Secondary'));
    expect(cardEvents).toHaveBeenCalledWith({ buttonAction: 'secondary' });
  });

  it('should not render icon if its not passed', async () => {
    expect(screen.queryByTestId('icon-title')).toBeNull();
  });
});
