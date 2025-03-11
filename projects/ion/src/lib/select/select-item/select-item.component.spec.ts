import { render, screen } from '@testing-library/angular';

import { SafeAny } from '../../utils/safe-any';
import { IonSelectItemProps } from '../types';
import { ComponentFixture } from '@angular/core/testing';
import { IonSelectItemComponent } from './select-item.component';
import userEvent from '@testing-library/user-event';

const customLabel = 'Option 01';

const sut = async (
  customProps: IonSelectItemProps
): Promise<ComponentFixture<IonSelectItemComponent>> => {
  const { unselect, ...rest } = customProps;
  const { fixture } = await render(IonSelectItemComponent, {
    componentInputs: {
      ...rest,
    },
    componentOutputs: {
      unselect: unselect as SafeAny,
    },
  });

  return fixture;
};

describe('IonSelecItemComponent', () => {
  it('should correctly render a label', async () => {
    await sut({ label: customLabel });
    expect(screen.getByText(customLabel)).toBeTruthy();
  });

  it('should emit an event when clicking of the icon', async () => {
    const clickEvent = jest.fn();

    await sut({
      label: 'Option',
      disabled: false,
      unselect: {
        emit: clickEvent,
      },
    } as SafeAny);

    await userEvent.click(screen.getByTestId('ion-icon-close'));

    expect(clickEvent).toHaveBeenCalled();
  });

  describe('IonSelecItemComponent - disabled', () => {
    beforeEach(async () => {
      await sut({ label: customLabel, disabled: true });
    });

    it('should not render the remove button when disabled', async () => {
      expect(screen.queryByTestId('ion-icon-close')).not.toBeInTheDocument();
    });

    it('should have disabled class when informed', async () => {
      expect(screen.getByTestId('ion-select-item')).toHaveClass(
        'ion-select-item--disabled'
      );
    });
  });
});
