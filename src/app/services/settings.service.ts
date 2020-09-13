import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { APIService } from './api.service'

/**
 * Keeps track of settings values
 */
@Injectable()
export class SettingsService {
  public size: BehaviorSubject<number> = new BehaviorSubject(15); // font size in px
  public opacity: BehaviorSubject<number> = new BehaviorSubject(100); // range from 0-100
  public volume: BehaviorSubject<number> = new BehaviorSubject(100);

  constructor(private apiService: APIService) {}

  public setSize(size: number) {
    this.size.next(size);
  }

  public setOpacity(opacity: number) {
    this.opacity.next(opacity);
  }

  public setVolume(value: number): Promise<void> {
    const currentVolume = this.volume.value;
    this.volume.next(value);
    return this.apiService.setVolume(value).catch(
        // if it catches error, revert to original volume
        () => this.volume.next(currentVolume)
      );
  }
}
