import { PopoverPosition } from '../types'; // Assuming this enum exists
import { GetPositionsCallbackProps } from '../../position/position.service';

export type PopoverPositions = {
  [key in PopoverPosition]: Pick<DOMRect, 'left' | 'top'>;
};

const ARROW_TO_EDGE_DISTANCE = 16;
const ARROW_VISIBLE_DIAGONAL = 18;
const ARROW_MARGIN = 3;

/**
 * Calculates all possible popover positions relative to a host element.
 *
 * @param props - The properties required to calculate positions.
 * @returns An object containing the coordinates for each popover position.
 */
export function getPositionsPopover(
  props: GetPositionsCallbackProps
): PopoverPositions {
  const { host, arrowAtCenter, element: popover } = props;

  if (!popover) {
    return {} as PopoverPositions;
  }

  const hostHorizontalCenter = host.left + host.width / 2;
  const hostVerticalCenter = host.top + host.height / 2;

  const arrowHorizontalAdjustment = ARROW_VISIBLE_DIAGONAL / 2 + ARROW_TO_EDGE_DISTANCE + ARROW_MARGIN;
  const arrowVerticalAdjustment = ARROW_VISIBLE_DIAGONAL / 2 + ARROW_TO_EDGE_DISTANCE - ARROW_MARGIN;


  const positions: PopoverPositions = {
    // Top Positions
    [PopoverPosition.TOP_CENTER]: {
      left: hostHorizontalCenter - popover.width / 2,
      top: host.top - popover.height, // Adjusted for popover height
    },
    [PopoverPosition.TOP_LEFT]: {
      left: arrowAtCenter
        ? hostHorizontalCenter - arrowHorizontalAdjustment
        : host.left,
      top: host.top - popover.height,
    },
    [PopoverPosition.TOP_RIGHT]: {
      left: arrowAtCenter
        ? hostHorizontalCenter - popover.width + arrowHorizontalAdjustment
        : host.right - popover.width,
      top: host.top - popover.height,
    },

    // Bottom Positions
    [PopoverPosition.BOTTOM_CENTER]: {
      left: hostHorizontalCenter - popover.width / 2,
      top: host.bottom,
    },
    [PopoverPosition.BOTTOM_LEFT]: {
      left: arrowAtCenter
        ? hostHorizontalCenter - arrowHorizontalAdjustment
        : host.left,
      top: host.bottom,
    },
    [PopoverPosition.BOTTOM_RIGHT]: {
      left: arrowAtCenter
        ? hostHorizontalCenter - popover.width + arrowHorizontalAdjustment
        : host.right - popover.width,
      top: host.bottom,
    },

    // Left Positions
    [PopoverPosition.LEFT_CENTER]: {
      left: host.left - popover.width,
      top: hostVerticalCenter - popover.height / 2, // Adjusted for popover height
    },
    [PopoverPosition.LEFT_TOP]: {
      left: host.left - popover.width,
      top: arrowAtCenter
        ? hostVerticalCenter - arrowVerticalAdjustment
        : host.top,
    },
    [PopoverPosition.LEFT_BOTTOM]: {
      left: host.left - popover.width,
      top: arrowAtCenter
        ? hostVerticalCenter - popover.height + arrowVerticalAdjustment
        : host.bottom - popover.height,
    },

    // Right Positions
    [PopoverPosition.RIGHT_CENTER]: {
      left: host.right,
      top: hostVerticalCenter - popover.height / 2, // Adjusted for popover height
    },
    [PopoverPosition.RIGHT_TOP]: {
      left: host.right,
      top: arrowAtCenter
        ? hostVerticalCenter - arrowVerticalAdjustment
        : host.top,
    },
    [PopoverPosition.RIGHT_BOTTOM]: {
      left: host.right,
      top: arrowAtCenter
        ? hostVerticalCenter - popover.height + arrowVerticalAdjustment
        : host.bottom - popover.height,
    },
  };

  return positions;
}