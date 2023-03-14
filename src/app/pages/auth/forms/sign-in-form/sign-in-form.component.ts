import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@services/auth.service";
import { takeUntil } from "rxjs";
import { DestroyService } from "@services/destroy.service";
import { Router } from "@angular/router";

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
	) {
		this.buildForm();
	}

	private buildForm() {
		this.form = this.fb.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(5)]]
		});
	}

	get formIsValid(): boolean {
		return this.form.invalid;
	}

	submit() {
		this.authService.signIn(this.form.value)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: res => {
					this.authService.authorize(res);

					this.router.navigate(['/'])
				},
				error: () => {
				}
			});
	}
}
