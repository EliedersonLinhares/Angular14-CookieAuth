import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { switchMap } from 'rxjs'
import { AuthService } from 'src/app/shared/auth/auth.service'
import { UserModel } from 'src/app/shared/models/user.model'

const USER_KEY = 'auth-user'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	loginUser: any = {
		email: '',
		password: '',
	}
	isActive = false

	constructor(private auth: AuthService, private route: Router) {}

	ngOnInit(): void {
		/* TODO document why this method 'ngOnInit' is empty */
	}
	changeActive() {
		if (!this.isActive) {
			this.isActive = true
		} else {
			this.isActive = false
		}
	}
	login() {
		let authFlow = this.auth
			.login(this.loginUser)
			.pipe(switchMap(() => this.auth.profile()))

		authFlow.subscribe({
			next: (user: UserModel) => {
				this.auth.saveUserToLocalStorage(user)
				sessionStorage.setItem('isActive', this.isActive.toString())
				this.route.navigate(['/dashboard'])
			},
			error: (err) => {
				alert('login failed')
			},
		})
	}
}
