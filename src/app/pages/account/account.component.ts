import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-account',
  imports: [CommonModule, RouterOutlet],
  template: `
    <h1>
      account works!
    </h1>
    <router-outlet></router-outlet>
  `,
  styles: ``
})
export class AccountComponent {

}
