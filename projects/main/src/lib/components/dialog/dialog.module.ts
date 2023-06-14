import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDialogService } from './dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [],
  imports: [CommonModule, MatDialogModule, MatSnackBarModule],
  providers: [AppDialogService],
})
export class AppDialogModule {}
