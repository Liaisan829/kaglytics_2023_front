import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DestroyService } from "@services/destroy.service";
import { AuthService } from "@services/auth.service";
import { takeUntil } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { EmailValidators, PasswordValidators } from "@utils/validations";

@Component({
	selector: 'app-sign-up-form',
	templateUrl: './sign-up-form.component.html',
	styleUrls: ['./sign-up-form.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent {
	form!: FormGroup;
	loading = false;

	constructor(
		private fb: FormBuilder,
		private destroy$: DestroyService,
		private authService: AuthService,
		private toast: ToastrService,
		private cdr: ChangeDetectorRef
	) {
		this.buildForm();
	}

	private buildForm() {
		this.form = this.fb.group({
			username: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]*$/)]],
			email: ['', [...EmailValidators]],
			password: ['', [...PasswordValidators]]
		});
	}

	get formIsValid(): boolean {
		return this.form.invalid;
	}

	submit() {
		this.loading = true;
		this.authService.signUp(this.form.value)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: () => {
					this.toast.success('A verification link has been sent to your email');
					this.loading = false;
					this.cdr.markForCheck();
				},
				error: (err) => {
					switch (err.status) {
						case 400:
							this.toast.error(err.error.email);
							break;
						default:
							this.toast.error(err);
							break;
					}
					this.loading = false;
					this.cdr.markForCheck();
				}
			});
	}

	hasError(formControlName: string, errorName: string) {
		return (this.form.get(formControlName)?.touched || this.form.get(formControlName)?.dirty) && this.form.get(formControlName)?.hasError(errorName);
	}
}
