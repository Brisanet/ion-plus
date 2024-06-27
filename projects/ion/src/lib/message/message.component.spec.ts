import { CommonModule } from '@angular/common';
import { RenderResult, render, screen } from '@testing-library/angular';

import { IonIconComponent } from '../icon';
import { IonMessageComponent } from './message.component';
import { IonMessageProps, MessageStatusType } from './types';

const defaultValue: Partial<IonMessageProps> = {
  label: 'Message',
};

export const iconTypes: MessageStatusType[] = [
  'custom',
  'positive',
  'negative_alert',
  'negative_error',
  'warning',
  'info',
];

const sut = async (
  customProps: Partial<IonMessageProps> = defaultValue
): Promise<{
  fixture: RenderResult<IonMessageComponent>;
  element: HTMLElement;
}> => {
  const fixture = await render(IonMessageComponent, {
    componentInputs: customProps,
    imports: [CommonModule, IonIconComponent],
  });
  const element = fixture.fixture.nativeElement as HTMLElement;
  return {
    fixture,
    element,
  };
};

describe('MessageComponent', () => {
  it('should render the positive type as default', async () => {
    const { fixture, element } = await sut({
      ...defaultValue,
      type: 'positive',
    });
    fixture.detectChanges();
    expect(element.getAttribute('data-type')).toBe('positive');
  });

  it('should have a message', async () => {
    await sut();
    expect(screen.getAllByText(defaultValue.label!)).toHaveLength(1);
  });
});

describe('IonMessageComponent / Types', () => {
  it.each(iconTypes)('should render %s type', async type => {
    const { fixture, element } = await sut({
      ...defaultValue,
      type: type,
    });
    fixture.detectChanges();
    expect(element.getAttribute('data-type')).toBe(`${type}`);
  });
});
