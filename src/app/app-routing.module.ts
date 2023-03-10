import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "@guards/auth.guard";
import { AuthComponent } from '@pages/auth/auth.component';
import { HomeComponent } from "@pages/home/home.component";

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
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
