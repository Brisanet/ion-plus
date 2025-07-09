import { ComponentFixture } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';

import { DirectionType } from '../utils/commonTypes';
import { IonDividerComponent } from './divider.component';
import { IonDividerProps } from './types';

const ClassType = {
  text: 'ion-divider__text',
  vertical: 'ion-divider--vertical',
  horizontal: 'ion-divider--horizontal',
};

const defaultDivider: Partial<IonDividerProps> = {
  type: 'solid',
  direction: 'horizontal',
};

const sut = async (
  customProps?: Partial<IonDividerProps>
): Promise<ComponentFixture<IonDividerComponent>> => {
  const { fixture } = await render(IonDividerComponent, {
    componentInputs: customProps || { ...defaultDivider },
  });

  return fixture;
};

describe('IonDividerComponent', () => {
  it('should render divider with default', async () => {
    const divider = await sut({});
    expect(divider.nativeElement).toHaveAttribute('data-type', 'solid');
    expect(screen.getByTestId('hr')).toHaveClass(ClassType.horizontal);
  });

  it.each(['vertical', 'horizontal'] as DirectionType[])(
    'should render %s divider',
    async direction => {
      await sut({
        direction,
      });
      expect(screen.getByTestId('hr')).toHaveClass(ClassType[direction]);
    }
  );

  it.each(['vertical', 'horizontal'] as DirectionType[])(
    'should render %s divider dashed',
    async direction => {
      const divider = await sut({
        direction,
        type: 'dashed',
      });
      expect(divider.nativeElement).toHaveAttribute('data-type', 'dashed');
      expect(screen.getByTestId('hr')).toHaveClass(ClassType[direction]);
    }
  );

  it('should render vertical divider and not show text', async () => {
    await sut({
      direction: 'vertical',
      type: 'text',
      label: 'Label',
    });
    expect(screen.getByTestId('hr')).not.toHaveAttribute(
      'data-content',
      'Label'
    );
  });

  it('should render divider with Label', async () => {
    const label = 'I am a divider';
    await sut({
      type: 'text',
      label,
    });
    expect(screen.getByTestId('hr')).toHaveClass(ClassType.text);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should render horizontal divider dashed and not show text', async () => {
    await sut({
      type: 'dashed',
      label: 'Label',
    });
    expect(screen.getByTestId('hr')).not.toHaveAttribute(
      'data-content',
      'Label'
    );
  });
});
