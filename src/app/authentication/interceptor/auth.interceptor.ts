import {Component, Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    static accessToken = '';

    constructor(
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // const requestWithHeaders = request.clone({ setHeaders: {'Content-Type': 'application/json'}});

        const userLogin = JSON.parse(localStorage.getItem('user-login'))
        if (userLogin) {
            AuthInterceptor.accessToken = userLogin.access_token
        }

        request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + AuthInterceptor.accessToken)})

        return next.handle(request)
        // return next.handle(request).pipe(
        //     catchError(err => {
        //         if (err.status === 401 || err.status == 403) {
        //             this.authentication.logOut()
        //         }
        //         return throwError(err);
        //     })
        // );

    }
}
