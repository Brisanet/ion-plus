import { render, screen } from '@testing-library/angular';
import { IonTagComponent } from './tag.component';
import { IonIconComponent } from '../icon';
import { IonTagProps } from './types';

const tagDefault = {
  label: 'Texto aqui',
};

const tagStatus: IonTagProps['status'][] = [
  'info',
  'negative',
  'neutral',
  'success',
  'warning',
];

const tagIcon: IonTagProps['color'][] = [
  'access2',
  'alert',
  'box-plus',
  'car',
  'clip',
];

const tagColors = ['#be531c', '#ab2328', '#572d2d', '#6666ff', '#cc66ff'];

const sut = async (props: Partial<IonTagProps> = tagDefault) => {
  return await render(IonTagComponent, {
    imports: [IonIconComponent],
    componentInputs: { ...props },
  });
};

describe('<IonTagComponent />', () => {
  describe('Default value', () => {
    it('should render component with properties default', async () => {
      await sut();
      expect(screen.getByTestId('ion-tag')).toBeInTheDocument();
    });

    it('should render component with the correct label', async () => {
      await sut();
      expect(screen.getByTestId('ion-tag-label')).toHaveTextContent(
        tagDefault.label
      );
    });

    it('should render component with the default outline', async () => {
      await sut();
      expect(screen.getByTestId('ion-tag')).toHaveClass('outline');
    });
    it('should render component with the default status', async () => {
      await sut();
      expect(screen.getByTestId('ion-tag')).toHaveClass('neutral');
    });
  });
  describe('Property status', () => {
    it.each(tagStatus)('should render tag with status: %s', async status => {
      await sut({ ...tagDefault, status });
      expect(screen.getByTestId('ion-tag')).toHaveClass(status || '');
    });
  });
  describe('Property outline', () => {
    it('should render component with the outline true', async () => {
      await sut({ ...tagDefault, outline: true });
      expect(screen.getByTestId('ion-tag')).toHaveClass('outline');
    });
    it('should render component with the outline false', async () => {
      await sut({ ...tagDefault, outline: false });
      expect(screen.getByTestId('ion-tag')).not.toHaveClass('outline');
    });
  });
  describe('Property icon', () => {
    it.each(tagIcon)('should render tag with icon: %s', async icon => {
      await sut({ ...tagDefault, icon });
      const tagIconRendered = document.getElementById(`ion-icon-${icon}`);
      expect(tagIconRendered).toBeInTheDocument();
    });
  });
  describe('Property color', () => {
    it.each(tagColors)('should render tag with color: %s', async color => {
      await sut({ ...tagDefault, color });
      expect(screen.getByTestId('ion-tag')).toHaveStyle(
        `background: ${color}1A;`
      );
      expect(screen.getByTestId('ion-tag-label')).toHaveStyle(
        `color: ${color};`
      );
    });
  });
});
