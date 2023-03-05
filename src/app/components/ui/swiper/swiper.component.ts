import { ChangeDetectionStrategy, Component } from '@angular/core';
import SwiperCore, { Autoplay, Navigation, SwiperOptions } from "swiper";

SwiperCore.use([Navigation, Autoplay])

@Component({
	selector: 'app-swiper',
	templateUrl: './swiper.component.html',
	styleUrls: ['./swiper.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwiperComponent {
	config: SwiperOptions = {
		slidesPerView: 1,
		loop: true,
		autoplay: true
	};
}
