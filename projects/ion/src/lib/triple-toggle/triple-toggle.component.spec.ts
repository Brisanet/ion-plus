import { fireEvent, render, screen } from '@testing-library/angular';
import { SafeAny } from '../utils/safe-any';
import { IonTripleToggleComponent } from './triple-toggle.component';
import type { IonTripleToggleProps } from './types';

const tripleToggleId = 'ion-triple-toggle';
const firstOptionId = 'ion-button-Sim';
const middleOptionId = 'ion-button--';
const lastOptionId = 'ion-button-Não';
const selectedOption = 'ion-btn--primary';
const notSelectedOption = 'ion-btn--secondary';

const clickEvent = jest.fn();

const sut = async (
  customProps: Partial<IonTripleToggleProps> = {}
): Promise<SafeAny> => {
  const { valueChange, ...rest } = customProps;
  return await render(IonTripleToggleComponent, {
    componentInputs: rest,
    componentOutputs: { valueChange },
  });
};

describe('IonTripleToggleComponent', () => {
  describe('component basics', () => {
    beforeEach(async () => {
      await sut({
        valueChange: {
          emit: clickEvent,
        } as SafeAny,
      });
    });
    it('should render triple toggle', async () => {
      expect(screen.getByTestId(tripleToggleId)).toBeInTheDocument();
    });
    it('should render middle option selected', async () => {
      expect(screen.getByTestId(middleOptionId)).toHaveClass(selectedOption);
    });
    it('should render first and last option not selected', async () => {
      expect(screen.getByTestId(firstOptionId)).not.toHaveClass(
        'ion-btn-primary'
      );
      expect(screen.getByTestId(lastOptionId)).not.toHaveClass(
        'ion-btn-primary'
      );
    });
    it('should select when clicked', async () => {
      const firstOption = screen.getByTestId(firstOptionId);
      fireEvent.click(firstOption);
      expect(screen.getByTestId(firstOptionId)).toHaveClass(selectedOption);
    });

    it('should show default options when has not custom options applied', async () => {
      expect(screen.getByTestId(firstOptionId)).toHaveClass(notSelectedOption);
      expect(screen.getByTestId(middleOptionId)).toHaveClass(selectedOption);
      expect(screen.getByTestId(lastOptionId)).toHaveClass(notSelectedOption);
    });
  });

  describe('component with variants', () => {
    it('should render disabled options on triple toggle', async () => {
      await sut({ disabled: true });
      expect(screen.getByTestId(firstOptionId)).toBeDisabled();
      expect(screen.getByTestId(middleOptionId)).toBeDisabled();
      expect(screen.getByTestId(lastOptionId)).toBeDisabled();
    });

    const options = [firstOptionId, middleOptionId, lastOptionId];

    it.each(options)('should not emit event when disabled', async option => {
      await sut({
        disabled: true,
        valueChange: {
          emit: clickEvent,
        } as SafeAny,
      });
      const element = screen.getByTestId(option);
      fireEvent.click(element);
      expect(clickEvent).not.toHaveBeenCalled();
    });

    it.each(options)(
      'should emit one event when click at %s option',
      async option => {
        await sut({
          valueChange: {
            emit: clickEvent,
          } as SafeAny,
        });
        const element = screen.getByTestId(option);
        fireEvent.click(element);
        expect(clickEvent).toHaveBeenCalledTimes(1);
      }
    );

    it('should show the selected option when started with it', async () => {
      const customProps: Partial<IonTripleToggleProps> = {
        value: true,
      };
      await sut(customProps);
      expect(screen.getByTestId(firstOptionId)).toHaveClass(selectedOption);
    });

    it('should show selected middle option when none option are selected initially', async () => {
      await sut({
        options: [
          {
            label: 'Sim',
            value: true,
          },
          {
            label: 'Não',
            value: false,
          },
        ],
      });
      expect(screen.getByTestId(middleOptionId)).toHaveClass(selectedOption);
    });
  });

  afterEach(() => {
    const middleOption = screen.getByTestId(middleOptionId);
    fireEvent.click(middleOption);
    clickEvent.mockClear();
  });
});
