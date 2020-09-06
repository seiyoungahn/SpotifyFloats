import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TokenService } from './services/token.service';
import { PersistenceService } from './services/persistence.service';
import { IpcService } from './services/ipc.service';
import { APIService } from './services/api.service';
import { PlayerService } from './services/player.service';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SettingsComponent,
    SliderComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
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
