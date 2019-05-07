import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersistenceService } from './persistence.service';

const ACCESS_TOKEN = 'spotifyFloatsAccessToken';
const REFRESH_TOKEN = 'spotifyFloatsRefreshToken';

/**
 * Uses PersistenceService to store and retrieve tokens and exposes them as observables
 */
@Injectable()
export class TokenService {
  public accessToken: BehaviorSubject<String> = new BehaviorSubject(null);
  public refreshToken: BehaviorSubject<String> = new BehaviorSubject(null);

  constructor(private persistenceService: PersistenceService) {
    this.init();
  }

  private init(): void {
    const accessToken = this.persistenceService.get(ACCESS_TOKEN);
    this.accessToken.next(accessToken);
    const refreshToken = this.persistenceService.get(REFRESH_TOKEN);
    this.refreshToken.next(refreshToken);
  }

  public setAccessToken(accessToken: String): void {
    this.accessToken.next(accessToken);
    this.persistenceService.set(ACCESS_TOKEN, accessToken);
  }

  public setRefreshToken(refreshToken: String): void {
    this.refreshToken.next(refreshToken);
    this.persistenceService.set(REFRESH_TOKEN, refreshToken);
  }
}