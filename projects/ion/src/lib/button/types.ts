import { EventEmitter } from '@angular/core';
import { IconType } from '../icon';

export type Type = 'primary' | 'secondary' | 'ghost' | 'dashed';
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Shape = 'normal' | 'circle' | 'rounded';
export type Icon = {
  type: IconType;
  rightPosition?: boolean;
};

export interface IonButtonProps {
  /**
   * Button label.
   * @param label - Text that will be displayed on the button
   * @type {string}
   * @example
   * <ion-button label = `text button` />
   */
  label: string;

  /**
   * Button type.
   * @param type - Defines the button style.
   * @type {'primary' | 'secondary' | 'ghost' | 'dashed'}
   * @default `primary`
   * @example
   * <ion-button type = `secondary`/>
   */
  type: Type;

  /**
   * Button danger.
   * @param danger - Indicates whether the button represents a danger.
   * @type {boolean}
   * @default false
   * @example
   * <ion-button [danger] = false />
   */
  danger: boolean;

  /**
   * Button disabled
   * @param disabled - Indicates whether the button is disabled.
   * @type {boolean}
   * @default false
   * @example
   * <ion-button [disabled] = false />
   */
  disabled: boolean;

  /**
   * Button loading
   * @param loading - Indicates that the button is on hold. In other words, waiting for some process to finish so that it can be ready for use.
   * @type {boolean}
   * @default false
   * @example
   * <ion-button loading = false />
   */
  loading: boolean;

  /**
   * Button size.
   * @param size - Indicates the size of the button
   * @type {`sm` | `md` | `lg` | `xl`}
   * @default `md`
   * @example
   * <ion-button size = `md`/>
   */
  size: Size;

  /**
   * Button icon
   * @param icon - Object that configures the icon associated with the button.
   * @type {object}
   * @param icon.type - defines the type of icon to be displayed.
   * @param icon.rightPosition - indicates whether the icon will be rendered to the right of the label.
   * @example
   * <ion-button [icon]="{type: 'play', rightPosition: false}" />
   */
  icon: Icon;

  /**
   * Button shape
   * @param shape - Allows the button to change its shape.
   * @type {`normal` | `circle` | `rounded`}
   * @default `normal`
   * @example
   * <ion-button shape = `normal` />
   */
  shape: Shape;

  /**
   * Button ionOnClick
   * @event IonButtonComponent#ionOnClick - Event triggered when button is clicked.
   * @type {EventEmitter<null>}
   * @description This event is emitted when the button is clicked. The issuance does not include additional data. No event will be fired when the `loading` and `disabled` properties are set to `true`.
   * @example
   * <ion-button (ionOnClick) = "yourFunction()"/>
   */
  ionOnClick: EventEmitter<null>;
}
