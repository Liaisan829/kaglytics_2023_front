import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from "@services/auth.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	isAuthorized: boolean = false;

	constructor(
		public authService: AuthService
	) {
		this.isAuthorized = authService.isAuthorized;
	}
}
