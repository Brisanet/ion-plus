import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  input,
  OnDestroy,
  output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IonCardProps } from './types';
import { SafeAny } from '../utils/safe-any';
import {
  IonButtonComponent,
  IonDividerComponent,
  IonIconComponent,
} from '../../public-api';

@Component({
  standalone: true,
  imports: [IonIconComponent, IonButtonComponent, IonDividerComponent],
  selector: 'ion-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class IonCardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('body', { read: ViewContainerRef, static: false })
  body!: ViewContainerRef;
  @ViewChild('footer', { read: ViewContainerRef, static: false })
  footer!: ViewContainerRef;
  configuration = input<IonCardProps>();
  cardEvents = output<IonCardProps['cardEvents']>();
  constructor(private cdr: ChangeDetectorRef) {}

  cardEvent(event: IonCardProps['cardEvents']): void {
    this.cardEvents.emit(event);
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.ngOnDestroy();
    const config = this.configuration();

    if (config && config.body) {
      this.body.createComponent(config.body);
    }

    if (config && config.footer) {
      this.footer.createComponent(config.footer as SafeAny);
    }
  }

  ngOnDestroy(): void {
    if (this.body) {
      this.body.detach();
    }

    if (this.footer) {
      this.footer.detach();
    }
  }
}
