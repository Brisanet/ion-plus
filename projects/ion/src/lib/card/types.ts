import { ComponentType } from '@angular/cdk/overlay';
import { IconType, Shape, Type } from '../../public-api';
import { SafeAny } from '../utils/safe-any';

export type FooterButton = {
  [keys in Type]?: Pick<ButtonBase, 'label' | 'shape' | 'icon'>;
};

interface ButtonBase {
  type: string;
  nameAction: IconType;
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
  buttons: FooterButton;
  body: ComponentType<SafeAny> | undefined;
}

export interface CardEvent {
  buttonAction: IconType;
}

export interface IonCardProps {
  header: Header;
  body: ComponentType<SafeAny> | undefined;
  footer: Footer | undefined;
  cardEvents?: CardEvent;
}
