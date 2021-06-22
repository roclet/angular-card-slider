import { Component } from '@angular/core';
import { data, sliderData } from './helpers/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data = data;
  slidesData = sliderData;
}
