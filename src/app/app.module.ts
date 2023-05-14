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
import { PageComponent } from '@components/ui/page/page.component';
import { HeaderComponent } from '@components/ui/header/header.component';
import { HomeCardComponent } from './pages/home/home-card/home-card.component';
import { CompetitionsComponent } from './pages/competitions/competitions.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatTooltipModule} from "@angular/material/tooltip";
import { NotFoundComponent } from './components/ui/not-found/not-found.component';

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
		EmailVerifyComponent,
		PageComponent,
		HeaderComponent,
  		HomeCardComponent,
		CompetitionsComponent,
  NotFoundComponent,
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
        }),
        MatFormFieldModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatDatepickerModule,
        MatNativeDateModule,
        OverlayModule,
        MatTooltipModule
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
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
