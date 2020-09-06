import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { CLIENT_ID, CLIENT_SECRET } from '../app.config';
import { IpcService } from './ipc.service';
import { TokenService } from './token.service';

/**
 * Handles Spotify Web API related functions
 */
@Injectable()
export class APIService {
  constructor(private http: HttpClient,
              private ipcService: IpcService,
              private tokenService: TokenService) {
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
}