import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IonIconComponent } from '../../icon';
import { setTimer } from '../../utils/setTimer';
import { StatusType, statusColor, statusIcon } from '../../utils/statusTypes';
import { IonNotificationProps } from '../types';

@Component({
  standalone: true,
  selector: 'ion-notification',
  imports: [CommonModule, IonIconComponent, NgClass],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class IonNotificationComponent implements OnInit {
  @Input({ required: true }) title!: IonNotificationProps['title'];
  @Input({ required: true }) message!: IonNotificationProps['message'];
  @Input() icon?: IonNotificationProps['icon'];
  @Input() type: IonNotificationProps['type'] = 'success';
  @Input() fixed: IonNotificationProps['fixed'] = false;
  @Input() fadeIn: IonNotificationProps['fadeIn'] = 'fadeIn';
  @Input() fadeOut: IonNotificationProps['fadeOut'] = 'fadeOut';
  @ViewChild('notificationRef', { static: false }) notification!: ElementRef;
  @Output() ionOnClose: IonNotificationProps['ionOnClose'] =
    new EventEmitter<void>();

  private timer$!: Subscription;
  public iconColor!: string;

  ngOnInit(): void {
    this.setIcon();
    this.iconColor = this.getIconColor();
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
    this.notification.nativeElement.classList.add(this.fadeOut);
    this.ionOnClose.emit();
    setTimer().subscribe(() => {
      this.notification.nativeElement.remove();
    });
  }

  public closeAuto(closeIn: number = this.timeByWords(this.message)): void {
    if (this.fixed) {
      return;
    }
    this.timer$ = setTimer(closeIn).subscribe(() => {
      this.closeNotification();
    });
  }

  public mouseEnter(): void {
    if (this.fixed) {
      return;
    }
    this.timer$.unsubscribe();
  }

  public mouseLeave(): void {
    this.closeAuto();
  }

  private setIcon(): void {
    if (this.icon) {
      return;
    }
    this.icon = statusIcon[this.type as StatusType];
  }

  private getIconColor(): string {
    return statusColor[this.type as StatusType];
  }
}
