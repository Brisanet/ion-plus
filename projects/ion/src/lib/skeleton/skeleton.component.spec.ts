import { render, screen } from '@testing-library/angular';

import { IonSkeletonComponent } from './skeleton.component';
import { IonSkeletonProps } from './types';

const defaultProps: Partial<IonSkeletonProps> = {
  width: 50,
  height: 50,
};

const rectangularProps: Partial<IonSkeletonProps> = {
  width: 400,
  height: 100,
};

const circularProps: Partial<IonSkeletonProps> = {
  width: 50,
  height: 50,
  radius: '50%',
};

const sut = async (
  customProps: Partial<IonSkeletonProps>
): Promise<HTMLElement> => {
  await render(IonSkeletonComponent, {
    componentInputs: customProps,
  });
  return screen.findByTestId('ion-skeleton');
};

describe('SkeletonComponent', () => {
  it('should render correctly', async () => {
    await sut(defaultProps);
    expect(screen.getByTestId('ion-skeleton')).toHaveClass('ion-skeleton');
  });

  it('should render a skeleton with default values', async () => {
    await sut(defaultProps);
    expect(screen.getByTestId('ion-skeleton')).toHaveStyle(
      'width: 50px; height: 50px;'
    );
  });

  it('should render rectangular skeleton', async () => {
    await sut(rectangularProps);
    expect(screen.getByTestId('ion-skeleton')).toHaveStyle(
      'width: 400px; height: 100px;'
    );
  });

  it('should render without converting units', async () => {
    await sut({
      width: '100%',
      height: '100%',
    });
    expect(screen.getByTestId('ion-skeleton')).toHaveStyle(
      'width: 100%; height: 100%;'
    );
  });

  it('should render circular skeleton', async () => {
    await sut(circularProps);
    expect(screen.getByTestId('ion-skeleton')).toHaveStyle(
      'border-radius: 50%'
    );
  });

  it('should accept custom border radius', async () => {
    await sut({
      width: 50,
      height: 50,
      radius: 12,
    });
    expect(screen.getByTestId('ion-skeleton')).toHaveStyle(
      'border-radius: 12px'
    );
  });
});
