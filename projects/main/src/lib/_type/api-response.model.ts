export interface ApiResponseModel<T> {
  status: 'OK' | 'ERROR';
  data: T | T[];
}
