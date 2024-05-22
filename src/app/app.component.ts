import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  delta = 23;
  blur_radius = 149;
  spread_radius = 0;
  alpha = 0.3;
}
