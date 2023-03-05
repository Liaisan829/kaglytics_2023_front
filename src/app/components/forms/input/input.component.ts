import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		}
	]
})
export class InputComponent implements ControlValueAccessor {
	@Input() password: boolean = false;
	@Input() type: 'text' | 'email' = 'text';
	@Input() placeholder: string = '';
	value: string = '';
	show: boolean = false;

	toggle() {
		this.show = !this.show;
	}

	onChangeCallback = (v: string) => {
	};
	onTouchedCallback = () => {
	};

	registerOnChange(fn: any): void {
		this.onChangeCallback = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouchedCallback = fn;
	}

	writeValue(value: string): void {
		this.value = value;
	}

	onChange(value: any): void {
		this.value = value.target.value;
		this.onChangeCallback(value.target.value);
		this.onTouchedCallback();
	}
}
