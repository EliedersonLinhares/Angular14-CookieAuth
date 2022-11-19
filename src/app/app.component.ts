import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './shared/auth/auth.service'
import { UserModel } from './shared/models/user.model'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	title = 'Angular14-cookie-auth'
	userInfo?: UserModel

	constructor(private auth: AuthService, private route: Router) {}

	ngOnInit(): void {
		this.auth.userProfile.subscribe((data) => {
			this.userInfo = data
		})
	}

	logout() {
		this.auth.logout().subscribe({
			next: () => {
				this.auth.userProfile.next({
					email: '',
					id: 0,
					username: '',
					roles: [],
				})

				sessionStorage.removeItem('user-profile')
				sessionStorage.removeItem('isActive')
				this.route.navigate(['/'])
			},
		})
	}
}
