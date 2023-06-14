import {
  Directive,
  Input,
  Renderer2,
  ElementRef,
  OnChanges,
  SimpleChanges,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: 'button[appButton]',
  exportAs: 'app-button',
})
export class AppButtonDirective implements OnChanges {
  @Input() size!: 'btn-sm' | 'btn-md' | 'btn-lg';
  @Input() color!: 'primary' | 'success' | 'info' | 'warning' | 'danger';
  @Input() mode!: 'btn-label' | 'btn-rounded' | 'btn-block';
  constructor(private renderer2: Renderer2, private elementRef: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.elementRef.nativeElement.className = `app-btn btn btn-${
      this.color ? this.color : 'primary'
    } ${this.size  ? this.size : ''} ${this.mode ? this.mode === 'btn-label' ? 'btn-label waves-light': this.mode : ''}`;
  }

  @HostBinding('class')
  elementClass = 'app-btn btn btn-primary';
}
