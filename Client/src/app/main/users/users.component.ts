import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Users } from '../../_models/users';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarHelperService } from '../../_helpers/snackbar-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../_dialogs/delete-dialog/delete-dialog.component';
import { UsersEditorComponent } from './users-editor/users-editor.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // ADD YOUR MODEL HERE
  // TODO: Add model
  public users: Users[] = [];

  // NAME THE COLUMNS YOU WANT TO LIST IN THE TABLE
  // PLEASE CHECK ALSO THE HTML matColumnDef AND element.columnX
  // TODO: Change column names here and in html
  public displayedColumns = ['name', 'username', 'email', 'created', 'updated', 'action'];

  public dataSource = new MatTableDataSource(this.users);

  constructor(private dialog: MatDialog, private snackbarHelper: SnackbarHelperService) {}

  ngOnInit(): void {
    this.initData();
  }

  // GET DATA FROM SERVICE
  private initData(): void {
    // TODO: Add service to get all entries
    // this.userService.getUsers().subscribe((users: Users[]) => {
    //   this.dataSource = new MatTableDataSource(this.users);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   this.users = users;
    // });
    /************ DEMO CONTENT START ************/
    // TODO: Delete demo content
    this.users = [
      {
        id: 1,
        userName: 'jdoe',
        email: 'jdoe@test.com',
        firstname: 'John',
        lastname: 'Doe',
        created: new Date(),
        updated: new Date()
      }
    ];
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    /************ DEMO CONTENT END ************/
  }

  // CREATE ENTRY OPEN DIALOG
  public create() {
    const dialogRef = this.dialog.open(UsersEditorComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.initData();
      }
    });
  }

  // EDIT ENTRY OPEN DIALOG
  public edit(user: Users) {
    const dialogRef = this.dialog.open(UsersEditorComponent, {
      data: user,
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.initData();
      }
    });
  }

  // DELETE ENTRY
  public delete(user: Users): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // TODO: Add service to delete entry
        // this.userService.deleteUser(user.id).subscribe(
        //   () => {
        //     this.snackbarHelper.successSnackbar('delete');
        //   },
        //   (err: any) => {
        //     this.snackbarHelper.errorSnackbar('delete');
        //   }
        // );
        this.initData();
      }
    });
  }

  // DEFINE FILTER FOR SEARCH
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
