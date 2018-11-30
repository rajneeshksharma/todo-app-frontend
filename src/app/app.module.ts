import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './service/auth.guard';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgSocialModule, AuthServiceConfig, GoogleLoginProvider } from 'ng-social';
import { TodosComponent } from './todos/todos.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('953381558791-rta6t6c7je9v28pkhdr7hdtktdi3h70v.apps.googleusercontent.com')
      },
    ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    TodosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSocialModule,
    BrowserAnimationsModule
  ],
  providers: [ AuthGuard, ApiService,{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
