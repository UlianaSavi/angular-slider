import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject, takeUntil, timer } from 'rxjs';
import { SLIDER_TIMER, slideGoType } from 'src/types';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sliderEl')
  sliderEl: ElementRef | null = null;

  public slides: string[] = [
    '../../../assets/img/slide-1.png',
    '../../../assets/img/slide-2.png',
    '../../../assets/img/slide-3.png',
    '../../../assets/img/slide-4.png',
  ]; // Array with images src. Now it's local, but we can get images form server
  public types = slideGoType;
  public slidesPosition: number = 0;
  public slidesGoOffset: number = 0;

  private timer = timer(SLIDER_TIMER, SLIDER_TIMER); // 1st time after SLIDER_TIMER ms and then every SLIDER_TIMER ms
  private destroy$ = new Subject<void>();

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.slidesGoOffset = this.sliderEl?.nativeElement.offsetWidth;
  }

  ngOnInit(): void {
    this.sliderGoByTimer();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.slidesGoOffset = this.sliderEl?.nativeElement.offsetWidth;
    }, 100);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get arrowLeftDisabled(): boolean {
    return this.slidesPosition === 0;
  }

  public get arrowRightDisabled(): boolean {
    return Math.abs(this.slidesPosition / this.slidesGoOffset) >= this.slides.length - 1;
  }

  public go(type: slideGoType): void {
    switch (type) {
      case slideGoType.next:
        this.slidesPosition = this.slidesPosition - this.slidesGoOffset;
        break;
      case slideGoType.prev:
        this.slidesPosition = this.slidesPosition + this.slidesGoOffset;
        break;
    }
  }

  private sliderGoByTimer(): void{
    this.timer.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.arrowRightDisabled) {
        this.slidesPosition = 0;
        return;
      }
      this.go(slideGoType.next);
    });
  }
}
