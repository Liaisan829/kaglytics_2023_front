import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoadingService extends BehaviorSubject<boolean> implements OnDestroy {
	constructor() {
		super(false);
	}

	ngOnDestroy() {
		this.complete();
	}
}
