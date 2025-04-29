import { ComponentType } from '@angular/cdk/overlay';

import { IconType, Shape, Type } from '../../public-api';
import { SafeAny } from '../utils/safe-any';

export type FooterButton = {
  [keys in Type]?: Pick<ButtonBase, 'label' | 'shape' | 'icon'>;
};

interface ButtonBase {
  /**
   * @param type - Defines the type of the button.
   * @type {'primary' | 'secondary' | 'ghost' | 'dashed'}
   */
  type: Type;
  /**
   * @param nameAction - Defines the name of the action when a event occurs.
   * @type {string}
   */
  nameAction: string;
  /**
   * @param label - Defines the label of the button.
   * @type {string}
   */
  label: string;
  /**
   * @param icon - Defines the icon displayed in the button.
   * @type {string}
   */
  icon: IconType;
  /**
   * @param shape - Defines the shape of the button.
   * @type {'normal' | 'circular' | 'rounded'}
   */
  shape: Shape;
}

interface Header {
  /**
   * @param title - Defines the title of the card.
   * @type {string}
   */
  title: string;
  /**
   * @param buttons - Defines the buttons displayed in the card header.
   * @type {Array<ButtonBase>}
   */
  buttons: Array<ButtonBase>;
  /**
   * @param icon - Defines the icon displayed in the button.
   * @type {string}
   */
  icon: IconType;
}

interface Footer {
  /**
   * @param shouldRender - Defines if the footer should be visible.
   * @type {boolean}
   * @default `false`
   */
  shouldRender: boolean;
  /**
   * @param buttons - Defines the buttons displayed in the footer.
   * @type {FooterButton}
   */
  buttons: FooterButton;
  /**
   * @param body - Defines the component displayed in the footer.
   * @type {ComponentType}
   * @default `undefined`
   */
  body: ComponentType<SafeAny> | undefined;
}

export interface CardEvent {
  /**
   * @param buttonAction - Defines the name of the action when a event occurs.
   * @type {string}
   */
  buttonAction: string;
}

export interface IonCardProps {
  /**
   * @param header - Defines the header of the card.
   * @type {Header}
   */
  header: Header;
  /**
   * @param body - Defines the component displayed in the body of the card.
   * @type {ComponentType}
   */
  body: ComponentType<SafeAny> | undefined;
  /**
   * @param footer - Defines the footer of the card.
   * @type {Footer}
   */
  footer: Footer;
  /**
   * @event cardEvents - Event triggered when a button is selected.
   * @type {CardEvent}
   */
  cardEvents?: CardEvent;
}
