import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player.component';
import { TokenService } from './services/token.service';
import { PersistenceService } from './services/persistence.service';
import { AuthenticationService } from './services/authentication.service';
import { IpcService } from './services/ipc.service';
import { APIService } from './services/api.service';
import { TokenInterceptor } from './services/token-interceptor.service';
import { PlayerService } from './services/player.service';
import { SettingsComponent } from './components/settings.component';
import { SettingsService } from './services/settings.service';
import { SliderComponent } from './components/slider.component';

const appRoutes: Routes = [
  { path: '', component: PlayerComponent }, // default path
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SettingsComponent,
    SliderComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    PersistenceService,
    TokenService,
    AuthenticationService,
    IpcService,
    APIService,
    PlayerService,
    SettingsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
