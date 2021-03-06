import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable()
export class IpcService {
  private _ipc: IpcRenderer | undefined;
  
  constructor() {
    if (window['require']) {
      try {
        this._ipc = window['require']('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('electron ipcRenderer not loaded');
    }
  }

  public on(channel: string, listener: Function): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.on(channel, listener);
  }

  public send(channel: string, ...args): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.send(channel, ...args);
  }

  public sendTest(): void {
    this._ipc.send('test', 'this test');
  }
}