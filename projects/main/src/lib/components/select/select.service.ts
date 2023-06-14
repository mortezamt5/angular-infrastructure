import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppSelectResult} from './type/select-result';

export type dataFn = (data: any) => any;

@Injectable()
export class AppSelectService {

    constructor() {
    }

    private optionsSubject: BehaviorSubject<AppSelectResult> = new BehaviorSubject({} as AppSelectResult);
    options: Observable<AppSelectResult> = this.optionsSubject.asObservable();

    getOptions(fn: any) {
        if (fn instanceof Observable) {
            fn.subscribe(result => {
                this.optionsSubject.next({data: result});
            });
        }
    }
}
