import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player.component';
import { TokenService } from './services/token.service';
import { PersistenceService } from './services/persistence.service';
import { AuthenticationService } from './services/authentication.service';
import { IpcService } from './services/ipc.service';
import { APIService } from './services/api.service';
import { PlayerService } from './services/player.service';

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
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    PersistenceService,
    TokenService,
    AuthenticationService,
    IpcService,
    APIService,
    PlayerService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
