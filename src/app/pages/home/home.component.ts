import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from "@services/auth.service";
import { Router } from "@angular/router";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
	isAuthorized: boolean = false;

	constructor(
		private authService: AuthService,
		private router: Router
	) {
		this.isAuthorized = this.authService.isAuthorized;
	}

	navigate(isAuthorized: boolean) {
		this.router.navigate([isAuthorized ? '/competitions' : '/sign-up'])
	}
}
