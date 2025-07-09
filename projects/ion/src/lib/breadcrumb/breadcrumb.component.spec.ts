import { fireEvent, render, screen } from '@testing-library/angular';

import { IonIconComponent } from '../icon';
import { SafeAny } from '../utils/safe-any';
import { IonBreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItem, BreadcrumbProps } from './types';

const selectEvent = jest.fn();

const items: BreadcrumbItem[] = [
  {
    label: 'Inicio',
    link: '/home',
  },
  {
    label: 'Recursos',
    link: '/recursos',
  },
  {
    label: 'Tecnico',
    link: '/recursos/1',
  },
];

const sut = async (
  customProps: BreadcrumbProps = {
    selected: {
      emit: selectEvent,
    },
  } as SafeAny
): Promise<void> => {
  const { selected, ...rest } = customProps;
  await render(IonBreadcrumbComponent, {
    componentInputs: {
      breadcrumbs: items,
      ...rest,
    },
    componentOutputs: {
      selected: selected as SafeAny,
    },
    imports: [IonIconComponent],
  });
};

describe('BreadcrumbComponent', () => {
  beforeEach(async () => {
    await sut();
  });

  it.each(items)(
    'should render $label in breadcrumb',
    async (link: BreadcrumbItem) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    }
  );

  it("should render 'recursos' in breadcrumbs", async () => {
    expect(screen.getByText('Recursos')).toHaveClass('ion-breadcrumbs__item');
  });

  it('should emit the selected breadcrumb', async () => {
    const [firstItem] = items;

    const element = screen.getByText(firstItem.label);
    fireEvent.click(element);
    expect(selectEvent).toHaveBeenCalledWith(firstItem);
  });

  it('should not emit the selected breadcrumb', async () => {
    const [firstItem] = items;

    const element = screen.getByText(firstItem.label);
    fireEvent.click(element);
    expect(selectEvent).not.toHaveBeenCalledWith(items[items.length - 1]);
  });

  afterEach(() => {
    selectEvent.mockClear();
  });
});
