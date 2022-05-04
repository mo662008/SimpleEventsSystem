import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LogInModule } from './log-in/log-in.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { HomePageModule } from './home-page/home-page.module';
import { ProfileModule } from './profile/profile.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //
    CoreModule,
    //
    LogInModule,
    SignUpModule,
    HomePageModule,
    ProfileModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
