import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Keeps track of settings values
 */
@Injectable()
export class SettingsService {
  public size: BehaviorSubject<number> = new BehaviorSubject(15); // font size in px
  public opacity: BehaviorSubject<number> = new BehaviorSubject(70); // range from 0-100

  constructor() {}

  public setSize(size: number) {
    this.size.next(size);
  }

  public setOpacity(opacity: number) {
    this.opacity.next(opacity);
  }
}
