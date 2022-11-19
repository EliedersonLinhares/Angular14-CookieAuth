import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AppComponent } from 'src/app/app.component'
import { AuthService } from 'src/app/shared/auth/auth.service'
import { UserModel } from 'src/app/shared/models/user.model'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
	/* registredUsers: string[] = []*/
	registredUsers: UserModel[] = []
	Object = Object

	constructor(
		private auth: AuthService,
		private route: Router,
		private appComp: AppComponent
	) {}

	ngOnInit(): void {
		this.retrieveUsers()
	}

	retrieveUsers(): void {
		this.auth.getUsers().subscribe({
			next: (data) => {
				this.registredUsers = data
				console.log(data)
				console.log(this.appComp.userInfo?.roles.includes('ROLE_ADMIN'))
			},
			error: (e) => {
				console.log(e.error.message)
			},
		})
	}
}
