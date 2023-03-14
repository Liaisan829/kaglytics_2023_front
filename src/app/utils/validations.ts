import { Validators } from "@angular/forms";

export const EmailRegExp = /^\S+@\S+\.\S+$/;

export const PasswordValidators = [
	Validators.required,
	Validators.minLength(5),
	Validators.pattern(/^[A-Za-z0-9]*$/)
]

export const EmailValidators = [
	Validators.required,
	Validators.email,
	Validators.pattern(EmailRegExp),
	Validators.maxLength(254)
];
