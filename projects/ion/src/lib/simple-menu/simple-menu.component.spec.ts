import { fireEvent, render, screen } from '@testing-library/angular';

import { IonAvatarComponent } from '../avatar';
import { IonTabComponent } from '../tab';
import { TabInGroup } from '../tab-group';
import { SafeAny } from '../utils/safe-any';
import { IonSimpleMenuComponent } from './simple-menu.component';
import { SimpleMenuProps } from './types';

const classMenuOpen = 'ion-menu-container--opened';

const options: TabInGroup[] = [
  {
    label: 'Agendamentos',
    iconType: 'calendar',
    selected: false,
  },
  {
    label: 'Recursos',
    iconType: 'pencil',
    selected: false,
  },
];

const selectEvent = jest.fn();
const logoutEvent = jest.fn();

const defaultMenu: SimpleMenuProps = {
  options,
  profile: {
    imageUrl:
      'https://ovicio.com.br/wp-content/uploads/2022/01/20220123-rocket-raccoon-guardians-of-the-galaxy.jpeg',
    name: 'Rocket Raccoon',
  },
  selected: {
    emit: selectEvent,
  } as SafeAny,
  logoutClick: {
    emit: logoutEvent,
  } as SafeAny,
};

const withoutImage: SimpleMenuProps = {
  options,
  profile: {
    imageUrl: '',
    name: 'Rocket Raccoon',
  },
  selected: {
    emit: selectEvent,
  } as SafeAny,
  logoutClick: {
    emit: logoutEvent,
  } as SafeAny,
};

const withLogoMenu: SimpleMenuProps = {
  logo: {
    src: 'https://logodownload.org/wp-content/uploads/2016/09/vasco-logo-0.png',
    alt: 'Logo de exemplo',
  },
  options,
  profile: {
    imageUrl:
      'https://ovicio.com.br/wp-content/uploads/2022/01/20220123-rocket-raccoon-guardians-of-the-galaxy.jpeg',
    name: 'Rocket Raccoon',
  },
  selected: {
    emit: selectEvent,
  } as SafeAny,
  logoutClick: {
    emit: logoutEvent,
  } as SafeAny,
};

const sut = async (
  customProps: SimpleMenuProps = defaultMenu
): Promise<void> => {
  const { selected, logoutClick, ...rest } = customProps;
  await render(IonSimpleMenuComponent, {
    componentInputs: rest,
    componentOutputs: {
      selected,
      logoutClick,
    },
    imports: [IonAvatarComponent, IonTabComponent],
  });
};

const sleep = (ms: number): Promise<unknown> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

describe('SimpleMenuComponent', () => {
  beforeEach(async () => {
    await sut();
  });

  it('should render menu icon to open', async () => {
    expect(document.getElementById('ion-icon-sandwich')).toBeInTheDocument();
  });

  it.each(options)('should render 4label option in menu', async option => {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  });

  it('should render profile image', async () => {
    expect(screen.getByTestId('ion-avatar')).toBeInTheDocument();
  });

  it('should render profile name', async () => {
    expect(screen.getByText(defaultMenu.profile.name)).toBeInTheDocument();
  });
  it('should render logout button', async () => {
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('should render the menu hidden by default', async () => {
    expect(screen.getByTestId('ion-simple-menu')).not.toHaveClass(
      classMenuOpen
    );
  });

  it('should show menu when mouse enter in menu icon', async () => {
    fireEvent.mouseEnter(screen.getByTestId('ion-button-sandwich'));
    expect(screen.getByTestId('ion-simple-menu')).toHaveClass(classMenuOpen);
  });

  it('should hide menu when mouse leave', async () => {
    fireEvent.mouseEnter(screen.getByTestId('ion-button-sandwich'));
    await sleep(1000);

    fireEvent.mouseLeave(screen.getByTestId('ion-button-sandwich'));
    await sleep(2000);

    expect(screen.getByTestId('ion-simple-menu')).toHaveClass(
      'ion-menu-container'
    );
  });

  it('should emit event when option be selected', async () => {
    const optionToSelect = options[0];
    fireEvent.click(screen.getByText(optionToSelect.label));
    expect(selectEvent).toHaveBeenCalledWith(optionToSelect);
  });

  it('should emit event when logout button is clicked', async () => {
    fireEvent.click(screen.getByText('Sair'));
    expect(logoutEvent).toHaveBeenCalled();
  });

  afterEach(() => {
    selectEvent.mockClear();
    logoutEvent.mockClear();
  });
});

describe('Without Image', () => {
  it('should render avatar initials when the photo is not passed', async () => {
    await sut(withoutImage);
    expect(screen.queryByTestId('avatar-photo')).not.toBeInTheDocument();
    expect(screen.getByTestId('avatar-initials')).toBeTruthy();
  });
});

describe('With Logo', () => {
  it('should render logo', async () => {
    await sut(withLogoMenu);
    expect(screen.queryByTestId('logo-photo')).toBeInTheDocument();
  });
});
