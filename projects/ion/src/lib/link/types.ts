import { EventEmitter } from '@angular/core';
import { IconType } from '../icon';

/**
 *  @typedef {'sm' | 'md'} FontSize - The size of the font
 * @description Can be 'sm' or 'md'
 */
export type FontSize = 'sm' | 'md';

/**
 *  @typedef {'left' | 'right'} IconSide - The side of the icon
 * @description Can be 'left' or 'right'
 */
export type IconSide = 'left' | 'right';

/**
 *  @typedef {'_blank' | '_self' | '_parent' | '_top'} LinkTarget - The target of the link
 * @description Can be '_blank', '_self', '_parent' or '_top'
 */
export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export interface IonLinkProps {
  /**
   * Link label.
   * @type {string}
   * @example
   * <ion-link label="Link" />
   * */
  label: string;

  /**
   * Link icon.
   * @type {IconType}
   * @example
   * <ion-link icon="box" />
   * */
  icon: IconType;

  /**
   * Link icon side. Can be 'left' or 'right'.
   * @type {IconSide}
   * @default 'right'
   * @example
   * <ion-link iconSide="left" />
   * */
  iconSide: IconSide;

  /**
   * Link size. Can be 'sm' or 'md'.
   * @type {FontSize}
   * @default 'sm'
   * @example
   * <ion-link size="md" />
   * */
  size: FontSize;

  /**
   * Link bold font.
   * @type {boolean}
   * @default false
   * @example
   * <ion-link bold=true />
   * */
  bold: boolean;

  /**
   * Link disabled.
   * @type {boolean}
   * @default false
   * @example
   * <ion-link disabled=true />
   * */
  disabled: boolean;

  /**
   * Link target. Can be '_blank', '_self', '_parent' or '_top'.
   * @type {LinkTarget}
   * @default '_self'
   * @example
   * <ion-link target="_blank" />
   * */
  target: LinkTarget;

  /**
   * Link href.
   * @type {string}
   * @example
   * <ion-link link="https://www.google.com" />
   * */
  link: string;

  /**
   * Link ionOnClick.
   * @event IonLinkComponent#ionOnClick - Event emitted when the link is clicked and is not disabled.
   * @type {EventEmitter<void>}
   * @description Event emitted when the link is clicked and is not disabled.
   * @example
   * <ion-link (ionOnClick)="handleClick()" />
   * */
  ionOnClick: EventEmitter<void>;
}
