import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { LocalDbService } from '../_db/local-db.service';
import { TabItem } from '../_type';

@Injectable()
export class AppPageTabService {
  change: Subject<boolean> = new Subject<boolean>();
  AppTabPageKey = 'AppTabPageKey';
  constructor(private localDbService: LocalDbService) {}

  getAllTab(): TabItem[] {
    const result = this.localDbService.get(this.AppTabPageKey);
    return result ? result : [];
  }

  addTab(tab: TabItem) {
    const tabData: any[] = this.getAllTab();
    const current = tabData.find((f) => f.id === tab.id);
    if (current) {
      const index = tabData.indexOf(current);
      if (index > -1) {
        tabData.splice(index, 1);
      }
    }
    tabData.push(tab);
    this.localDbService.save(this.AppTabPageKey, tabData);
    this.change.next(true);
  }
  removeTab(tabId: number) {
    const tabData: TabItem[] = this.getAllTab();
    const current = tabData.find((f) => f.id === tabId);
    if (current) {
      const index = tabData.indexOf(current);
      if (index > -1) {
        tabData.splice(index, 1);
      }
      this.localDbService.save(this.AppTabPageKey, tabData);
      this.change.next(true);
    }
  }
}
