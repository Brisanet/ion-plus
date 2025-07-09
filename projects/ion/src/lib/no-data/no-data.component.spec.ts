import { ComponentFixture } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { IonNoDataComponent } from './no-data.component';
import { IonNoDataProps } from './types';

const customLabel = 'No data';

const testCustomProps: Partial<IonNoDataProps> = {
  label: customLabel,
  iconType: 'exclamation-solid',
};

const sut = async (
  customProps?: Partial<IonNoDataProps>
): Promise<ComponentFixture<IonNoDataComponent>> => {
  const { fixture } = await render(IonNoDataComponent, {
    componentInputs: customProps,
  });
  return fixture;
};

describe('IonNoDataComponent - default properties', () => {
  beforeEach(async () => {
    await sut();
  });

  it('Should render the default label when no label is informed', async () => {
    expect(screen.getByText('Não há dados')).toBeInTheDocument();
  });

  it('Should render a icon by default', async () => {
    expect(screen.getByTestId('ion-no-data-icon')).toBeInTheDocument();
  });
});

describe('IonNoDataComponent - custom properties', () => {
  beforeEach(async () => {
    await sut(testCustomProps);
  });

  it('Should render the informed label', async () => {
    expect(screen.getByText(customLabel)).toBeInTheDocument();
  });
});
