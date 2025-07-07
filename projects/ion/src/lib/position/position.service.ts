import { Injectable, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

export enum IonPosition {
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
  [key in IonPosition]: Pick<DOMRect, 'left' | 'top'>;
};

export type NewPosition = {
  key: IonPosition;
} & Pick<DOMRect, 'left' | 'top'>;

export interface GetPositionsCallbackProps {
  host: DOMRect;
  element: DOMRect;
  arrowAtCenter: boolean;
}

export type GetPositionsCallback = (
  props: GetPositionsCallbackProps
) => ElementPositions;

type PositionsChecks = {
  [key in IonPosition]?: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class IonPositionService {
  // Use WritableSignal for internal state management
  private readonly _repositionSource: WritableSignal<void> = signal(undefined);
  public readonly reposition$ = toObservable(this._repositionSource);

  private hostPosition: DOMRect | null = null;
  private componentCoordinates: DOMRect | null = null;
  private elementPadding = 0;
  private chosenPosition: IonPosition = IonPosition.TOP_CENTER; // Default value
  private currentPosition: IonPosition | null = null;
  private pointAtCenter = true;
  private autoReposition = true;

  setElementPadding(padding: number): void {
    this.elementPadding = padding;
  }

  setHostPosition(position: DOMRect): void {
    this.hostPosition = position;
  }

  setComponentCoordinates(coordinates: DOMRect): void {
    this.componentCoordinates = coordinates;
  }

  setChosenPosition(position: unknown): void {
    this.chosenPosition = position as IonPosition;
  }

  getCurrentPosition(): IonPosition {
    return this.currentPosition || this.chosenPosition;
  }

  setPointAtCenter(value: boolean): void {
    this.pointAtCenter = value;
  }

  setAutoReposition(value: boolean): void {
    this.autoReposition = value;
  }

  getNewPosition(
    getPositionCallback: GetPositionsCallback
  ): NewPosition | undefined {
    if (!this.hostPosition || !this.componentCoordinates) {
      return;
    }

    const availablePositions = getPositionCallback({
      host: this.hostPosition,
      arrowAtCenter: this.pointAtCenter,
      element: this.componentCoordinates,
    });

    const newPositionKey = this.checkPositions(availablePositions);
    if (!newPositionKey) {
        return undefined;
    }

    this.currentPosition = newPositionKey;

    return {
      key: this.currentPosition,
      ...availablePositions[this.currentPosition],
    };
  }

  public checkPositions(
    availablePositions: ElementPositions
  ): IonPosition | undefined {
    if (!this.autoReposition) {
      return this.chosenPosition;
    }

    const positionChecks = this.getPositionChecks();
    if (positionChecks[this.chosenPosition]) {
      return this.chosenPosition;
    }

    // Find the first available position that fits
    for (const [position, isAvailable] of Object.entries(positionChecks)) {
        if(isAvailable && availablePositions[position as IonPosition]) {
            return position as IonPosition;
        }
    }

    // Fallback to the chosen position if no other position is suitable
    return this.chosenPosition;
  }

  public getPositionChecks(): PositionsChecks {
    if (!this.componentCoordinates || !this.hostPosition) {
      return {};
    }

    const { clientWidth, clientHeight } = document.body;
    const { width, height } = this.componentCoordinates;

    const checks = {
      isRightOfHostSufficient: this.atRightEdge(clientWidth, this.hostPosition.right, width),
      isLeftOfHostSufficient: this.atLeftEdge(this.hostPosition.left, width),
      isBelowHostSufficient: this.atBottomEdge(clientHeight, this.hostPosition.bottom, height),
      isAboveHostSufficient: this.atTopEdge(this.hostPosition.top, height),
    };

    return {
      [IonPosition.RIGHT_BOTTOM]: !checks.isRightOfHostSufficient && !checks.isAboveHostSufficient,
      [IonPosition.RIGHT_CENTER]: !checks.isRightOfHostSufficient && !checks.isBelowHostSufficient && !checks.isAboveHostSufficient,
      [IonPosition.RIGHT_TOP]: !checks.isRightOfHostSufficient && !checks.isBelowHostSufficient,
      [IonPosition.LEFT_BOTTOM]: !checks.isLeftOfHostSufficient && !checks.isAboveHostSufficient,
      [IonPosition.LEFT_CENTER]: !checks.isLeftOfHostSufficient && !checks.isBelowHostSufficient && !checks.isAboveHostSufficient,
      [IonPosition.LEFT_TOP]: !checks.isLeftOfHostSufficient && !checks.isBelowHostSufficient,
      [IonPosition.BOTTOM_RIGHT]: !checks.isBelowHostSufficient && !checks.isLeftOfHostSufficient,
      [IonPosition.BOTTOM_CENTER]: !checks.isBelowHostSufficient && !checks.isLeftOfHostSufficient && !checks.isRightOfHostSufficient,
      [IonPosition.BOTTOM_LEFT]: !checks.isBelowHostSufficient && !checks.isRightOfHostSufficient,
      [IonPosition.TOP_RIGHT]: !checks.isAboveHostSufficient && !checks.isLeftOfHostSufficient,
      [IonPosition.TOP_CENTER]: !checks.isAboveHostSufficient && !checks.isLeftOfHostSufficient && !checks.isRightOfHostSufficient,
      [IonPosition.TOP_LEFT]: !checks.isAboveHostSufficient && !checks.isRightOfHostSufficient,
    };
  }

  emitReposition(): void {
    this._repositionSource.set();
  }

  private atRightEdge(
    screenWidth: number,
    hostRight: number,
    componentWidth: number
  ): boolean {
    return screenWidth - hostRight < componentWidth + this.elementPadding;
  }

  private atBottomEdge(
    screenHeight: number,
    hostBottom: number,
    componentHeight: number
  ): boolean {
    return screenHeight - hostBottom < componentHeight + this.elementPadding;
  }

  private atLeftEdge(hostLeft: number, componentWidth: number): boolean {
    return hostLeft < componentWidth + this.elementPadding;
  }

  private atTopEdge(hostTop: number, componentHeight: number): boolean {
    return hostTop < componentHeight + this.elementPadding;
  }
}