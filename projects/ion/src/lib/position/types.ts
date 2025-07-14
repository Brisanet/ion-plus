export enum IonPositions {
  TOP_RIGHT = 'topRight',
  TOP_CENTER = 'topCenter',
  TOP_LEFT = 'topLeft',
  RIGHT_TOP = 'rightTop',
  RIGHT_CENTER = 'rightCenter',
  RIGHT_BOTTOM = 'rightBottom',
  LEFT_TOP = 'leftTop',
  LEFT_CENTER = 'leftCenter',
  LEFT_BOTTOM = 'leftBottom',
  BOTTOM_RIGHT = 'bottomRight',
  BOTTOM_CENTER = 'bottomCenter',
  BOTTOM_LEFT = 'bottomLeft',
}

export type ElementPositions = {
  [key in IonPositions]: Pick<DOMRect, 'left' | 'top'>;
};

export type NewPosition = { key: IonPositions } & Pick<DOMRect, 'left' | 'top'>;

export type GetPositionsCallback = (
  props: GetPositionsCallbackProps
) => ElementPositions;

export interface GetPositionsCallbackProps {
  host: DOMRect;
  element: DOMRect;
  arrowAtCenter: boolean;
}

export type RepositionData = {
  componentCoordinates: Partial<DOMRect>;
  hostPosition: Partial<DOMRect>;
  screenWidth: number;
  screenHeight: number;
};

export type PositionsChecks = {
  [x in IonPositions]?: boolean;
};
