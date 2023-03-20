import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from "@services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs";
import { DestroyService } from "@services/destroy.service";
import { ToastService } from "@services/toast.service";

@Component({
	selector: 'app-email-verify',
	templateUrl: './email-verify.component.html',
	styleUrls: ['./email-verify.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailVerifyComponent {

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router,
		private destroy$: DestroyService,
		private toast: ToastService
	) {
		this.route.queryParams
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				const {token} = this.route.snapshot.queryParams;
				this.authService.emailVerify(token)
					.pipe(takeUntil(this.destroy$))
					.subscribe({
						next: ({access, refresh}) => {
							if (access) {
								this.authService.authorize(access, refresh);
								this.router.navigate(['/']);
								this.toast.success('Registration completed successfully');
							}
						},
						error: (err) => {
							this.toast.error(err.error.error)
						}
					});
			});
	}
}
