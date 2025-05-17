import { Directive, ElementRef, inject, Input, input, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective implements OnInit {
  private elementRef = inject(ElementRef);
  private renderer2 = inject(Renderer2);
  private authService = inject(AuthService);
  @Input() showWhenAuthenticated: boolean | undefined;

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuth) => {
      const shouldShow = this.showWhenAuthenticated === undefined ? isAuth : (isAuth === this.showWhenAuthenticated);
      const display = shouldShow ? 'unset' : 'none';
      this.renderer2.setStyle(this.elementRef.nativeElement, 'display', display);
    });
  }
}
