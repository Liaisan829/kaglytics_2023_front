import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

export const StartsWithHttp = new HttpContextToken<boolean>(() => false);

@Injectable({
	providedIn: 'root',
})
export class UrlInterceptorService implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(
			req.clone({
				url: req.url.startsWith('https') ||
				req.url.startsWith('http') ||
				req.url.startsWith('/') ||
				req.context.get(StartsWithHttp)
					? req.url
					: [environment?.apiUrl, req.url].join('/'),
			}),
		);
	}
}
