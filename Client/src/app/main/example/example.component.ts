import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Examples } from '../../_models/examples';
import { DeleteDialogComponent } from '../../_dialogs/delete-dialog/delete-dialog.component';
import { SnackbarHelperService } from '../../_helpers/snackbar-helper.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // ADD YOUR MODEL HERE
  // TODO: Add model
  public examples: Examples[] = [];

  // NAME THE COLUMNS YOU WANT TO LIST IN THE TABLE
  // PLEASE CHECK ALSO THE HTML matColumnDef AND element.columnX
  // TODO: Change column names here and in html
  public displayedColumns = ['column1', 'column2', 'column3', 'column4', 'column5', 'action'];

  public dataSource = new MatTableDataSource(this.examples);

  constructor(private dialog: MatDialog, private snackbarHelper: SnackbarHelperService) {}

  ngOnInit(): void {
    this.initData();
  }

  // GET DATA FROM SERVICE
  private initData(): void {
    // TODO: Add service to get all entries
    // this.exampleService.getExamples().subscribe((examples: Examples[]) => {
    //   this.dataSource = new MatTableDataSource(this.examples);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   this.examples = examples;
    // });
    /************ DEMO CONTENT START ************/
    // TODO: Delete demo content
    this.examples = [
      { id: 1, column1: 'Test', column2: 'test', column3: 'Test', column4: new Date(), column5: new Date() }
    ];
    this.dataSource = new MatTableDataSource(this.examples);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    /************ DEMO CONTENT END ************/
  }

  // DELETE ENTRY
  public delete(example: Examples): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // TODO: Add service to delete entry
        // this.exampleService.deleteExample(example.id).subscribe(
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
