import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { AuthInterceptor } from './shared/auth/auth-interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component'

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		DashboardComponent,
  UserProfileComponent,
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
