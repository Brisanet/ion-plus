import { RenderResult, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { OutputEmitterRef } from '@angular/core';
import { SafeAny } from '../../utils/safe-any';
import { IonSidebarItemComponent } from './sidebar-item.component';
import { SidebarItem } from '../types';

const defaultTestId = 'ion-sidebar-item';
const defaultClass = 'ion-sidebar-item';
const emit = jest.fn();

const sut = async (
  props: Partial<SidebarItem> & { selectedChange?: OutputEmitterRef<boolean> }
): Promise<RenderResult<IonSidebarItemComponent, IonSidebarItemComponent>> => {
  const { selectedChange, ...rest } = props;

  return await render(IonSidebarItemComponent, {
    componentInputs: { ...rest },
    componentOutputs: { selectedChange },
  });
};

let detectChangesFn: () => void;

describe('SidebarItem', () => {
  it('should render sidebar item', async () => {
    await sut({});
    expect(screen.getByTestId(defaultTestId)).toBeInTheDocument();
  });
  it('should render a given text', async () => {
    const title = 'Título';
    await sut({ title });
    expect(screen.getByTestId(defaultTestId)).toHaveTextContent(title);
  });
  it('should render a given icon', async () => {
    const icon = 'pencil';
    await sut({ icon });
    expect(document.getElementById(`ion-icon-${icon}`)).toBeInTheDocument();
  });
  it('should render unselected by default', async () => {
    await sut({});
    expect(screen.getByTestId(defaultTestId)).toHaveClass(defaultClass);
  });
  it('should render selected when prop is passed as true', async () => {
    await sut({ selected: true });
    expect(screen.getByTestId(defaultTestId)).toHaveClass(
      `${defaultClass}--selected`
    );
  });
  it('should select on click', async () => {
    const { detectChanges } = await sut({
      selected: false,
      selectedChange: { emit } as SafeAny,
    });
    detectChangesFn = detectChanges;
    const element = screen.getByTestId(defaultTestId);
    await userEvent.click(element);
    detectChangesFn();
    expect(element).toHaveClass(`${defaultClass}--selected`);
  });
  it('should render disabled when prop is passed as true', async () => {
    await sut({ disabled: true });
    expect(screen.getByTestId(defaultTestId)).toBeDisabled();
  });
  it('should render block icon when disabled', async () => {
    await sut({ disabled: true });
    expect(document.getElementById('ion-icon-block')).toBeInTheDocument();
  });
  it('should emit an event when click', async () => {
    await sut({ selectedChange: { emit } as SafeAny });
    await userEvent.click(screen.getByTestId(defaultTestId));
    expect(emit).toHaveBeenCalled();
  });
});
