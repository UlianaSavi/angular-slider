import { Component } from '@angular/core';
import { SLIDER_MOVE_NUMBER, slideGoType } from 'src/types';

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

  public types = slideGoType;
  public slidesPosition: number = 0;

  public get arrowLeftDisabled(): boolean {
    return this.slidesPosition === 0;
  }

  public get arrowRightDisabled(): boolean {
    return Math.abs(this.slidesPosition / SLIDER_MOVE_NUMBER) >= this.slides.length - 1;
  }

  public go(type: slideGoType): void {
    switch (type) {
      case slideGoType.next:
        this.slidesPosition = this.slidesPosition - SLIDER_MOVE_NUMBER;
        break;
      case slideGoType.prev:
        this.slidesPosition = this.slidesPosition + SLIDER_MOVE_NUMBER;
        break;
    }
  }
}
