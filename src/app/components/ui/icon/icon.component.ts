import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[style.width]': 'this.width',
		'[style.height]': 'this.height',
	}
})
export class IconComponent {
	@Input() name: string = '';
	@Input() width: string = '24px';
	@Input() height: string = '24px';

	getPath(): string {
		return `/assets/sprite.svg#${this.name}`
	}
}
