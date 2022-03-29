import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Router } from '@angular/router';
// TODO: Add authService
// import { AuthService } from 'api/services';
import { LoginService } from '../_services/login.service';
import { environment } from '../../environments/environment';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // TODO: Add authService
  constructor(
    private router: Router,
    private loginService: LoginService // private authService: AuthService
  ) {}

  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var obs = new Subject<HttpEvent<any>>();

    request = this.addAuthHeader(request);

    next.handle(request).subscribe(
      (evt) => {
        obs.next(evt);
      },
      (error) => {
        if (error.status == 401) {
          if (error.url.indexOf('Auth') >= 0 && request.method == 'PUT') {
            this.onUnauthorized();
            obs.error(error);

            return;
          }

          this.refreshToken().subscribe(
            () => {
              request = this.addAuthHeader(request);

              next.handle(request).subscribe(
                (re) => obs.next(re),
                (err) => {
                  this.onUnauthorized();
                  obs.error(err);
                }
              );
            },
            (e: any) => {
              obs.error(e);
            }
          );
        } else if (error.status == 403) {
          this.onForbidden();
          obs.error(error);
        } else {
          obs.error(error);
        }
      }
    );

    return obs.asObservable();
  }

  private addAuthHeader(request: HttpRequest<any>) {
    const authHeader = this.loginService.getToken();
    if (authHeader && request.url.indexOf('Auth') < 0) {
      return request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authHeader
        }
      });
    }
    return request;
  }

  private tokenExists() {
    const token = this.loginService.getToken();
    return token !== null && token !== undefined && token !== '';
  }

  private addCacheHeaders(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
        'If-Modified-Since': '0'
      }
    });
  }

  private refreshToken(): Observable<null> | any {
    if (this.refreshTokenInProgress) {
      return new Observable((observer) => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      // TODO: Add auth service
      // return this.authService.putApiAuth({ token: this.loginService.getToken() || '' }).pipe(
      //   tap((evt) => {
      //     this.refreshTokenInProgress = false;
      //     this.tokenRefreshedSource.next();
      //   })
      // );
    }
  }

  private onUnauthorized() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  private onForbidden() {
    alert(environment.forbiddenMessage);
    this.onUnauthorized();
  }
}
