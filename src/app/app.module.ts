import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from '@components/forms/input/input.component';
import { IconComponent } from '@components/ui/icon/icon.component';
import { HomeComponent } from "@pages/home/home.component";
import { AuthComponent } from '@pages/auth/auth.component';
import { SignUpFormComponent } from './pages/auth/forms/sign-up-form/sign-up-form.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		AppComponent,
		InputComponent,
		IconComponent,
		HomeComponent,
		AuthComponent,
  SignUpFormComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
