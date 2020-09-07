import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnChanges {
  @Input('value') valueSubject: BehaviorSubject<number>;
  @Input() min: number;
  @Input() max: number;

  public background: BehaviorSubject<string> = new BehaviorSubject('black');

  // public test = "black";

  public testt = new BehaviorSubject('white');

  constructor() {}

  public ngOnInit() {
    const value = this.valueSubject.value;
    const bgString = this.getBgString(value);
    this.background = new BehaviorSubject(bgString);
  }

  public ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
    // const value = event.target.value;
    // this.valueSubject.next(value);
    // const bgString = this.getBgString(value);
    // console.log(bgString);
    // this.background.next(bgString);
    // console.log(changes);
  }

  public test(value: number) {
    console.log(value);
  }

  public onChange(event: any) {
    const value = event.target.value;
    this.valueSubject.next(value);
  //   const bgString = this.getBgString(value);
  //   console.log(bgString);
  //   this.background.next(bgString);
  }

  public getBgString(value: number): string {
    const valuePercent = (value - this.min) / (this.max - this.min) * 100;
    // const valuePercent = 50;
    // const bgString = 'linear-gradient(to right, rgb(29,185,84) 0%, rgb(29,185,84) ' + valuePercent + '%, rgb(64,64,62) ' + valuePercent + '%, rgb(64,64,64) 100%) !important';
    // console.log('called');
    const bgString = 'linear-gradient(to right, black 0%, black ' + valuePercent + '%, white ' + valuePercent + '%, white 100%)';
    // const bgString = 'linear-gradient(to right, black 0%, black 50%, white 50%, white 100%)';

    console.log(bgString);
    return bgString;
  }
}