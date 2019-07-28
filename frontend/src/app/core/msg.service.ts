import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(private _snackBar: MatSnackBar) {}

  open(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
