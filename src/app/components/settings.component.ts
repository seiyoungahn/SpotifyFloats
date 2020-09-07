import { Component } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { SettingsService } from '../services/settings.service';
import { AuthenticationService } from '../services/authentication.service';

const MIN_SIZE = 10;
const MAX_SIZE = 20;
const MIN_OPACITY = 10;
const MAX_OPACITY = 100;

/**
 * Component to show settings
 */
@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  public size: BehaviorSubject<number>;
  public opacity: BehaviorSubject<number>;

  public sizeBg: BehaviorSubject<string>;
  public opacityBg: BehaviorSubject<string>;

  public bgString: string;

  public test = "black !important";

  constructor(private settingsService: SettingsService,
              private authService: AuthenticationService) {
    this.size = this.settingsService.size;
    this.opacity = this.settingsService.opacity;
    this.sizeBg = new BehaviorSubject(this.getBgString(this.settingsService.size.value, MIN_SIZE, MAX_SIZE));
    this.bgString = this.getBgString(this.settingsService.size.value, MIN_SIZE, MAX_SIZE);
  }

  public onSizeChange(event: any) {
    const value = event.target.value;
    try {
      this.setSizeBg(value);
      this.setSize(value);
    } catch (e) {
      console.log(e);
    }
  }

  public setSizeBg(value: number) {
    const bgString = this.getBgString(value, MIN_SIZE, MAX_SIZE);
    this.bgString = bgString;
    this.sizeBg.next(bgString);
    console.log(this.sizeBg.value);
  }

  private getBgString(value: number, min: number, max: number): string {
    const valuePercent = (value - min) / (max - min) * 100;
    const bgString = 'linear-gradient(to right, rgb(29,185,84) 0%, rgb(29,185,84) ' + valuePercent + '%, rgb(64,64,62) ' + valuePercent + '%, rgb(64,64,64) 100%) !important';
    return bgString;
  }

  public setSize(value: number) {
    this.settingsService.setSize(value);
  }

  public setOpacity(event: any) {
    this.settingsService.setOpacity(event.target.value);
  }

  public authenticate() {
    this.authService.authenticate();
  }
}
