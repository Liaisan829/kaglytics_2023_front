import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from '@components/forms/input/input.component';
import { IconComponent } from '@components/ui/icon/icon.component';
import { HomeComponent } from "@pages/home/home.component";
import { AuthComponent } from '@pages/auth/auth.component';
import { SignUpFormComponent } from '@pages/auth/forms/sign-up-form/sign-up-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SwiperComponent } from '@components/ui/swiper/swiper.component';
import { SwiperModule } from "swiper/angular";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { UrlInterceptorService } from "@services/url-interceptor.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { SignInFormComponent } from '@pages/auth/forms/sign-in-form/sign-in-form.component';
import { AuthInterceptorService } from "@services/auth-interceptor.service";
import { LoaderComponent } from '@components/ui/loader/loader.component';
import { EmailVerifyComponent } from '@pages/email-verify/email-verify.component';

@NgModule({
	declarations: [
		AppComponent,
		InputComponent,
		IconComponent,
		HomeComponent,
		AuthComponent,
		SignUpFormComponent,
		SwiperComponent,
		SignInFormComponent,
		LoaderComponent,
		EmailVerifyComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		SwiperModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			timeOut: 3000,
			closeButton: true,
		})
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: UrlInterceptorService,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
