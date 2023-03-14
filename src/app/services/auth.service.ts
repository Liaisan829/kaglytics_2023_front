import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { LocalStorage } from "@utils/local-storage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	@LocalStorage() token?: string | null;

	constructor(
		private http: HttpClient
	) {
	}

	signUp(data: any): Observable<any> {
		return this.http.post('sign-up', data);
	}

	signIn(data: any): Observable<any> {
		return this.http.post('sign-in', data);
	}

	authorize(token: string): void {
		this.token = token;
	}

	get isAuthorized(): boolean{
		return this.token !== null;
	}
}
