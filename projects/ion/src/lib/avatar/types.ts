import { IconType } from '../icon';

export type AvatarSize = 'lg' | 'sm' | 'md' | 'xs';

export type AvatarType = 'initials' | 'icon' | 'photo';

export interface IonAvatarProps {
  /**
   * @description The `type` parameter represents the avatar type that will be displayed. Can be 'initials', 'photo' or 'icon'.
   * @type {AvatarType}
   * @default AvatarType.initials
   */
  type: AvatarType;
  /**
   * @description Avatar size. Can be `lg`, `sm`, `md` or `xs`.
   * @type {AvatarSize}
   * @default 'md'
   */
  size: AvatarSize;
  /**
   * @description The `value` parameter represents the name the will be displayed if the avatar type is 'initials'.
   * @type {string}
   */
  value: string;
  /**
   * @description The `image` parameter represents the img url/path the will be displayed if the avatar type is 'photo'.
   * @type {string}
   */
  image: string;

  /**
   * @description The `icon` parameter represents the name of the icon that will be displayed if the avatar type is 'icon'.
   * @type {IconType}
   */
  icon: IconType;
  /**
   * @description The `onErrorImage` parameter represents the url of the image that will be shown if an error occurs and the avatar type is 'photo'.
   * @type {string}
   */
  onErrorImage: string;
}
