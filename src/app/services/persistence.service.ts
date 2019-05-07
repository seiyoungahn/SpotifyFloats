import { Injectable } from '@angular/core';

/**
 * Persists data using localStorage
 */
@Injectable()
export class PersistenceService {
  constructor() {}

  public set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  }
}