import { Component, OnInit } from '@angular/core';
import { Login } from '../_models/login';
import { Router } from '@angular/router';
import { SnackbarHelperService } from '../_helpers/snackbar-helper.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // ADD YOUR MODEL HERE
  // TODO: Add model
  public loginUser: Login = {};

  constructor(private router: Router, private snackbarHelper: SnackbarHelperService) {}

  ngOnInit(): void {}

  // SUBMIT FUNCTION FOR FORM
  public login(): void {
    this.doLogin().subscribe(
      (resp: any) => {
        // TODO: Store data you need
        localStorage.setItem('token', resp.authToken);
        localStorage.setItem('user', resp.user);
        this.router.navigateByUrl('/');
        this.snackbarHelper.successSnackbar('login');
      },
      (e: any) => {
        this.snackbarHelper.errorSnackbar('login');
      }
    );
  }

  // CALL SERVICES FOR PUT OR POST
  private doLogin(): Observable<any> {
    // TODO: Add service for login
    // return this.authService.postApiAuth(this.loginUser);
    // TODO: Remove this line
    return new Observable();
  }
}
