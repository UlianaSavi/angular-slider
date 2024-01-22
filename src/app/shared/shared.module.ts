import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [SliderComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [SliderComponent],
})
export class SharedModule { }
