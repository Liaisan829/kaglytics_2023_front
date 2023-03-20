import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DestroyService } from "@services/destroy.service";
import { AuthService } from "@services/auth.service";
import { takeUntil } from "rxjs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { EmailValidators, PasswordValidators } from "@utils/validations";
import { LoadingService } from "@services/loading.service";

@Component({
	selector: 'app-sign-up-form',
	templateUrl: './sign-up-form.component.html',
	styleUrls: ['./sign-up-form.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent {
	form!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private destroy$: DestroyService,
		private authService: AuthService,
		private router: Router,
		private toast: ToastrService,
		public loading$: LoadingService
	) {
		this.buildForm();
	}

	private buildForm() {
		this.form = this.fb.group({
			username: ['', [Validators.required]],
			email: ['', [...EmailValidators]],
			password: ['', [...PasswordValidators]]
		});
	}

	get formIsValid(): boolean {
		return this.form.invalid;
	}

	submit() {
		this.loading$.next(true);
		this.authService.signUp(this.form.value)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: () => {
					this.toast.success('english!!! Вы успешно зарегистрированы!');
					this.toast.success('english!!! Подтвердите свою почту!');
					this.loading$.next(false);
				},
				error: (err) => {
					switch (err.status) {
						case 400:
							this.toast.error(err.error.error);
							break;
						default:
							this.toast.error(err);
							break;
					}
					this.loading$.next(false);
				}
			});
	}

	hasError(formControlName: string, errorName: string) {
		return (this.form.get(formControlName)?.touched || this.form.get(formControlName)?.dirty) && this.form.get(formControlName)?.hasError(errorName);
	}
}
