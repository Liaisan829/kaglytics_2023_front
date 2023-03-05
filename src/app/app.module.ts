import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from '@components/forms/input/input.component';
import { IconComponent } from '@components/ui/icon/icon.component';
import { HomeComponent } from "@pages/home/home.component";
import { AuthComponent } from '@pages/auth/auth.component';

@NgModule({
	declarations: [
		AppComponent,
		InputComponent,
		IconComponent,
		HomeComponent,
		AuthComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
