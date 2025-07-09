export enum TooltipPosition {
  CENTER_RIGHT = 'centerRight',
  CENTER_LEFT = 'centerLeft',
  TOP_RIGHT = 'topRight',
  TOP_CENTER = 'topCenter',
  TOP_LEFT = 'topLeft',
  BOTTOM_RIGHT = 'bottomRight',
  BOTTOM_CENTER = 'bottomCenter',
  BOTTOM_LEFT = 'bottomLeft',
  DEFAULT = TooltipPosition.TOP_CENTER,
}

export enum TooltipTrigger {
  CLICK = 'click',
  HOVER = 'hover',
  DEFAULT = TooltipTrigger.HOVER,
}
