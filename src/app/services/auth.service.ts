import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { LocalStorage, storageService } from "@utils/local-storage";
import { SignUpRequest } from "@models/SignUpRequest";
import { SignUpResponse } from "@models/SignUpResponse";
import { TokenResponse } from "@models/TokenResponse";
import jwtDecode from "jwt-decode";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	@LocalStorage() token?: string | null;
	@LocalStorage() refresh_token?: string | null;
	@LocalStorage() expires_in?: string | null;
	@LocalStorage() user?: any | null;

	constructor(
		private http: HttpClient,
		private router: Router
	) {
	}

	signUp(data: SignUpRequest): Observable<SignUpResponse> {
		return this.http.post<SignUpResponse>('sign-up', data);
	}

	signIn(data: SignUpRequest): Observable<TokenResponse> {
		return this.http.post<TokenResponse>('sign-in', data);
	}

	authorize(token: string, refreshToken?: string): void {
		this.token = token;
		this.refresh_token = refreshToken ?? this.refresh_token;

		this.user = jwtDecode(token);
		this.expires_in = this.user.exp;
	}

	get isAuthorized(): boolean{
		return this.token !== null;
	}

	emailVerify(code: string): Observable<TokenResponse> {
		return this.http.post<TokenResponse>('email-verify', {code: code});
	}

	refreshTokenRequest(token: string): Observable<any> {
		return this.http.post('refresh-token', {
			refresh: token ?? this.refresh_token
		});
	}

	logout(): void {
		storageService.clearStorage();
		this.router.navigate(['/sign-in']);
	}
}
