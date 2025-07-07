import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import {
  IonPositions,
  PopoverDirectiveProps,
  PopoverTrigger,
} from '../../../public-api';
import { OpenPopoverComponent } from './mock/open-popover.component';

const sut = async (props: PopoverDirectiveProps) => {
  const { fixture } = await render(OpenPopoverComponent, {
    componentInputs: {
      ...props,
    },
  });

  return fixture;
};

describe('Directive: popover', () => {
  describe('popover', () => {
    beforeEach(async () => {
      await sut({
        ionPopoverTitle: 'Titulo do Popover',
        ionPopoverBody: null,
        ionPopoverIcon: '',
        ionPopoverIconColor: '',
        ionPopoverIconClose: true,
        ionPopoverPosition: IonPositions.TOP_RIGHT,
        ionPopoverKeep: false,
        ionPopoverCustomClass: 'custom-class',
      });
    });

    it('should render without popover', async () => {
      expect(screen.queryByTestId('ion-popover')).not.toBeInTheDocument();
    });
    it('should create popover', async () => {
      await userEvent.click(screen.getByTestId('ion-button-'));
      expect(screen.queryByTestId('ion-popover')).toBeInTheDocument();
    });

    it('should close popover when click outside', async () => {
      await userEvent.click(screen.getByTestId('ion-button-'));
      await userEvent.dblClick(document.body);
      expect(screen.queryByTestId('ion-popover')).toBeNull();
    });

    it.each([
      { dataTestId: 'ion-button-close', label: 'popover-close-button' },
      { dataTestId: 'ion-button-voltar', label: 'voltar' },
      { dataTestId: 'ion-button-concluir', label: 'concluir' },
    ])('should close pop when click in $label', async type => {
      await userEvent.click(screen.getByTestId('ion-button-'));
      await userEvent.click(screen.getByTestId(`${type.dataTestId}`));
      expect(screen.queryByTestId('ion-popover')).toBeNull();
    });

    it('should render popover with custom class', async () => {
      await userEvent.click(screen.getByTestId('ion-button-'));
      const popover = screen.getByTestId('ion-popover');
      expect(popover).toHaveClass('custom-class');
    });
  });

  describe('popvoer: keepOpen', () => {
    it('should not close popover when click outside', async () => {
      await sut({
        ionPopoverTitle: '',
        ionPopoverBody: null,
        ionPopoverIcon: '',
        ionPopoverIconColor: '',
        ionPopoverIconClose: false,
        ionPopoverPosition: IonPositions.TOP_RIGHT,
        ionPopoverKeep: true,
      });

      await userEvent.click(screen.getByTestId('ion-button-'));
      await userEvent.dblClick(document.body);
      expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
    });
  });

  describe('event: scroll', () => {
    beforeEach(async () => {
      await sut({
        ionPopoverTitle: 'Titulo do Popover',
        ionPopoverBody: null,
        ionPopoverIcon: '',
        ionPopoverIconColor: '',
        ionPopoverIconClose: false,
        ionPopoverPosition: IonPositions.TOP_RIGHT,
        ionPopoverKeep: false,
        ionPopoverCustomClass: 'custom-class',
      });
    });

    it('should not close the popover when scrolling the popover', async () => {
      await userEvent.click(screen.getByTestId('ion-button-'));
      fireEvent.scroll(document);
      expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
    });

    it('should close the popover when scrolling the page', async () => {
      const hostElement = screen.getByTestId('ion-button-');
      await userEvent.click(hostElement);
      fireEvent.wheel(hostElement);
      expect(screen.queryByTestId('ion-popover')).not.toBeInTheDocument();
    });
  });

  describe('popover: positions', () => {
    it.each(Object.values(IonPositions))(
      'should render the popover in position %s',
      async ionPopoverPosition => {
        await sut({
          ionPopoverTitle: 'titulo',
          ionPopoverBody: null,
          ionPopoverIcon: '',
          ionPopoverIconColor: '',
          ionPopoverIconClose: true,
          ionPopoverPosition: ionPopoverPosition,
          ionPopoverKeep: false,
        });
        await userEvent.click(screen.getByTestId('ion-button-'));
        expect(screen.getByTestId('ion-popover')).toHaveClass(
          `ion-popover__sup-container--${ionPopoverPosition}`
        );
        userEvent.click(screen.getByTestId('ion-button-close'));
      }
    );
  });

  describe('trigger: hover', () => {
    beforeEach(async () => {
      await sut({
        ionPopoverTitle: 'Titulo do Popvoer',
        ionPopoverBody: null,
        ionPopoverIcon: '',
        ionPopoverIconColor: '',
        ionPopoverIconClose: false,
        ionPopoverPosition: IonPositions.TOP_RIGHT,
        ionPopoverKeep: false,
        ionPopoverTrigger: PopoverTrigger.HOVER,
      });
    });
    afterEach(async () => {
      fireEvent.mouseLeave(screen.getByTestId('ion-button-'));
    });

    it('should open popover when mouseEnter when trigger is hover', async () => {
      await userEvent.hover(screen.getByTestId('ion-button-'));
      expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
    });

    it('should remove popover when mouseLeave on element when trigger is hover', async () => {
      await userEvent.hover(screen.getByTestId('ion-button-'));
      expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
      await userEvent.unhover(screen.getByTestId('ion-button-'));
      expect(screen.queryByTestId('ion-popover')).not.toBeInTheDocument();
    });
  });
});
