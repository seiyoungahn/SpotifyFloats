import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { APIService, ITrack } from './api.service';

const TITLE_PULL_RATE = 3000; // rate for updating currently playing track

/**
 * Wrapper over APIService to expose player related functions
 */
@Injectable()
export class PlayerService {
  public currentSongTitle: BehaviorSubject<string> = new BehaviorSubject('');
  public isPlaying: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  constructor(private apiService: APIService) {
    setInterval(_ => {
      this.updateCurrentTrack();
    }, TITLE_PULL_RATE);
  }

  private updateCurrentTrack(): void {
    this.apiService.getCurrentTrack().then((track: ITrack | null) => {
      if (track) {
        let title = track.name;
        if (track.artists) {
          title += " - ";
          title += track.artists[0];
          if (track.artists.length > 1) {
            track.artists.slice(1).forEach(artist => title = title + ", " + artist);
          }
        }
        this.currentSongTitle.next(title);
        this.isPlaying.next(track.isPlaying);
      } else {
        // api returns null when the song is paused
        this.isPlaying.next(false);
      }
    });
  }

  public play(): Promise<void> {
    return this.apiService.play().then(
      () => this.updateCurrentTrack()
    );
  }

  public pause(): Promise<void> {
    return this.apiService.pause().then(
      () => this.updateCurrentTrack()
    );
  }

  public next(): Promise<void> {
    return this.apiService.next().then(
      () => this.updateCurrentTrack()
    );
  }

  public previous(): Promise<void> {
    return this.apiService.previous().then(
      () => this.updateCurrentTrack()
    );
  }
}