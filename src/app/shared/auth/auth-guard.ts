import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| boolean
		| UrlTree
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree> {
		let userInfo = this.auth.loadUserFromLocalStorage()
		if (route.data['userType'] === 'logged-in') {
			if (userInfo.id > 0) {
				return true
			}
			this.router.navigate(['/'])
			return false
		} else {
			if (userInfo.id === 0) {
				return true
			}
			this.router.navigate(['/'])
			return false
		}
	}
}
