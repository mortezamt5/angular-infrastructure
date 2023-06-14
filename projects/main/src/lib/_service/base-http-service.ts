import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel, ApiPaginationModel } from '../_type';

export class BaseHttpService {
  constructor(private httpClient: HttpClient, private baseUrl: string) {
    if (typeof baseUrl !== 'string') {
      throw Error('invalid base url');
    }
    baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  }

  post<T>(data: T | any, url?: string): Observable<ApiResponseModel<T>> {
    if (!url) {
      url = 'add';
    }
    const currentUrl = this.getCurrentUrl(url);
    return this.httpClient.post<ApiResponseModel<T>>(currentUrl, data);
  }

  put<T>(data: T | any, url?: string): Observable<ApiResponseModel<T>> {
    if (!url) {
      url = 'edit';
    }
    const currentUrl = this.getCurrentUrl(url);
    return this.httpClient.put<ApiResponseModel<T>>(currentUrl, data);
  }

  getById<T>(id: number, url?: string): Observable<ApiResponseModel<T>> {
    if (!url) {
      url = 'get';
    }
    const currentUrl = this.getCurrentUrl(url);
    return this.httpClient.get<ApiResponseModel<T>>(`${currentUrl}/${id}`);
  }

  getAll<T>(url?: string): Observable<ApiResponseModel<T[]>> {
    if (!url) {
      url = 'get';
    }
    const currentUrl = this.getCurrentUrl(url);
    return this.httpClient.get<ApiResponseModel<T[]>>(currentUrl);
  }

  delete<T>(id: number, url?: string): Observable<ApiResponseModel<T>> {
    if (!url) {
      url = 'delete';
    }
    const currentUrl = this.getCurrentUrl(url);
    return this.httpClient.delete(`${currentUrl}/${id}`) as any;
  }

  getPagination(
    data: ApiPaginationModel | any,
    url?: string
  ): Observable<ApiResponseModel<ApiPaginationModel>> {
    if (!url) {
      url = '/pagination';
    }
    const currentUrl = this.getCurrentUrl(url);
    return this.httpClient.post<ApiResponseModel<ApiPaginationModel>>(
      currentUrl,
      data
    ) as any;
  }

  getCurrentUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }
}
