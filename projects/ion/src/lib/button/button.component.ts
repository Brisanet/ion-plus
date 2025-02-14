import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { timer } from 'rxjs';
import { IonIconComponent } from '../icon';
import { IonButtonProps } from './types';

const CLASS_PREFIX = 'ion-btn';
const ANIMATION_TIME = 300;

@Component({
  selector: 'ion-button',
  imports: [CommonModule, IonIconComponent, NgClass],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonButtonComponent {
  label = input<IonButtonProps['label']>();
  type = input<IonButtonProps['type']>('primary');
  danger = input<IonButtonProps['danger']>(false);
  disabled = input<IonButtonProps['disabled']>(false);
  loading = input<IonButtonProps['loading']>(false);
  size = input<IonButtonProps['size']>('md');
  icon = input<IonButtonProps['icon']>();
  shape = input<IonButtonProps['shape']>('normal');

  ionOnClick = output();

  ionButton = viewChild<ElementRef>('ionButton');

  public handleButtonClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.ionOnClick.emit();
    }
  }

  public pressAnimation() {
    const classList = this.ionButton()?.nativeElement.classList;
    classList.remove(`${CLASS_PREFIX}--unpress`);
    classList.add(`${CLASS_PREFIX}--press`);
  }

  public unpressAnimation() {
    const classList = this.ionButton()?.nativeElement.classList;
    classList.forEach((className: string) => {
      if (className === `${CLASS_PREFIX}--press`) {
        classList.remove(`${CLASS_PREFIX}--press`);
        classList.add(`${CLASS_PREFIX}--unpress`);
      }
    });
    timer(ANIMATION_TIME).subscribe(() => {
      classList.remove(`${CLASS_PREFIX}--unpress`);
    });
  }
}
