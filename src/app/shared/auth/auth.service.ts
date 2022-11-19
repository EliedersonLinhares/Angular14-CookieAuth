import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserModel } from '../models/user.model'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	userProfile: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({
		email: '',
		id: 0,
		username: '',
		roles: [],
	})

	constructor(private httpClient: HttpClient) {}

	login(user: any) {
		console.log(user)
		return this.httpClient.post('http://localhost:8080/api/auth/signin', user, {
			withCredentials: true,
		})
	}
	profile() {
		return this.httpClient.get<UserModel>(
			'http://localhost:8080/api/auth/user-profile',
			{
				withCredentials: true,
			}
		)
	}
	logout() {
		return this.httpClient.post<UserModel>(
			'http://localhost:8080/api/auth/signout',
			{
				withCredentials: true,
			}
		)
	}

	getUsers(): Observable<UserModel[]> {
		return this.httpClient.get<UserModel[]>(
			'http://localhost:8080/api/auth/users',
			{
				withCredentials: true,
			}
		)
	}
	refreshToken(): Observable<Object> {
		console.log(Object)
		return this.httpClient.get<Object>(
			'http://localhost:8080/api/auth/refreshtoken',
			{
				withCredentials: true,
			}
		)
	}

	saveUserToLocalStorage(user: UserModel) {
		this.userProfile.next(user)
		sessionStorage.setItem('user-profile', JSON.stringify(user))
	}

	loadUserFromLocalStorage(): UserModel {
		if (this.userProfile.value.id == 0) {
			let fromLocalStorage = sessionStorage.getItem('user-profile')
			if (fromLocalStorage) {
				let userInfo = JSON.parse(fromLocalStorage)
				this.userProfile.next(userInfo)
			}
		}
		return this.userProfile.value
	}
}
