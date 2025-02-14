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

describe('IonDropdownDirective', () => {
  it('should be closed by default', async () => {
    await sut();

    expect(screen.queryByTestId('ion-dropdown')).not.toBeInTheDocument();
  });

  it('should open the dropdown when clicking the host', async () => {
    await sut();
    fireEvent.click(screen.getByTestId('ion-button-open dropdown'));
    expect(screen.getByTestId('ion-dropdown')).toBeVisible();
  });

  it('should close the dropdown when clicking the host with the dropdown opened', async () => {
    await sut();
    const openBtn = screen.getByTestId('ion-button-open dropdown');
    fireEvent.click(openBtn);
    expect(screen.getByTestId('ion-dropdown')).toBeVisible();
    fireEvent.click(openBtn);
    expect(screen.queryByTestId('ion-dropdown')).not.toBeInTheDocument();
  });

  it('should not close on scroll by default', async () => {
    await sut();
    fireEvent.click(screen.getByTestId('ion-button-open dropdown'));
    fireEvent.scroll(document);
    expect(screen.getByTestId('ion-dropdown')).toBeVisible();
  });

  it('should close on scroll when informed', async () => {
    await sut({
      dropdownConfig: {
        closeOnScroll: true,
      },
    });

    fireEvent.click(screen.getByTestId('ion-button-open dropdown'));
    fireEvent.scroll(document);

    expect(screen.queryByTestId('ion-dropdown')).not.toBeInTheDocument();
  });

  it('should open when there is a overlay without attachments', async () => {
    await sut({
      dropdownConfig: {
        closeOnScroll: true,
      },
    });
    const openBtn = screen.getByTestId('ion-button-open dropdown');
    fireEvent.click(openBtn);
    fireEvent.scroll(document);
    fireEvent.click(openBtn);
    expect(screen.getByTestId('ion-dropdown')).toBeVisible();
  });

  it('should close when clicking outside the dropdown', async () => {
    const fixture = await sut();
    fireEvent.click(screen.getByTestId('ion-button-open dropdown'));
    fireEvent.click(document.querySelector('.cdk-overlay-backdrop')!);
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-dropdown')).not.toBeInTheDocument();
  });

  it('should update the state of the dropdown', async () => {
    const fixture = await sut();
    fixture.componentInstance.dropdownLoading = true;
    fireEvent.click(screen.getByTestId('ion-button-open dropdown'));
    expect(screen.getByTestId('ion-spinner')).toBeVisible();
    fixture.componentInstance.dropdownLoading = false;
    fixture.detectChanges();
    expect(screen.getByTestId('no-data-component')).toBeVisible();
  });
});
