import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { AuthGuard } from './shared/auth/auth-guard'

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard],
		data: {
			userType: 'logged-in',
			//role: 'ROLE_ADMIN_OWNER',
		},
	},
	{
		path: 'userprofile',
		component: UserProfileComponent,
		canActivate: [AuthGuard],
		data: {
			userType: 'logged-in',
			//role: 'ROLE_USER',
		},
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
