import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RenderResult, render, screen } from '@testing-library/angular';

import { IonInputDirective } from './input.directive';

@Component({
  template:
    '<input placeholder="ion-input" ionInput [invalid]="invalid" [disabled]="disabled">',
  imports: [CommonModule, IonInputDirective],
  standalone: true,
})
class TestHostComponent {
  @Input() invalid = false;
  @Input() disabled = false;
}

const sut = async (
  customProps?: Partial<TestHostComponent>
): Promise<RenderResult<TestHostComponent>> => {
  return await render(TestHostComponent, {
    componentProperties: { ...customProps },
  });
};

const getInput = () => screen.getByPlaceholderText('ion-input');

describe('IonInputDirective', () => {
  it('Should render the default input', async () => {
    await sut();
    expect(getInput()).toBeInTheDocument();
  });

  it('Should render the input with the invalid class', async () => {
    await sut({ invalid: true });
    expect(getInput()).toHaveClass('ion-input--invalid');
  });

  it('Should render the input with the disabled class', async () => {
    await sut({ disabled: true });
    expect(getInput()).toBeDisabled();
  });
});
