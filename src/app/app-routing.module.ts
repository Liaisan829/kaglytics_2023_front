import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "@guards/auth.guard";
import { AuthComponent } from '@pages/auth/auth.component';
import { HomeComponent } from "@pages/home/home.component";
import { EmailVerifyComponent } from "@pages/email-verify/email-verify.component";

const routes: Routes = [
	{
		path: '',
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				component: HomeComponent
			}
		]
	},
	{
		path: 'sign-up',
		component: AuthComponent,
		data: {form: 'sign-up'}
	},
	{
		path: 'sign-in',
		component: AuthComponent,
		data: {form: 'sign-in'}
	},
	{
		path: 'email-verify',
		component: EmailVerifyComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
