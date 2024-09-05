import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[scrollTo]',
  standalone: true
})
export class ScrollToDirective {

  @Input() scrollX: number = 0;
  @Input() scrollY: number = 0;

  constructor() { }

  @HostListener('click') onClick() {
    window.scrollTo(this.scrollX, this.scrollY);
  }
}
