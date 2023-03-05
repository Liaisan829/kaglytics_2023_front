import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
	}
}
