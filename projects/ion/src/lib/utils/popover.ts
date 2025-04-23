import { GetPositionsCallbackProps, IonPositions } from '../position/types';

export type PopoverPositions = {
  [key in IonPositions]: Pick<DOMRect, 'left' | 'top'>;
};

const ARROW_TO_EDGE_DISTANCE = 16;
const ARROW_DIAGONAL = 18;
const POPOVER_SPACING = 14;
const arrowMargin = 3;

interface PositionParams {
  host: DOMRect;
  popover: DOMRect;
  arrowAtCenter: boolean;
  hostHorizontalCenter: number;
  hostVerticalCenter: number;
}

function calculateTopPositions({
  host,
  popover,
  arrowAtCenter,
  hostHorizontalCenter,
}: PositionParams): Partial<PopoverPositions> {
  const top = host.top - arrowMargin;
  return {
    topRight: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          popover.width +
          ARROW_DIAGONAL +
          ARROW_TO_EDGE_DISTANCE -
          POPOVER_SPACING / 2
        : host.right - popover.width,
      top,
    },
    topCenter: {
      left: hostHorizontalCenter - popover.width / 2,
      top,
    },
    topLeft: {
      left: arrowAtCenter
        ? host.left + ARROW_TO_EDGE_DISTANCE / 2 + ARROW_DIAGONAL / 2
        : host.left,
      top,
    },
  };
}

function calculateBottomPositions({
  host,
  popover,
  arrowAtCenter,
  hostHorizontalCenter,
}: PositionParams): Partial<PopoverPositions> {
  const top = host.bottom;
  return {
    bottomRight: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          popover.width +
          ARROW_TO_EDGE_DISTANCE +
          ARROW_DIAGONAL / 2
        : host.right - popover.width,
      top,
    },
    bottomCenter: {
      left: hostHorizontalCenter - popover.width / 2,
      top,
    },
    bottomLeft: {
      left: arrowAtCenter
        ? hostHorizontalCenter -
          ARROW_TO_EDGE_DISTANCE -
          ARROW_DIAGONAL / 2 +
          arrowMargin
        : host.left,
      top,
    },
  };
}

function calculateLeftPositions({
  host,
  popover,
  arrowAtCenter,
  hostVerticalCenter,
}: PositionParams): Partial<PopoverPositions> {
  const left = host.left - popover.width;
  return {
    leftBottom: {
      left,
      top: arrowAtCenter
        ? host.bottom - ARROW_DIAGONAL / 2
        : host.bottom - popover.height,
    },
    leftCenter: {
      left,
      top:
        hostVerticalCenter +
        popover.height / 2 -
        ARROW_TO_EDGE_DISTANCE -
        ARROW_DIAGONAL / 2,
    },
    leftTop: {
      left,
      top: arrowAtCenter
        ? host.top +
          ARROW_TO_EDGE_DISTANCE / 2 +
          ARROW_DIAGONAL / 2 -
          popover.height / 2 -
          arrowMargin
        : host.top,
    },
  };
}

function calculateRightPositions({
  host,
  popover,
  arrowAtCenter,
  hostVerticalCenter,
}: PositionParams): Partial<PopoverPositions> {
  const left = host.right;
  return {
    rightBottom: {
      left,
      top: arrowAtCenter
        ? host.bottom + ARROW_TO_EDGE_DISTANCE / 2
        : host.bottom - popover.height,
    },
    rightCenter: {
      left,
      top: hostVerticalCenter,
    },
    rightTop: {
      left,
      top: arrowAtCenter
        ? host.top - popover.height / 2 + ARROW_DIAGONAL
        : host.top,
    },
  };
}

export function getPositionsPopover(
  props: GetPositionsCallbackProps
): PopoverPositions {
  const { host, arrowAtCenter, element: popover } = props;
  const hostHorizontalCenter = host.left + host.width / 2;
  const hostVerticalCenter = host.top + host.height / 2;
  const calculatePositionProps = {
    host,
    popover,
    arrowAtCenter,
    hostHorizontalCenter,
    hostVerticalCenter,
  };

  return {
    ...calculateTopPositions(calculatePositionProps),
    ...calculateBottomPositions(calculatePositionProps),
    ...calculateLeftPositions(calculatePositionProps),
    ...calculateRightPositions(calculatePositionProps),
  } as PopoverPositions;
}
