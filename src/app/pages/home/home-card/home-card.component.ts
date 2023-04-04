import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
	selector: 'app-home-card',
	templateUrl: './home-card.component.html',
	styleUrls: ['./home-card.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeCardComponent {
	@Input() theme: 'ORANGE' | 'GREEN' | 'BLACK' = 'ORANGE';
	@Input() title: string = '';
	@Input() description: string = '';
	@Input() icon: string = '';

	constructor(private sanitizer: DomSanitizer) {
		this.sanitizer.bypassSecurityTrustHtml(this.title);
		this.sanitizer.bypassSecurityTrustHtml(this.description);
	}
}
