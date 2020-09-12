import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler,HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

import { TokenService } from './token.service';
import { AuthenticationService } from './authentication.service';
import { APIService } from './api.service';

// Intercepts Http requests and refreshes token when access token is expired
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public tokenService: TokenService,
              public authService: AuthenticationService,
              public apiService: APIService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = this.tokenService.refreshToken.value;
    if (refreshToken) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
        return this.apiService.refreshToken(refreshToken).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            const accessToken = token.access_token;
            this.refreshTokenSubject.next(accessToken);
            this.tokenService.setAccessToken(accessToken);
            return next.handle(this.addToken(request, accessToken));
          })
        );
      } else {
        return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(accessToken => {
                return next.handle(this.addToken(request, accessToken));
            }));
      }
    } else {
        this.authService.authenticate();
        return throwError("No refresh token found");
    }
  }
}
