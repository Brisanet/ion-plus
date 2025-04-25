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
  icon?: string;
  shape?: Shape;
}

interface Header {
  title: string;
  buttons?: ButtonBase[];
  icon?: IconType;
}

interface Footer {
  buttons: FooterButton;
  body: ComponentType<SafeAny>;
}

export interface CardEvent {
  buttonAction?: Type;
}

export interface IonCardProps {
  header: Header;
  body: ComponentType<SafeAny>;
  footer?: Footer;
  cardEvents?: CardEvent;
}
