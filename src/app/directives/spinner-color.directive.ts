import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
	selector: '[appSpinnerColor]'
})
export class SpinnerColorDirective implements AfterViewInit {

	@Input() colorCustom: string;

	constructor(
		private elem: ElementRef
	) {
	}

	ngAfterViewInit() {
		if (!!this.colorCustom) {
			const element = this.elem.nativeElement;
			const circle = element.querySelector('circle');
			circle.style.stroke = this.colorCustom;
		}
	}
}
