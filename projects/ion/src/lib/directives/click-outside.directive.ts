import { Directive, ElementRef, HostListener, output } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[ionClickOutside]',
})
export class ClickOutsideDirective {
  ionClickOutside = output<null>();
  private firstOpen = true;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    if (this.firstOpen) {
      this.firstOpen = false;
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.ionClickOutside.emit(null);
      this.firstOpen = true;
    }
  }
}
