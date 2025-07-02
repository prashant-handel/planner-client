import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate():Observable<boolean | UrlTree> {
    return new Observable<boolean | UrlTree> ((observer) => {
      this.authService.isAuthenticated().subscribe({
        next: (isAuth) => {
          if(isAuth) {
            observer.next(true);
            observer.complete();
          }
          else {
            observer.next(this.router.parseUrl('/auth/login'));
            observer.complete();
          }
        },
        error: (_err) => {
          observer.next(this.router.parseUrl('/auth/login'));
          observer.complete();
        }
      });
    });
  }
}