import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {
  ElementPositions,
  GetPositionsCallback,
  IonPositions,
  NewPosition,
  PositionsChecks,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class IonPositionService {
  public readonly reposition = new Subject<void>();
  private hostPosition!: DOMRect;
  private componentCoordinates!: DOMRect;
  private elementPadding = 0;
  private choosedPosition!: IonPositions;
  private currentPosition!: IonPositions;
  private pointAtCenter = true;

  public setElementPadding(padding: number): void {
    this.elementPadding = padding;
  }

  public setHostPosition(position: DOMRect): void {
    this.hostPosition = position;
  }

  public setComponentCoordinates(coordinates: DOMRect): void {
    this.componentCoordinates = coordinates;
  }

  public setChoosedPosition(position: IonPositions): void {
    this.choosedPosition = position;
  }

  public getCurrentPosition(): IonPositions {
    return this.currentPosition || this.choosedPosition;
  }

  public setPointAtCenter(value: boolean): void {
    this.pointAtCenter = value;
  }

  public getNewPosition(
    getPositionsCallback: GetPositionsCallback
  ): NewPosition | undefined {
    if (!this.hostPosition || !this.componentCoordinates) {
      return undefined;
    }

    const availablePositions = getPositionsCallback({
      host: this.hostPosition,
      arrowAtCenter: this.pointAtCenter,
      element: this.componentCoordinates,
    });

    this.currentPosition = this.checkPositions(availablePositions);
    return {
      key: this.currentPosition,
      ...availablePositions[this.currentPosition],
    };
  }

  public checkPositions(availablePositions: ElementPositions): IonPositions {
    const positions = this.getPositions();

    let newPosition = this.choosedPosition;

    if (!positions[newPosition]) {
      for (const [position, check] of Object.entries(positions)) {
        if (check && availablePositions[position as IonPositions]) {
          newPosition = position as IonPositions;
          break;
        }
      }
    }

    return newPosition;
  }

  public getPositions(): PositionsChecks {
    if (!this.componentCoordinates || !this.hostPosition) {
      return {} as PositionsChecks;
    }

    const { clientWidth, clientHeight } = document.body;
    const { width, height } = this.componentCoordinates;

    const positions = {
      right: this.atRightEdge(clientWidth, this.hostPosition.right, width),
      bottom: this.atBottomEdge(clientHeight, this.hostPosition.bottom, height),
      left: this.atLeftEdge(this.hostPosition.left, width),
      top: this.atTopEdge(this.hostPosition.top, height),
    };

    return {
      rightBottom: !positions.right && !positions.top,
      rightCenter: !positions.right && !positions.bottom && !positions.top,
      rightTop: !positions.right && !positions.bottom,
      leftBottom: !positions.left && !positions.top,
      leftCenter: !positions.left && !positions.bottom && !positions.top,
      leftTop: !positions.left && !positions.bottom,
      bottomRight: !positions.bottom && !positions.left,
      bottomCenter: !positions.bottom && !positions.left && !positions.right,
      bottomLeft: !positions.bottom && !positions.right,
      topRight: !positions.top && !positions.left,
      topCenter: !positions.top && !positions.left && !positions.right,
      topLeft: !positions.top && !positions.right,
    };
  }

  public emitReposition(): void {
    this.reposition.next();
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
    return hostLeft - componentWidth - this.elementPadding < 0;
  }

  private atTopEdge(hostTop: number, componentHeight: number): boolean {
    return hostTop < componentHeight + this.elementPadding;
  }
}
