import { iconsPaths } from './svgs/icons';

export type Highlight = 'simple' | 'double' | 'none';

export type ContainerStyle = {
  size: string;
  color: string;
};

export type IconType = keyof typeof iconsPaths;

export type IconDirection = 'right' | 'left';

export interface IonIconProps {
  type: IconType;
  size: number;
  color: string;
  highlight: Highlight;
}
