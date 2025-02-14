import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  computed,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IonIconComponent } from '../../icon';
import { setTimer } from '../../utils/setTimer';
import { statusColor, statusIcon } from '../../utils/statusTypes';
import { IonNotificationProps } from '../types';

@Component({
  standalone: true,
  selector: 'ion-notification',
  imports: [CommonModule, IonIconComponent, NgClass],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonNotificationComponent implements OnInit {
  title = input.required<IonNotificationProps['title']>();
  message = input.required<IonNotificationProps['message']>();
  type = input<IonNotificationProps['type']>('success');
  icon = model<IonNotificationProps['icon']>();
  fixed = input<IonNotificationProps['fixed']>(false);
  fadeIn = input<IonNotificationProps['fadeIn']>('fadeIn');
  fadeOut = input<IonNotificationProps['fadeOut']>('fadeOut');

  notification = viewChild<ElementRef>('notificationRef');

  ionOnClose = output();

  iconColor = computed(() => statusColor[this.type()]);

  private timer$!: Subscription;

  ngOnInit(): void {
    this.setIcon();
    this.closeAuto();
  }

  public timeByWords(message: string = ''): number {
    const wordsBySecond = 3;

    // margin is one second
    const marginOfError = 1;
    const second = 1000;
    const result = message.split(' ').length / wordsBySecond + marginOfError;
    return Number(result.toFixed(0)) * second;
  }

  public closeNotification(): void {
    this.notification()!.nativeElement.classList.add(this.fadeOut());
    this.ionOnClose.emit();
    setTimer().subscribe(() => {
      this.notification()!.nativeElement.remove();
    });
  }

  public closeAuto(closeIn: number = this.timeByWords(this.message())): void {
    if (this.fixed()) {
      return;
    }
    this.timer$ = setTimer(closeIn).subscribe(() => {
      this.closeNotification();
    });
  }

  public mouseEnter(): void {
    if (this.fixed()) {
      return;
    }
    this.timer$.unsubscribe();
  }

  public mouseLeave(): void {
    this.closeAuto();
  }

  private setIcon(): void {
    if (this.icon()) {
      return;
    }
    this.icon.set(statusIcon[this.type()]);
  }
}
