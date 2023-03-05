import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs";
import { DestroyService } from "@services/destroy.service";

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
	pageForm!: '';

	constructor(
		private route: ActivatedRoute,
		private destroy$: DestroyService
	) {
	}

	ngOnInit() {
		this.route.data
			.pipe(takeUntil(this.destroy$))
			.subscribe(data => {
				data && (this.pageForm = data?.form)
			});
	}
}
