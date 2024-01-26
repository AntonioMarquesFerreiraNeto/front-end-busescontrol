import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable, catchError } from "rxjs";
import { UserauthService } from "src/app/services/userauth.service";
@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor{   
    constructor(private userauthService: UserauthService){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    this.userauthService.Logout();
                }
                return next.handle(request);
            })
        );
    }
}