import { Component } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, skip } from 'rxjs/operators';
import { SettingsService } from '../services/settings.service';
import { AuthenticationService } from '../services/authentication.service';

/**
 * Component for displaying settings
 */
@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  public size: BehaviorSubject<number>;
  public opacity: BehaviorSubject<number>;
  public volume: BehaviorSubject<number>;

  constructor(private settingsService: SettingsService,
              private authService: AuthenticationService) {
    this.size = this.settingsService.size;
    this.opacity = this.settingsService.opacity;
    this.volume = new BehaviorSubject(100);
    this.volume.pipe(
      skip(1), // ignore the default value (100)
      map((value) => Math.round(value)),
      distinctUntilChanged()
    ).subscribe(
      (volume) => this.settingsService.setVolume(volume).catch(
        () => this.volume.next(volume) // revert to original volume in case of error
      )
    );
  }

  public authenticate() {
    this.authService.authenticate();
  }
}
