import { Component, Inject, OnInit } from '@angular/core';
import { Users } from '../../../_models/users';
import { SnackbarHelperService } from '../../../_helpers/snackbar-helper.service';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-editor',
  templateUrl: './users-editor.component.html',
  styleUrls: ['./users-editor.component.scss']
})
export class UsersEditorComponent implements OnInit {
  public isEdit = false;

  // ADD YOUR MODEL HERE
  // TODO: Add model
  public user: Users = {};

  constructor(
    // TODO: Add model
    @Inject(MAT_DIALOG_DATA) public data: Users,
    private dialog: MatDialog,
    private snackbarHelper: SnackbarHelperService
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data !== null;
    this.user = this.isEdit ? this.data : {};
  }

  // SUBMIT FUNCTION FOR FORM
  public submit(): void {
    this.saveData().subscribe(
      () => {
        this.snackbarHelper.successSnackbar('save');
        this.dialog.closeAll();
      },
      (e: any) => {
        this.snackbarHelper.errorSnackbar('save');
        this.dialog.closeAll();
      }
    );
  }

  // CALL SERVICES FOR PUT OR POST
  private saveData(): Observable<any> {
    // TODO: Add service for PUT and POST
    // if (this.isEdit) {
    //   return this.userService.putUser(this.user);
    // } else {
    //   return this.userService.postUser(this.user);
    // }
    // TODO: Remove this line
    return new Observable();
  }
}
