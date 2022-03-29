import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarHelperService {
  constructor(private snackBar: MatSnackBar, private translate: TranslateService) {}

  public async successSnackbar(key = '', text = '', color = 'bg-success') {
    if (text === '' && key !== '') {
      await this.translate.get('snackBars.success.' + key).subscribe((data) => {
        text = data;
      });
    }

    this.snackBar.open(text, '', {
      duration: 4000,
      panelClass: [color],
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  public async errorSnackbar(key = '', text = '', color = 'bg-danger') {
    if (text === '' && key !== '') {
      await this.translate.get('snackBars.errors.' + key).subscribe((data) => {
        text = data;
      });
    }

    this.snackBar.open(text, '', {
      duration: 4000,
      panelClass: [color],
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  public openSnackbar(text = '', color = ''): void {
    this.snackBar.open(text, '', {
      duration: 4000,
      panelClass: [color],
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
