import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.loader]': 'true',
		'[class.loader--full]': "this.width === 'FULL'",
		'[class.loader--half]': "this.width === 'HALF'"
	}
})
export class LoaderComponent {
	@Input() width: 'FULL' | 'HALF' = 'FULL';
}
