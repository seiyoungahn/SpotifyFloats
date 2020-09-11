import { Component, Input, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input('value') valueSubject: BehaviorSubject<number>;
  @Input() min: number;
  @Input() max: number;

  public background: BehaviorSubject<string> = new BehaviorSubject('black');
  private lowerColor: string = "#1db954";
  private upperColor: string = "#404040";

  constructor() {}

  public ngOnInit() {
    const value = this.valueSubject.value;
    const bgString = this.getBgString(value);
    this.background = new BehaviorSubject(bgString);
  }

  public onInput(value: number) {
    const bgString = this.getBgString(value);
    this.background.next(bgString);
  }

  public onChange(value: number) {
    this.valueSubject.next(value);
    const bgString = this.getBgString(value);
    this.background.next(bgString); 
  }

  private getBgString(value: number): string {
    const valuePercent = (value - this.min) / (this.max - this.min) * 100;
    const bgString = 'linear-gradient(to right, '
                    + this.lowerColor + ' 0%, ' + this.lowerColor + ' ' + valuePercent + '%, '
                    + this.upperColor + ' ' + valuePercent + '%, ' + this.upperColor + ' 100%)';
    return bgString;
  }
}