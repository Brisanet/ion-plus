import { ComponentType } from '@angular/cdk/overlay';

import { IconType, Shape, Type } from '../../public-api';
import { SafeAny } from '../utils/safe-any';

export type FooterButton = {
  [keys in Type]?: Pick<ButtonBase, 'label' | 'shape' | 'icon'>;
};

interface ButtonBase {
  type: Type;
  nameAction: string;
  label: string;
  icon: IconType;
  shape: Shape;
}

interface Header {
  title: string;
  buttons: ButtonBase[];
  icon: IconType;
}

interface Footer {
  shouldRender: boolean;
  buttons: FooterButton;
  body: ComponentType<SafeAny> | undefined;
}

export interface CardEvent {
  buttonAction: string;
}

export interface IonCardProps {
  header: Header;
  body: ComponentType<SafeAny> | undefined;
  footer: Footer;
  cardEvents?: CardEvent;
}
