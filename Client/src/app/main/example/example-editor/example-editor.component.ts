import { Component, OnInit } from '@angular/core';
import { Examples } from '../../../_models/examples';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarHelperService } from '../../../_helpers/snackbar-helper.service';

@Component({
  selector: 'app-example-editor',
  templateUrl: './example-editor.component.html',
  styleUrls: ['./example-editor.component.scss']
})
export class ExampleEditorComponent implements OnInit {
  public isEdit = false;
  private id?: number;

  // ADD YOUR MODEL HERE
  // TODO: Add model
  public example: Examples = {};

  // EXAMPLE FOR SELECT
  // TODO: Delete if not needed or add service to get select options
  public selectExample = [
    { value: 'test', name: 'Test' },
    { value: 'test2', name: 'Test 2' }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private snackbarHelper: SnackbarHelperService) {
    // GET THE ID FROM ROUTE
    // IF NO ID IS SET NEW ENTRY
    // IF ID IS SET GET DATA FROM SERVICE AND EDIT
    route.params.subscribe((params) => {
      this.id = +params.id;
      if (this.id) {
        // TODO: Add service to get entry by id
        // this.exampleService.getExampleId(this.id).subscribe((example: Examples) => {
        //   this.example = example;
        // });
        /************ DEMO CONTENT START ************/
        // TODO: Delete demo content
        this.example = {
          id: 1,
          column1: 'Test',
          column2: 'test',
          column3: 'Test',
          column4: new Date(),
          column5: new Date()
        };
        /************ DEMO CONTENT END ************/
        this.isEdit = true;
      }
    });
  }

  ngOnInit(): void {}

  // SUBMIT FUNCTION FOR FORM
  public submit(): void {
    this.saveData().subscribe(
      () => {
        this.snackbarHelper.successSnackbar('save');
        // TODO: Change routerLink
        this.router.navigate(['/example'], { relativeTo: this.route });
      },
      (e: any) => {
        this.snackbarHelper.errorSnackbar('error');
      }
    );
  }

  // CALL SERVICES FOR PUT OR POST
  private saveData(): Observable<any> {
    // TODO: Add service for PUT and POST
    // if (this.isEdit) {
    //   return this.exampleService.putExamples(this.example);
    // } else {
    //   return this.exampleService.postExample(this.example);
    // }
    // TODO: Remove this line
    return new Observable();
  }
}
