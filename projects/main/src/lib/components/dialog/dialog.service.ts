import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDto } from './type/dialog-dto';


@Injectable({
    providedIn: 'root'
})
export class AppDialogService {

    constructor(private matDialog: MatDialog, private snackBar: MatSnackBar) {
    }

    dialog<T, D>(dialogData: DialogDto<T, D>) {
        const id = 'app_dialog_' + Math.random().toString(36).substr(2, 9);
        const mcbDialog = this.matDialog.open(dialogData.component, {data: dialogData.data, width: '400px', disableClose: true});
        return mcbDialog;
    }
}
