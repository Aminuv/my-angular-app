import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      custom-sidenav works!
    </p>
  `,
  styles: ``
})
export class CustomSidenavComponent {

}