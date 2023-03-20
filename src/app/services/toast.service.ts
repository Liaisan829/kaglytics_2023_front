import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

const getError = (error: HttpErrorResponse | string): string => {
	if (typeof error === 'string') {
		return error;
	}
	return 'An error has occurred';
};

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	constructor(private toastr: ToastrService) {
	}

	success(message: string) {
		return this.toastr.success(message);
	}

	error(error: HttpErrorResponse | string) {
		return this.toastr.error(getError(error));
	}
}
