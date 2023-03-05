import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { LocalStorage } from "@utils/local-storage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	@LocalStorage() token?: string | null;
	@LocalStorage() user?: any;

	constructor(
		private http: HttpClient
	) {
	}

	signUp(data: any): Observable<any> {
		return this.http.post('sign-up', data);
	}
}
