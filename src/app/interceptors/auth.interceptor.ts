import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable } from "rxjs";
import { UserauthService } from "src/app/services/userauth.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: UserauthService){

    }

    intercept(requisicao: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token = localStorage.getItem("token");
        if(token != null){
            const tokenUser = JSON.parse(token);
            const authUser = tokenUser.token;
            const authResponse = requisicao.clone({setHeaders: {'Authorization' : `Bearer ${authUser}`}});
            return next.handle(authResponse);
        }
        return next.handle(requisicao);
    }
}