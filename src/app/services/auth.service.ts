import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { LocalStorage } from "@utils/local-storage";
import { SignUpRequest } from "@models/SignUpRequest";
import { SignUpResponse } from "@models/SignUpResponse";
import { TokenResponse } from "@models/TokenResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	@LocalStorage() token?: string | null;

	constructor(
		private http: HttpClient
	) {
	}

	signUp(data: SignUpRequest): Observable<SignUpResponse> {
		return this.http.post<SignUpResponse>('sign-up', data);
	}

	signIn(data: SignUpRequest): Observable<TokenResponse> {
		return this.http.post<TokenResponse>('sign-in', data);
	}

	authorize(token: TokenResponse): void {
		this.token = token.token;
	}

	get isAuthorized(): boolean{
		return this.token !== null;
	}
}
