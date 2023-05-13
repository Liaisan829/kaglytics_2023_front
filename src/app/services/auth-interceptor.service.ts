import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { StartsWithHttp } from '@services/url-interceptor.service';

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
	refreshToken$ = new BehaviorSubject<string | null>(null);
	private isRefreshing = false;

	constructor(
		private auth: AuthService
	) {
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authReq = request;
		const token = this.auth.token;

		if (token) {
			authReq = this.addToken(request, token);
		}

		return next.handle(authReq).pipe(
			catchError((error) => {
				if (error instanceof HttpErrorResponse && error.status === 401) {
					return this.handle401Error(authReq, next);
				}

				return throwError(error);
			}));
	}

	private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshToken$.next(null);

			const token = this.auth.refresh_token;
			if (token) {
				return this.auth.refreshTokenRequest(token).pipe(
					switchMap((token: any) => {
						this.isRefreshing = false;
						this.auth.authorize(token.access);
						this.refreshToken$.next(token.access);

						return next.handle(this.addToken(request, token.access));
					}),
					catchError((err) => {
						this.isRefreshing = false;
						this.auth.logout();
						return throwError(err);
					})
				);
			}
		}
		return this.refreshToken$.pipe(
			filter(token => token !== null),
			take(1),
			switchMap((token) => next.handle(this.addToken(request, token)))
		);
	}

	addToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
		const headers = token != '' && !request.context.get(StartsWithHttp)
			? request.headers.set('Authorization', `Bearer ${token}`)
			: request.headers;
		return request.clone({
			headers,
		});
	}
}
