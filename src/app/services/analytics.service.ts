import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AnalyticsService {

	constructor(private http: HttpClient) {
	}

	getCategoriesStatistics(): Observable<any> {
		return this.http.get<any>('competitions/statistics/categories');
	}

	getOrganizationsStatistics(): Observable<any> {
		return this.http.get<any>('competitions/statistics/organizations');
	}

	getRewardTypesStatistics(): Observable<any> {
		return this.http.get<any>('competitions/statistics/rewardtypes');
	}

	getTagsStatistics(): Observable<any> {
		return this.http.get<any>('competitions/statistics/tags');
	}
}
