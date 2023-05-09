import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private http: HttpClient) { }

	getActiveCompetitions(): Observable<any[]> {
	  return this.http.get<any[]>('competitions/active');
	}

	getTags(): Observable<any> {
	  return this.http.get<any>('competitions/tags');
	}

	getCategories(): Observable<any> {
		return this.http.get<any>('competitions/categories');
	}

	getRewardTypes(): Observable<any> {
		return this.http.get<any>('competitions/reward-types');
	}
}
