import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "@guards/auth.guard";
import { AuthComponent } from '@pages/auth/auth.component';
import { HomeComponent } from "@pages/home/home.component";
import { EmailVerifyComponent } from "@pages/email-verify/email-verify.component";
import { CompetitionsComponent } from "@pages/competitions/competitions.component";
import { AnalyticsComponent } from "@pages/analytics/analytics.component";

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
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
	},
	{
		path: 'competitions',
		canActivate: [AuthGuard],
		component: CompetitionsComponent
	},
	{
		path: 'analytics',
		canActivate: [AuthGuard],
		component: AnalyticsComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
