import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, Observable, switchMap, throwError } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private auth: AuthService, private route: Router) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (req.url.indexOf('/refreshtoke') > -1) {
			return next.handle(req)
		}

		return next.handle(req).pipe(
			catchError((error) => {
				if (sessionStorage.getItem('isActive') == 'true') {
					if (error.status == 403 || error.status == 401) {
						return this.handle403Error(req, next, error)
					} else {
						return throwError(() => error)
					}
				} else {
					this.logout()
					return throwError(() => error)
				}
			})
		)
	}

	private handle403Error(
		req: HttpRequest<any>,
		next: HttpHandler,
		originalError: any
	) {
		return this.auth.refreshToken().pipe(
			switchMap(() => {
				return next.handle(req)
			}),
			catchError((error) => {
				sessionStorage.removeItem('user-profile')
				this.route.navigate(['/'])
				return throwError(() => originalError)
			})
		)
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
