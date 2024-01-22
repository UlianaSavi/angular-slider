import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, timer } from 'rxjs';
import { SLIDER_MOVE_NUMBER, SLIDER_TIMER, slideGoType } from 'src/types';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {
  public slides: string[] = [
    '../../../assets/img/slide-1.png',
    '../../../assets/img/slide-2.png',
    '../../../assets/img/slide-3.png',
    '../../../assets/img/slide-4.png',
  ]; // Array with images src. Now it's local, but we can get images form server

  public types = slideGoType;
  public slidesPosition: number = 0;

  private timer = timer(SLIDER_TIMER, SLIDER_TIMER); // 1st time after SLIDER_TIMER ms and then every SLIDER_TIMER ms
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // this.slides = this.apiService.getImages(); // TODO: сделай api Service и там имитируй получения от сервера
    this.sliderGoByTimer();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

  private sliderGoByTimer(): void{
    this.timer.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.arrowRightDisabled) {
        this.slidesPosition = 0;
      }
      this.go(slideGoType.next);
    });
  }
}
