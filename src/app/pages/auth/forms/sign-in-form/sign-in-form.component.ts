import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@services/auth.service";

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
		private authService: AuthService
	) {
		this.buildForm();
	}

	private buildForm() {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
		});
	}

	get formIsValid(): boolean {
		return this.form.invalid;
	}

	submit() {
		// console.log('dsd')
	}
}
