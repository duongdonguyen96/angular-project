import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "./auth";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        console.log('canActivate', route, state);
        if (!this.authService.isLogin()) {
            this.authService.logOut();
            return false
        }
        return true;
    }
}



