import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DestroyService } from "@services/destroy.service";
import { AuthService } from "@services/auth.service";
import { takeUntil } from "rxjs";
import { Router } from "@angular/router";

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
		private router: Router
	) {
		this.buildForm();
	}

	private buildForm() {
		this.form = this.fb.group({
			username: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
		});
	}

	get formIsValid(): boolean {
		return this.form.invalid;
	}

	submit() {
		this.authService.signUp(this.form.value)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: () => {
					this.router.navigate(['sign-in'])
				},
				error: (err) => {

				}
			});
	}
}
