import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  public slides: string[] = [
    '../../../assets/img/slide-1.png',
    '../../../assets/img/slide-2.png',
    '../../../assets/img/slide-3.png',
    '../../../assets/img/slide-4.png',
  ]; // Array with images src. Now it's local, but we can get images form server
  // TODO: сделай api Service и там имитируй получения от сервера, только из папки images и оставь коммент, что позже там можно добавить получение от сервера
}
