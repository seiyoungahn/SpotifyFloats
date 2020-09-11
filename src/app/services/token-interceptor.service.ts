// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler,HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// import { TokenService } from './token.service';
// import { AuthenticationService } from './authentication.service';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { APIService } from './api.service';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   constructor(public tokenService: TokenService,
//               public authService: AuthenticationService,
//               public apiService: APIService) {}

//   public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     request = this.addToken(request, this.tokenService.accessToken.value);
    
//     return next.handle(request).pipe(catchError(error => {
//       if (error instanceof HttpErrorResponse && error.status === 401) {
//         return this.handleTokenError(request, next);
//       } else {
//         return throwError(error);
//       }
//     }));

//   }

//   private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
//     return request.clone({
//       setHeaders: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//   }

//   private async handleTokenError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
//     const refreshToken = this.tokenService.refreshToken.value;
//     if (refreshToken) {
//       // get new access token if there is a valid refresh token
//       const accessToken = await this.apiService.refreshToken(refreshToken);
//       this.tokenService.setAccessToken(accessToken);
//     } else {
//       this.authService.authenticate();
//     }
//   }
// }
