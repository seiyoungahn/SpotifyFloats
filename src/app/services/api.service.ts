import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { CLIENT_ID, CLIENT_SECRET } from '../app.config';
import { IpcService } from './ipc.service';
import { TokenService } from './token.service';

const baseURL = 'https://api.spotify.com/v1/me/player';

// TODO: move to api.d.ts (currently there's a compiling problem with api.d.ts)

export interface ITokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export interface ITrack {
  name: string;
  artists: string[];
  isPlaying: boolean;
}

/**
 * Handles Spotify Web API related functions
 */
@Injectable()
export class APIService {
  constructor(private http: HttpClient,
              private ipcService: IpcService,
              private tokenService: TokenService) {
    // TODO: move this to TokenService
    this.ipcService.on('auth-return', (event, authCode) => {
      if (authCode) {
        this.requestTokens(authCode).then((tokenResponse: ITokenResponse) => {
          this.tokenService.setAccessToken(tokenResponse.access_token);
          this.tokenService.setRefreshToken(tokenResponse.refresh_token);
        });
      } else {
        this.ipcService.send('show-dialog', 'You must log in to Spotify to use SpotifyFloats');
      }
    });
  }

  private requestTokens(code: string): Promise<ITokenResponse> {
    // console.log(code);
    const URL = 'https://accounts.spotify.com/api/token';
    const redirectURL = 'https://www.google.com/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      params: new HttpParams()
        .set("grant_type", 'authorization_code')
        .set("code", code)
        .set("redirect_uri", redirectURL)
    }
    return this.http.post<ITokenResponse>(
      URL,
      null,
      httpOptions
    ).toPromise();
  }

  public async play(): Promise<any> {
    const URL = baseURL + '/play';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenService.accessToken.value
      })
    }
    return this.http.put(
      URL,
      null,
      httpOptions
    ).toPromise();
  }

  public async pause(): Promise<any> {
    const URL = baseURL + '/pause';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenService.accessToken.value
      })
    }
    return this.http.put(
      URL,
      null,
      httpOptions
    ).toPromise();
  }

  public async next(): Promise<any> {
    const URL = baseURL + '/next';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenService.accessToken.value
      })
    }
    return this.http.post(
      URL,
      null,
      httpOptions
    ).toPromise();
  }

  public async previous(): Promise<any> {
    const URL = baseURL + '/previous';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenService.accessToken.value
      })
    }
    return this.http.post(
      URL,
      null,
      httpOptions
    ).toPromise();
  }
}