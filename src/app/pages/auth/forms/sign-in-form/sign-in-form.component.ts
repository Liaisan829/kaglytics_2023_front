import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@services/auth.service";
import { takeUntil } from "rxjs";
import { DestroyService } from "@services/destroy.service";
import { Router } from "@angular/router";
import { ToastService } from "@services/toast.service";
import { LoadingService } from "@services/loading.service";
import { EmailValidators, PasswordValidators } from "@utils/validations";

@Component({
	selector: 'app-sign-in-form',
	templateUrl: './sign-in-form.component.html',
	styleUrls: ['./sign-in-form.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent {
	form!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private destroy$: DestroyService,
		private router: Router,
		private toast: ToastService,
		public loading$: LoadingService
	) {
		this.buildForm();
	}

	private buildForm() {
		this.form = this.fb.group({
			email: ['', [...EmailValidators]],
			password: ['', [...PasswordValidators]]
		});
	}

	get formIsValid(): boolean {
		return this.form.invalid;
	}

	control(name: string) {
		return this.form.get(name);
	}

	submit() {
		this.loading$.next(true);
		this.authService.signIn(this.form.value)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: ({access, refresh}) => {
					this.authService.authorize(access, refresh);
					this.loading$.next(false);
					this.router.navigate(['/']);
				},
				error: (err) => {
					switch (err.status) {
						case 401:
							this.toast.error(err.error.error);
							break;
						default :
							this.toast.error(err);
							break;
					}
					this.loading$.next(false);
				}
			});
	}

	hasError(formControlName: string, errorName: string) {
		return this.control(formControlName)?.touched && this.control(formControlName)?.dirty && this.control(formControlName)?.hasError(errorName)
	}
}
