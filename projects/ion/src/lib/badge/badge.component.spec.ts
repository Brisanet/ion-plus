import { render, screen } from '@testing-library/angular';
import { IonBadgeComponent } from './badge.component';
import { IonBadgeProps } from './types';

const types: Array<IonBadgeProps['type']> = [
  'primary',
  'secondary',
  'neutral',
  'negative',
];

const status: Array<IonBadgeProps['status']> = [
  'positive',
  'negative',
  'info',
  'primary',
  'warning',
];

const sut = async (customProps: Partial<IonBadgeProps>): Promise<void> => {
  await render(IonBadgeComponent, {
    componentInputs: { ...customProps },
  });
};

describe('IonBadgeComponent', () => {
  describe('With value', () => {
    it.each(['text badge', 10, 30])(
      'should render a badge with label %s',
      async label => {
        await sut({ label });
        expect(screen.getByText(label)).toBeInTheDocument();
      }
    );

    it('should render 99+ when label is bigger than 99', async () => {
      await sut({ label: 1000 });
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it.each(types)('should correctly render badge %s types.', async type => {
      await sut({ label: type, type });
      expect(screen.getByTestId(`ion-badge-${type}`)).toHaveAttribute(
        'data-type',
        type
      );
    });
  });
  describe('With dot', () => {
    it('should render a dot badge by default', async () => {
      await sut({ dot: true });
      expect(screen.getByTestId('ion-dot-badge')).toBeVisible();
      expect(screen.getByTestId('ion-dot-badge')).toHaveStyle({
        width: '8px',
        height: '8px',
      });
    });

    it('should render a dot badge if dot is empty string', async () => {
      await sut({ dot: '' });
      expect(screen.getByTestId('ion-dot-badge')).toBeVisible();
    });

    it('should render a dot badge with icon when size is not xs', async () => {
      await sut({ dot: true, icon: 'heart', size: 'md' });
      const elementRendered = document.getElementById('ion-icon-heart');
      expect(elementRendered).toBeInTheDocument();
    });

    it('should not render a dot badge with icon when size is xs', async () => {
      await sut({ dot: true, icon: 'heart', size: 'xs' });
      const elementRendered = document.getElementById('ion-icon-heart');
      expect(elementRendered).toBe(null);
    });

    it('should render a dot badge with custom color', async () => {
      await sut({ dot: true, customColor: 'red' });
      const redRGB = 'rgb(255, 0, 0)';
      expect(screen.getByTestId('ion-dot-badge')).toHaveStyle({
        'background-color': redRGB,
      });
    });
    it('should render a label when has icon but size is xs', async () => {
      await sut({ dot: true, label: 'badge', size: 'xs', icon: 'heart' });
      expect(screen.getByText('badge')).toBeInTheDocument();
    });

    it.each(status)(
      'should correctly render dot badge %s status',
      async status => {
        await sut({ dot: true, label: status, status });
        expect(screen.getByTestId(`ion-dot-badge`)).toHaveAttribute(
          'dot-status',
          status
        );
      }
    );
  });
});
