import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from "@services/auth.service";
import { Router } from "@angular/router";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	isAuthorized: boolean = false;

	constructor(
		private authService: AuthService,
		private router: Router
	) {
		this.isAuthorized = authService.isAuthorized;
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/sign-in']);
	}
}
