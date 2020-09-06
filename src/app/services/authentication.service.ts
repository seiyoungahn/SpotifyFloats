import { Injectable } from '@angular/core';
import { CLIENT_ID } from '../app.config';
import { TokenService } from './token.service';
import { IpcService } from './ipc.service';

/**
 * Listens on TokenService's accessToken observable and prompts Spotify authentication
 * when the observable emits null
 */
@Injectable()
export class AuthenticationService {
  constructor(private tokenService: TokenService,
              private ipcService: IpcService) {
    this.authenticate();
    this.tokenService.accessToken.subscribe(
      accessToken => {
        // must use strict equality to distinguish between undefined and null
        if (accessToken === null) {
          this.authenticate();
        }
      }
    );
  }

  public authenticate(): void {
    // TODO: check if authentication page is already open 
    const baseURL = 'https://accounts.spotify.com/authorize';
    const redirectURL = 'https://www.google.com/';
    const authURL = baseURL
                  + '?response_type=code'
                  + '&client_id=' + CLIENT_ID
                  + '&redirect_uri=' + redirectURL
                  + '&scope=user-modify-playback-state user-read-currently-playing';
    this.ipcService.send('request-auth', authURL);
  }
}
