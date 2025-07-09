import { fireEvent, render, screen } from '@testing-library/angular';
import {
  Character,
  OpenDropdownComponent,
} from './mocks/open-dropdown.component';
import { IonDropdownProps } from './types';

const sut = async (props: Partial<IonDropdownProps<Character>> = {}) => {
  const { fixture } = await render(OpenDropdownComponent, {
    componentInputs: {
      ...props,
    },
  });

  return fixture;
};

const configuration = {
  shouldRender: true,
};

describe('IonDropdownDirective', () => {
  it('should be closed by default', async () => {
    await sut();

    expect(screen.queryByTestId('ion-dropdown')).not.toBeInTheDocument();
  });

  it('should open the dropdown when clicking the host', async () => {
    await sut({ dropdownConfig: configuration });
    fireEvent.click(screen.getByTestId('ion-button-open dropdown'));
    expect(screen.getByTestId('ion-dropdown')).toBeVisible();
  });

  it('should close the dropdown when clicking the host with the dropdown opened', async () => {
    jest.useFakeTimers();
    const fixture = await sut({ dropdownConfig: configuration });
    const openBtn = screen.getByTestId('ion-button-open dropdown');

    await fireEvent.click(openBtn);
    expect(screen.getByTestId('ion-dropdown')).toBeVisible();

    await fireEvent.click(openBtn);
    jest.runAllTimers();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(screen.queryByTestId('ion-dropdown')).not.toBeInTheDocument();
  });

  it('should not close on scroll by default', async () => {
    await sut({ dropdownConfig: configuration });
    fireEvent.click(screen.getByTestId('ion-button-open dropdown'));
    fireEvent.scroll(document);
    expect(screen.getByTestId('ion-dropdown')).toBeVisible();
  });

  it('should close on scroll when informed', async () => {
    await sut({
      dropdownConfig: {
        closeOnScroll: true,
        shouldRender: true,
      },
    });

    fireEvent.click(screen.getByTestId('ion-button-open dropdown'));
    fireEvent.scroll(document);

    expect(screen.queryByTestId('ion-dropdown')).not.toBeInTheDocument();
  });

  it('should open when there is a overlay without attachments', async () => {
    jest.useFakeTimers();

    const fixture = await sut({
      dropdownConfig: {
        shouldRender: true,
        closeOnScroll: true,
      },
    });

    const openBtn = screen.getByTestId('ion-button-open dropdown');

    await fireEvent.click(openBtn);
    expect(screen.getByTestId('ion-dropdown')).toBeVisible();

    fireEvent.scroll(document);
    await fireEvent.click(openBtn);

    jest.advanceTimersByTime(300);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(screen.getByTestId('ion-dropdown')).toBeVisible();
  });

  it('should close when clicking outside the dropdown', async () => {
    jest.useFakeTimers();
    const fixture = await sut({
      dropdownConfig: {
        shouldRender: true,
      },
    });

    fireEvent.click(screen.getByTestId('ion-button-open dropdown'));
    expect(screen.queryByTestId('ion-dropdown')).toBeInTheDocument();

    fireEvent.click(document.querySelector('.cdk-overlay-backdrop')!);
    jest.runAllTimers();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(screen.queryByTestId('ion-dropdown')).not.toBeInTheDocument();
  });

  it('should update the state of the dropdown', async () => {
    const fixture = await sut({ dropdownConfig: configuration });
    fixture.componentInstance.dropdownLoading = true;
    fireEvent.click(screen.getByTestId('ion-button-open dropdown'));
    expect(screen.getByTestId('ion-spinner')).toBeVisible();
    fixture.componentInstance.dropdownLoading = false;
    fixture.detectChanges();
    expect(screen.getByTestId('no-data-component')).toBeVisible();
  });
});
