import {ComponentType} from '@angular/cdk/overlay';
import {EventEmitter, TemplateRef} from '@angular/core';
import {MatDialogConfig} from '@angular/material/dialog';

export class DialogDto<T, D> {
    component!: ComponentType<T> | TemplateRef<T>;
    data?: any;
    config?: MatDialogConfig<D>;
    close?: Function;
    closeEvent?: EventEmitter<any> = new EventEmitter<any>();
}
