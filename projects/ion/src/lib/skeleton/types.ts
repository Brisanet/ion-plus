export type SkeletonVariants = 'rect' | 'circular';

export interface IonSkeletonProps {
  /**
   * @description the `radius` parameter is used to define the radius of the skeleton.
   * @type {string | number}
   */
  radius: number | string;

  /**
   * @description The `height` parameter is used to define the height of the skeleton.
   * @type {string | number}
   * @default '50'
   */
  height: number | string;

  /**
   * @description The `width` parameter is used to define the width of the skeleton.
   * @type {string | number}
   * @default '50'
   */
  width: number | string;
}
