import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { GridDataSource } from 'dist';

@Injectable()
export class GridDemoService {

  constructor(private httpClient: HttpClient) {
  }

  test(id: number): Observable<any> {
    return this.httpClient.post('http://localhost:8001/test', {id});
  }

  getClientData(): Observable<any> {
    return this.httpClient.get('http://localhost:8001/local-mg-grid');
  }

  getRemoteData(dataSource: GridDataSource): Observable<any> {
    return this.httpClient.post('http://localhost:8001/remote-mg-grid', dataSource);
  }
}
