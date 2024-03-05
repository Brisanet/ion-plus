export type SkeletonVariants = 'rect' | 'circular';

export interface IonSkeletonProps {
  /**
   * @description The `variant` parameter is used to define the shape of the skeleton.
   * @type {SkeletonVariants}
   */
  variant: SkeletonVariants;

  /**
   * @description the `radius` parameter is used to define the radius of the skeleton.
   * @type {number}
   */
  radius?: number;

  /**
   * @description The `height` parameter is used to define the height of the skeleton.
   * @type {number}
   * @default '50'
   */
  height: number;

  /**
   * @description The `width` parameter is used to define the width of the skeleton.
   * @type {string}
   * @default '50'
   */
  width: number;
}
