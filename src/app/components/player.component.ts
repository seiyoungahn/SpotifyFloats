import { Component } from '@angular/core';
import { faPlay, faStepBackward, faStepForward, faPause, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { PlayerService } from '../services/player.service';
import { TokenService } from '../services/token.service';
import { SettingsService } from '../services/settings.service';

/**
 * Main component responsible for playback
 */
@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  public playIcon = faPlay;
  public pauseIcon = faPause;
  public previousIcon = faStepBackward;
  public nextIcon = faStepForward;
  public menuOpenIcon = faAngleDown;
  public menuCloseIcon = faAngleUp;

  public fontSize: BehaviorSubject<number>;
  public opacity: BehaviorSubject<number>;

  public currentSongTitle: BehaviorSubject<string>;
  public isPlaying: BehaviorSubject<boolean>;
  public accessToken: BehaviorSubject<string>;
  public isMenuVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private authService: AuthenticationService,
              private playerService: PlayerService,
              private tokenService: TokenService,
              private settingsService: SettingsService) {
    this.currentSongTitle = this.playerService.currentSongTitle;
    this.isPlaying = this.playerService.isPlaying;
    this.accessToken = this.tokenService.accessToken;
    this.fontSize = this.settingsService.size;
    this.opacity = new BehaviorSubject(this.settingsService.opacity.value / 100);
    this.settingsService.opacity.subscribe(opacity => {
      this.opacity.next(opacity / 100);
    });
  }

  public play(): void {
    this.playerService.play();
  }

  public pause(): void {
    this.playerService.pause();
  }

  public next(): void {
    this.playerService.next();
  }

  public previous(): void {
    this.playerService.previous();
  }

  public showMenu(): void {
    this.isMenuVisible.next(true);
  }

  public hideMenu(): void {
    this.isMenuVisible.next(false);
  }
}
