import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
}